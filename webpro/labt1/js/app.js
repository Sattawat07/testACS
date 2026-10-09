const GROUPS = [
      { id: "css-js", label: "01 · CSS + JS: จัดหน้าตา" },
      { id: "animation", label: "02 · Animation และ keyframes" },
      { id: "dom", label: "03 · DOM management" },
      { id: "mixed", label: "04 · CSS + JS + DOM" },
      { id: "async", label: "05 · Promise และ Async/Await" }
    ];

    let currentExercise = EXERCISES[0];
    let activeTab = "css";
    let revealedHintsCount = 1;
    let renderTimer = null;
    const codeCache = new Map();

    // DOM Elements
    const navContainer = document.querySelector("#exercise-nav-container");
    const searchInput = document.querySelector("#exercise-search");
    const taskCategoryBadge = document.querySelector("#task-category-badge");
    const taskDifficultyBadge = document.querySelector("#task-difficulty-badge");
    const activeTaskTitle = document.querySelector("#active-task-title");
    const activeTaskBrief = document.querySelector("#active-task-brief");
    const referenceFrame = document.querySelector("#reference-frame");
    const userFrame = document.querySelector("#user-frame");
    const previewStatusBadge = document.querySelector("#preview-status-badge");
    const htmlEditor = document.querySelector("#html-editor");
    const cssEditor = document.querySelector("#css-editor");
    const jsEditor = document.querySelector("#js-editor");
    const runCodeBtn = document.querySelector("#run-code-btn");
    const resetCurrentBtn = document.querySelector("#reset-current-btn");
    const showSolutionBtn = document.querySelector("#show-solution-btn");
    const solutionModal = document.querySelector("#solution-modal");
    const closeSolutionBtn = document.querySelector("#close-solution-btn");
    const applySolutionBtn = document.querySelector("#apply-solution-btn");
    const copyStatusMsg = document.querySelector("#copy-status-msg");
    const solutionCssCode = document.querySelector("#solution-css-code");
    const solutionJsCode = document.querySelector("#solution-js-code");
    const solutionModalTitle = document.querySelector("#solution-modal-title");
    const nextHintBtn = document.querySelector("#next-hint-btn");
    const hintsContainer = document.querySelector("#hints-container");
    const exerciseColors = document.querySelector("#exercise-colors");
    const exerciseColorsPanel = document.querySelector("#exercise-colors-panel");
    const toggleColorsBtn = document.querySelector("#toggle-colors-btn");
    const overallCounter = document.querySelector("#overall-counter");
    const themeToggle = document.querySelector("#theme-toggle");

    // Preferences & Theme
    function initPreferences() {
      const savedTheme = localStorage.getItem("lab-theme") || "dark";
      document.documentElement.setAttribute("data-theme", savedTheme);
      document.querySelector(".theme-label").textContent = savedTheme === "dark" ? "โหมดสว่าง" : "โหมดมืด";

      const savedFont = localStorage.getItem("lab-font") || "inter";
      document.documentElement.setAttribute("data-font", savedFont);
      document.querySelectorAll("[data-font-btn]").forEach(btn => {
        const active = btn.dataset.fontBtn === savedFont;
        btn.classList.toggle("bg-emerald-600", active);
        btn.classList.toggle("text-white", active);
        btn.classList.toggle("text-slate-400", !active);
      });
    }

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("lab-theme", next);
      document.querySelector(".theme-label").textContent = next === "dark" ? "โหมดสว่าง" : "โหมดมืด";
    });

    document.querySelectorAll("[data-font-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const font = btn.dataset.fontBtn;
        document.documentElement.setAttribute("data-font", font);
        localStorage.setItem("lab-font", font);
        initPreferences();
      });
    });

    function prepareHtml(html) {
      return html.replace(/\{\{scene([123])\}\}/g, (_, num) => EMBEDDED_SCENES[num]);
    }

    function createDoc(html, css, js, role) {
      const safeCss = css.replace(/<\/style/gi, "<\\/style");
      const safeJs = js.replace(/<\/script/gi, "<\\/script");
      const baseStyles = `*{box-sizing:border-box}body{margin:0;min-height:100vh;padding:20px;display:grid;place-items:center;background:#f8fafc;color:#0f172a;font-family:system-ui,sans-serif;font-size:15px;line-height:1.5}button,input{font:inherit;cursor:pointer}:focus-visible{outline:2px solid #10b981;outline-offset:2px}`;
      const errorHandler = `window.addEventListener('error',e=>parent.postMessage({kind:'lab-error',role:'${role}',message:e.message},'*'));window.addEventListener('unhandledrejection',e=>parent.postMessage({kind:'lab-error',role:'${role}',message:String(e.reason)},'*'));`;
      return `<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${baseStyles}\n${safeCss}</style></head><body>${prepareHtml(html)}<script>${errorHandler}<\/script><script>${safeJs}<\/script></body></html>`;
    }

    function getStoredCode(id) {
      if (codeCache.has(id)) return codeCache.get(id);
      const ex = EXERCISES.find(e => e.id === id);
      let val = { css: ex.starterCss, js: ex.starterJs };
      try {
        const raw = localStorage.getItem("lab-code:" + id);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed.css === "string" && typeof parsed.js === "string") {
            val = { css: parsed.css, js: parsed.js };
          }
        }
      } catch(_) {}
      codeCache.set(id, val);
      return val;
    }

    function saveCurrentCode() {
      if (!currentExercise) return;
      const val = { css: cssEditor.value, js: jsEditor.value };
      codeCache.set(currentExercise.id, val);
      try { localStorage.setItem("lab-code:" + currentExercise.id, JSON.stringify(val)); } catch(_) {}
    }

    function renderUserOutput() {
      if (!currentExercise) return;
      previewStatusBadge.textContent = "กำลังอัปเดตพรีวิว...";
      previewStatusBadge.className = "text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200";
      userFrame.srcdoc = createDoc(currentExercise.html, cssEditor.value, jsEditor.value, "user");
      saveCurrentCode();
      setTimeout(() => {
        previewStatusBadge.textContent = "พรีวิวพร้อมทำงาน";
        previewStatusBadge.className = "text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
      }, 300);
    }

    function queueRender() {
      saveCurrentCode();
      clearTimeout(renderTimer);
      renderTimer = setTimeout(renderUserOutput, 400);
    }

    function switchTab(tabName) {
      activeTab = tabName;
      document.querySelectorAll("[data-code-tab]").forEach(btn => {
        btn.setAttribute("data-selected", String(btn.dataset.codeTab === tabName));
      });
      document.querySelectorAll("[data-code-panel]").forEach(panel => {
        panel.classList.toggle("hidden", panel.dataset.codePanel !== tabName);
      });
    }

    document.querySelectorAll("[data-code-tab]").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.codeTab));
    });

    function renderHints() {
      hintsContainer.innerHTML = "";
      const hints = currentExercise.hints;
      for (let i = 0; i < revealedHintsCount && i < hints.length; i++) {
        const div = document.createElement("div");
        div.className = "p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3 animate-fadeIn";
        div.innerHTML = `
          <div class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${i+1}</div>
          <div class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5 font-medium">${hints[i]}</div>
        `;
        hintsContainer.appendChild(div);
      }
      nextHintBtn.textContent = revealedHintsCount < hints.length ? `เปิดคำใบ้ถัดไป (${revealedHintsCount}/${hints.length})` : "เปิดครบทุกระดับแล้ว";
      nextHintBtn.disabled = revealedHintsCount >= hints.length;
      nextHintBtn.classList.toggle("opacity-50", revealedHintsCount >= hints.length);
    }

    function normalizeColorCode(value) {
      const code = value.toUpperCase();
      if (code === 'WHITE') return '#FFFFFF';
      if (code === 'BLACK') return '#000000';
      if (code.length === 4 || code.length === 5) {
        return '#' + [...code.slice(1)].map(char => char + char).join('');
      }
      return code;
    }

    function colorPurpose(property) {
      if (property === 'color') return 'ตัวอักษร';
      if (property.startsWith('background')) return 'พื้นหลัง';
      if (property.startsWith('border')) return 'ขอบ';
      if (property.includes('shadow')) return 'เงา';
      if (property.startsWith('outline')) return 'เส้นโฟกัส';
      return property;
    }

    function renderColorPalette(css) {
      const colors = new Map();
      for (const rule of css.matchAll(/\{([^{}]*)\}/g)) {
        for (const declaration of rule[1].split(';')) {
          const colon = declaration.indexOf(':');
          if (colon < 0) continue;
          const property = declaration.slice(0, colon).trim().toLowerCase();
          const value = declaration.slice(colon + 1);
          for (const match of value.matchAll(/#[0-9a-f]{3,8}\b|\b(?:white|black)\b/gi)) {
            const code = normalizeColorCode(match[0]);
            if (!colors.has(code)) colors.set(code, new Set());
            colors.get(code).add(colorPurpose(property));
          }
        }
      }

      exerciseColors.replaceChildren();
      for (const [code, purposes] of colors) {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-2.5 min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2';
        const swatch = document.createElement('span');
        swatch.className = 'w-8 h-8 shrink-0 rounded-lg border border-slate-300 dark:border-slate-600 shadow-sm';
        swatch.style.backgroundColor = code;
        swatch.setAttribute('aria-hidden', 'true');
        const detail = document.createElement('span');
        detail.className = 'min-w-0 flex flex-col';
        const label = document.createElement('code');
        label.className = 'text-xs font-bold text-slate-800 dark:text-slate-100 select-all';
        label.textContent = code;
        const purpose = document.createElement('span');
        purpose.className = 'text-[11px] text-slate-500 dark:text-slate-400 truncate';
        purpose.textContent = [...purposes].join(' · ');
        purpose.title = purpose.textContent;
        detail.append(label, purpose);
        item.append(swatch, detail);
        exerciseColors.appendChild(item);
      }
    }

    toggleColorsBtn.addEventListener('click', () => {
      const expanded = toggleColorsBtn.getAttribute('aria-expanded') === 'true';
      exerciseColorsPanel.classList.toggle('hidden', expanded);
      toggleColorsBtn.setAttribute('aria-expanded', String(!expanded));
      toggleColorsBtn.textContent = expanded ? 'แสดงรหัสสี' : 'ซ่อนรหัสสี';
    });

    nextHintBtn.addEventListener("click", () => {
      if (revealedHintsCount < currentExercise.hints.length) {
        revealedHintsCount++;
        renderHints();
      }
    });

    function selectExercise(id) {
      const found = EXERCISES.find(e => e.id === id);
      if (!found) return;
      saveCurrentCode();
      currentExercise = found;
      revealedHintsCount = 1;

      const indexNum = EXERCISES.indexOf(found) + 1;
      overallCounter.textContent = `ข้อ ${String(indexNum).padStart(2, "0")} / ${EXERCISES.length}`;
      
      const groupInfo = GROUPS.find(g => g.id === found.category);
      taskCategoryBadge.textContent = groupInfo ? groupInfo.label : found.category;
      taskDifficultyBadge.textContent = found.level;
      activeTaskTitle.textContent = found.title;
      activeTaskBrief.textContent = found.brief;
      renderColorPalette(found.solutionCss);

      referenceFrame.srcdoc = createDoc(found.html, found.solutionCss, found.solutionJs, "reference");
      htmlEditor.value = formatHtmlCode(found.html);

      const stored = getStoredCode(found.id);
      cssEditor.value = stored.css;
      jsEditor.value = stored.js;

      renderHints();
      renderUserOutput();
      switchTab("css"); // Default focus on CSS for learners

      document.querySelectorAll(".exercise-nav-btn").forEach(btn => {
        const active = btn.dataset.exId === id;
        btn.classList.toggle("bg-emerald-600", active);
        btn.classList.toggle("text-white", active);
        btn.classList.toggle("bg-slate-800/40", !active);
        btn.classList.toggle("text-slate-300", !active);
      });

      try { history.replaceState(null, "", "#" + id); } catch(_) {}
    }

    function buildSidebarNav(filter = "") {
      navContainer.innerHTML = "";
      GROUPS.forEach(group => {
        const matches = EXERCISES.filter(e => e.category === group.id && e.title.toLowerCase().includes(filter.toLowerCase()));
        if (matches.length === 0) return;

        const groupDiv = document.createElement("div");
        groupDiv.className = "space-y-1.5";
        
        const heading = document.createElement("div");
        heading.className = "text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1";
        heading.textContent = group.label;
        groupDiv.appendChild(heading);

        const listDiv = document.createElement("div");
        listDiv.className = "space-y-1";

        matches.forEach(ex => {
          const idx = EXERCISES.indexOf(ex) + 1;
          const btn = document.createElement("button");
          btn.type = "button";
          btn.dataset.exId = ex.id;
          btn.className = "exercise-nav-btn w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white";
          btn.innerHTML = `
            <span class="truncate"><span class="font-bold mr-2 text-emerald-400">${String(idx).padStart(2, "0")}.</span>${ex.title}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 shrink-0">${ex.level}</span>
          `;
          btn.addEventListener("click", () => selectExercise(ex.id));
          listDiv.appendChild(btn);
        });

        groupDiv.appendChild(listDiv);
        navContainer.appendChild(groupDiv);
      });
    }

    searchInput.addEventListener("input", (e) => {
      buildSidebarNav(e.target.value);
    });

    // Solution Modal
    showSolutionBtn.addEventListener("click", () => {
      solutionModalTitle.textContent = `เฉลยโค้ด: ${currentExercise.title}`;
      solutionCssCode.textContent = formatCssCode(currentExercise.solutionCss);
      solutionJsCode.textContent = formatJsCode(currentExercise.solutionJs);
      copyStatusMsg.style.opacity = "0";
      solutionModal.showModal();
    });

    closeSolutionBtn.addEventListener("click", () => {
      solutionModal.close();
    });

    applySolutionBtn.addEventListener("click", () => {
      cssEditor.value = currentExercise.solutionCss;
      jsEditor.value = currentExercise.solutionJs;
      renderUserOutput();
      copyStatusMsg.style.opacity = "1";
      setTimeout(() => {
        solutionModal.close();
      }, 750);
    });

    resetCurrentBtn.addEventListener("click", () => {
      if (!currentExercise) return;
      cssEditor.value = currentExercise.starterCss;
      jsEditor.value = currentExercise.starterJs;
      renderUserOutput();
    });

    runCodeBtn.addEventListener("click", () => {
      renderUserOutput();
    });

    [cssEditor, jsEditor].forEach(editor => {
      editor.addEventListener("input", queueRender);
      editor.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          renderUserOutput();
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.setRangeText("  ", start, end, "end");
          queueRender();
        }
      });
    });

    window.addEventListener("message", (event) => {
      if (event.data?.kind !== "lab-error") return;
      if (event.source === userFrame.contentWindow && event.data.role === "user") {
        previewStatusBadge.textContent = `JS Error: ${String(event.data.message).slice(0, 90)}`;
        previewStatusBadge.className = "text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200";
      }
    });

    // Init
    initPreferences();
    buildSidebarNav();
    const initialHash = location.hash.slice(1);
    const targetEx = EXERCISES.find(e => e.id === initialHash) || EXERCISES[0];
    selectExercise(targetEx.id);
