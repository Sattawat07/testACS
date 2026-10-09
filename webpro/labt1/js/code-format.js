// Format the read-only HTML without changing the markup used by the previews.
    function formatHtmlCode(code) {
      const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
      let depth = 0;
      return code.trim().replace(/>\s*</g, '>\n<').split('\n').map(rawLine => {
        const line = rawLine.trim();
        if (!line) return '';
        if (line.startsWith('</')) depth = Math.max(0, depth - 1);
        const formatted = '  '.repeat(depth) + line;
        const opening = line.match(/^<([a-z][\w:-]*)\b/i);
        if (opening && !voidTags.has(opening[1].toLowerCase()) &&
            !line.endsWith('/>') && !line.includes('</' + opening[1] + '>')) {
          depth++;
        }
        return formatted;
      }).filter(Boolean).join('\n');
    }

    // Format only outside strings and comments so the displayed code stays valid.
    function formatCode(code, language) {
      if (!code) return '';
      const lines = [];
      let line = '';
      let depth = 0;
      const parenthesisStack = [];
      const cssBlocks = [];
      const flush = () => {
        const value = line.trim();
        if (value) lines.push('  '.repeat(depth) + value);
        line = '';
      };

      for (let i = 0; i < code.length; i++) {
        const char = code[i];
        const next = code[i + 1];

        if (char === '"' || char === "'" || char === '`') {
          const quote = char;
          line += char;
          while (++i < code.length) {
            line += code[i];
            if (code[i] === '\\') {
              if (i + 1 < code.length) line += code[++i];
            } else if (code[i] === quote) break;
          }
          continue;
        }
        if (char === '/' && next === '/') {
          while (i < code.length && code[i] !== '\n') line += code[i++];
          flush();
          continue;
        }
        if (char === '/' && next === '*') {
          line += '/*';
          i += 2;
          while (i < code.length) {
            line += code[i];
            if (code[i] === '*' && code[i + 1] === '/') {
              line += '/';
              i++;
              break;
            }
            i++;
          }
          continue;
        }
        if (/\s/.test(char)) {
          if (line && !line.endsWith(' ')) line += ' ';
          continue;
        }
        if (char === '(') parenthesisStack.push(/\bfor\s*$/.test(line));
        if (char === ')') parenthesisStack.pop();
        if (char === '{') {
          if (language === 'css') cssBlocks.push(line.trim().startsWith('@') ? 'at' : 'rule');
          line = line.trimEnd() + ' {';
          flush();
          depth++;
          continue;
        }
        if (char === '}') {
          if (language === 'css' && cssBlocks.at(-1) === 'rule' && line.trim() && !line.trimEnd().endsWith(';')) {
            line = line.trimEnd() + ';';
          }
          flush();
          depth = Math.max(0, depth - 1);
          if (language === 'css') cssBlocks.pop();
          line = '}';
          const following = code.slice(i + 1).trimStart();
          if (language === 'css' || (!/^[);,.\]]/.test(following) && !/^(?:else|catch|finally)\b/.test(following))) {
            flush();
            if (language === 'css' && depth === 0) lines.push('');
          }
          continue;
        }
        if (char === ';' && !parenthesisStack.includes(true)) {
          line += ';';
          flush();
          continue;
        }
        if (char === ':' && language === 'css' && cssBlocks.at(-1) === 'rule' && /^(?:--)?[a-zA-Z][\w-]*$/.test(line.trim())) {
          line = line.trimEnd() + ': ';
          continue;
        }
        if (language === 'js' && (code.slice(i, i + 2) === '++' || code.slice(i, i + 2) === '--')) {
          line += code.slice(i, i + 2);
          i++;
          continue;
        }
        if (language === 'js') {
          const operator = code.slice(i).match(/^(?:===|!==|==|!=|=>|<=|>=|\+=|-=|\*=|&&|\|\||=|\+|-|\*|<|>)/)?.[0];
          if (operator) {
            line = line.trimEnd() + ' ' + operator + ' ';
            i += operator.length - 1;
            continue;
          }
        }
        if (char === ',') {
          line = line.trimEnd() + ', ';
          continue;
        }
        line += char;
      }
      flush();
      return lines.join('\n').trim();
    }

    function formatCssCode(code) { return formatCode(code, 'css'); }
    function formatJsCode(code) { return formatCode(code, 'js'); }
