// Self-contained SVG scenes keep the gallery usable when opened offline.
    const EMBEDDED_SCENES = Object.fromEntries(Object.entries({
      "1": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#fca674"/><stop offset=".6" stop-color="#ffe5b8"/><stop offset="1" stop-color="#d5e9db"/></linearGradient></defs><rect width="600" height="340" fill="url(#sky)"/><circle cx="451" cy="98" r="48" fill="#fff6d4"/><path d="M0 243 142 105l121 134 92-98 145 110 100-84v173H0" fill="#698a88"/><path d="M0 284 125 173l117 111 116-111 123 107 119-59v119H0" fill="#315f69"/><path d="M0 292q151-50 299 2t301-8v54H0" fill="#77aa90"/><path d="M0 326q168-52 333-9t267-12v35H0" fill="#467967"/></svg>`,
      "2": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#101737"/><stop offset="1" stop-color="#4a3d68"/></linearGradient></defs><rect width="600" height="340" fill="url(#sky)"/><circle cx="464" cy="66" r="30" fill="#f7edbb"/><g fill="#dddaf2"><circle cx="67" cy="55" r="2"/><circle cx="155" cy="85" r="2"/><circle cx="251" cy="35" r="2"/><circle cx="376" cy="108" r="2"/><circle cx="555" cy="39" r="2"/></g><path d="M0 245h46V133h68v112h32V89h81v156h36V152h77v93h31V116h76v129h31V174h76v71h52v95H0" fill="#1c2546"/><g fill="#f5c878"><path d="M66 154h12v14H66zm26 0h12v14H92zm74-43h14v16h-14zm29 0h14v16h-14zm-29 35h14v16h-14zm29 35h14v16h-14zm75-6h14v16h-14zm28 0h14v16h-14zm79-35h14v16h-14zm28 35h14v16h-14zm78 20h14v16h-14zm29 0h14v16h-14z"/></g><path d="M0 269q152 27 300 0t300 8v63H0" fill="#263659"/><path d="M0 305q151-15 300 9t300-3v29H0" fill="#425274"/></svg>`,
      "3": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#81c8d5"/><stop offset="1" stop-color="#d7f0df"/></linearGradient></defs><rect width="600" height="340" fill="url(#sky)"/><circle cx="477" cy="76" r="42" fill="#fff1bd"/><path d="M0 157q170 17 300-2t300 6v179H0" fill="#53aebc"/><path d="M0 220q149-22 300 0t300-6v126H0" fill="#277e9e"/><path d="M0 251q168-15 300 8t300-2v83H0" fill="#eed4a3"/><path d="M0 274q122-17 234 0t231 3q73-12 135-3" fill="none" stroke="#fff7d9" stroke-width="8"/><path d="M0 315q175-28 350 6t250-1v20H0" fill="#d5b67e"/><path d="M63 0q46 67 57 144" fill="none" stroke="#755740" stroke-width="17"/><path d="M93 79q-39-50-93-33M98 83q2-61 53-83M100 84q33-45 99-41M103 89q57-14 103 20" fill="none" stroke="#367c5d" stroke-width="18" stroke-linecap="round"/></svg>`
    }).map(([id, svg]) => [id, 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)]));

    const EXERCISES = [
      {
        id: "theme-card", category: "css-js", title: "การ์ดสลับธีม", level: "เริ่มต้น",
        brief: "จัดการ์ดข้อมูลให้สวยงามตามตัวอย่าง แล้วทำปุ่มสลับโหมดกลางวันและกลางคืนได้จริง",
        html: `<article class="profile-card">
  <div class="avatar" aria-hidden="true">MP</div>
  <p class="role">นักศึกษา Web Programming</p>
  <h1>มินตรา พ.</h1>
  <p class="description">กำลังฝึกสร้างหน้าเว็บที่สวยและใช้งานได้จริง</p>
  <button id="theme-button" type="button">เปิดโหมดกลางคืน</button>
</article>`,
        starterCss: `/* เขียน CSS จัดการ์ดโปรไฟล์และโหมดกลางคืนที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ดักจับคลิกปุ่มเพื่อสลับธีมและข้อความที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ classList.toggle('night') ในการสลับคลาส CSS",
          "ระดับ 2: ตรวจสอบสถานะการ์ดหลังสลับคลาส แล้วกำหนด textContent ของปุ่มให้ถูกต้อง",
          "ระดับ 3: เพิ่ม transition เพื่อให้สีพื้นหลังและการ์ดเปลี่ยนอย่างนุ่มนวล"
        ],
        solutionCss: `.profile-card { width: min(100%, 335px); padding: 26px; border: 1px solid #cbd8e4; border-radius: 20px; background: #fff; color: #172a46; box-shadow: 0 14px 30px #172a461e; text-align: center; transition: background .25s, color .25s, transform .25s; }\n.profile-card:hover { transform: translateY(-3px); }\n.avatar { display: grid; place-items: center; width: 72px; height: 72px; margin: auto; border-radius: 50%; background: #65ded0; color: #103c50; font-size: 1.5rem; font-weight: 900; }\n.role { margin: 14px 0 4px; color: #127b7b; font-size: .78rem; font-weight: 800; }\n.profile-card h1 { margin: 0; font-size: 1.5rem; }\n.description { color: #61728a; font-size: .88rem; }\n.profile-card button { border: 0; border-radius: 9px; background: #126d78; color: white; padding: 10px 15px; font-weight: 800; margin-top: 14px; cursor: pointer; }\n.profile-card.night { background: #172a46; color: #fff; border-color: #426081; }\n.profile-card.night .description { color: #d2e1ed; }\n.profile-card.night .role { color: #7eebdc; }\n.profile-card.night button { background: #fdb964; color: #172a46; }`,
        solutionJs: `const card = document.querySelector('.profile-card');\nconst button = document.querySelector('#theme-button');\n\nbutton.addEventListener('click', () => {\n  const night = card.classList.toggle('night');\n  button.textContent = night ? 'เปิดโหมดกลางวัน' : 'เปิดโหมดกลางคืน';\n});`
      },
      {
        id: "pricing", category: "css-js", title: "แพ็กเกจที่เลือก", level: "พื้นฐาน",
        brief: "จัดแพ็กเกจสามใบให้เป็นระเบียบ และให้การเลือกหนึ่งใบเปลี่ยนกรอบและข้อความสรุป",
        html: `<section class="plans" aria-label="เลือกแพ็กเกจ">
  <div class="plan-list">
    <article class="plan" data-plan="Basic"><h2>Basic</h2><p>฿99 / เดือน</p><button type="button">เลือก Basic</button></article>
    <article class="plan" data-plan="Plus"><h2>Plus</h2><p>฿199 / เดือน</p><button type="button">เลือก Plus</button></article>
    <article class="plan" data-plan="Pro"><h2>Pro</h2><p>฿299 / เดือน</p><button type="button">เลือก Pro</button></article>
  </div>
  <p id="plan-status" role="status">ยังไม่ได้เลือกแพ็กเกจ</p>
</section>`,
        starterCss: `/* เขียน CSS จัดการ์ด 3 ใบและสถานะ selected ที่นี่ */\n`,
        starterJs: `// เขียน JavaScript จัดการคลิกเลือกแพ็กเกจทีละใบที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ Grid หรือ Flexbox จัดการ์ดให้เรียงสวยงาม",
          "ระดับ 2: ใช้ querySelectorAll วนลูปถอดคลาส selected ออกทั้งหมดก่อนใส่ให้ใบที่ถูกคลิก",
          "ระดับ 3: อัปเดตข้อความใน #plan-status ให้แสดงชื่อแพ็กเกจที่เลือก"
        ],
        solutionCss: `.plans { width: 100%; max-width: 650px; }\n.plan-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 14px; }\n.plan { min-width: 0; padding: 16px 10px; border: 2px solid #dae3ed; border-radius: 13px; text-align: center; background: #fff; transition: transform .2s, border-color .2s, box-shadow .2s; cursor: pointer; }\n.plan h2 { margin: 0; font-size: 1.05rem; }\n.plan p { margin: 8px 0 15px; color: #5b6e81; font-size: .79rem; }\n.plan button { border: 0; border-radius: 7px; background: #dff4f1; color: #075c61; padding: 7px 9px; font-size: .75rem; font-weight: 800; }\n.plan.selected { border-color: #0d8987; box-shadow: 0 8px 18px #0d898727; transform: translateY(-4px); }\n.plan.selected button { background: #0d8987; color: white; }\n#plan-status { text-align: center; font-size: .85rem; font-weight: 800; color: #176d70; }\n@media(max-width:400px) {\n  .plan-list { grid-template-columns: 1fr; }\n}`,
        solutionJs: `const plans = document.querySelectorAll('.plan');\nconst status = document.querySelector('#plan-status');\n\nplans.forEach(plan => {\n  plan.addEventListener('click', () => {\n    plans.forEach(item => item.classList.remove('selected'));\n    plan.classList.add('selected');\n    status.textContent = 'เลือกแพ็กเกจ ' + plan.dataset.plan + ' แล้ว';\n  });\n});`
      },
      {
        id: "page-layout", category: "css-js", title: "จัดหน้าเว็บและเปลี่ยนแท็บ", level: "กลาง",
        brief: "สร้างหน้าบทเรียนที่มีเมนูด้านบนและเนื้อหาที่สลับแสดงตามแท็บที่ผู้ใช้คลิก",
        html: `<div class="lesson-page">
  <header class="lesson-header"><strong>WEB LAB</strong><nav aria-label="หัวข้อบทเรียน"><button type="button" data-tab="html">HTML</button><button type="button" data-tab="css">CSS</button><button type="button" data-tab="js">JavaScript</button></nav></header>
  <main class="lesson-main">
    <section data-panel="html"><h1>HTML</h1><p>กำหนดโครงสร้างและความหมายของเนื้อหา</p></section>
    <section data-panel="css"><h1>CSS</h1><p>จัดวาง สี ระยะห่าง และภาพเคลื่อนไหว</p></section>
    <section data-panel="js"><h1>JavaScript</h1><p>จัดการข้อมูล เหตุการณ์ และการโต้ตอบ</p></section>
  </main>
</div>`,
        starterCss: `/* เขียน CSS จัดหน้าเว็บและสถานะแท็บที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ควบคุมการสลับแท็บเนื้อหาที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ attribute hidden หรือ display:none เพื่อซ่อนเนื้อหาที่ไม่เกี่ยวข้อง",
          "ระดับ 2: เขียนฟังก์ชันเลือกแท็บโดยเช็ค dataset.tab กับ dataset.panel",
          "ระดับ 3: เพิ่มคลาส active ให้ปุ่มแท็บที่ถูกเลือก"
        ],
        solutionCss: `.lesson-page { width: 100%; min-height: 230px; border: 1px solid #d4e0e9; border-radius: 13px; overflow: hidden; background: white; }\n.lesson-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 15px; background: #172b49; color: white; }\n.lesson-header strong { font-size: .87rem; letter-spacing: .06em; }\n.lesson-header nav { display: flex; gap: 5px; flex-wrap: wrap; }\n.lesson-header button { border: 0; border-radius: 7px; background: transparent; color: #d0e1eb; padding: 7px 9px; font-size: .75rem; cursor: pointer; }\n.lesson-header button.active { background: #67e2d3; color: #142943; font-weight: 900; }\n.lesson-main { padding: 20px; }\n.lesson-main section[hidden] { display: none; }\n.lesson-main h1 { margin: 0 0 6px; color: #126e75; font-size: 1.6rem; }\n.lesson-main p { margin: 0; color: #586c82; font-size: .87rem; }`,
        solutionJs: `const tabs = document.querySelectorAll('[data-tab]');\nconst panels = document.querySelectorAll('[data-panel]');\n\nfunction choose(name) {\n  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === name));\n  panels.forEach(panel => panel.hidden = panel.dataset.panel !== name);\n}\n\ntabs.forEach(tab => {\n  tab.addEventListener('click', () => choose(tab.dataset.tab));\n});\nchoose('html');`
      },
      ...ADDITIONAL_EXERCISES.filter(e => e.category === "css-js"),
      {
        id: "spinner", category: "animation", title: "วงโหลดหมุน", level: "เริ่มต้น",
        brief: "สร้างวงแสดงสถานะโหลดด้วย CSS keyframes พร้อมปุ่มสลับหยุดและเริ่มใหม่",
        html: `<div class="loading-demo"><div class="spinner" role="status" aria-label="กำลังโหลด"></div><p id="loading-label">กำลังโหลด...</p><button id="loading-toggle" type="button">หยุด</button></div>`,
        starterCss: `/* เขียน CSS สร้าง spinner และ @keyframes spin ที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ควบคุมการหยุด/เล่นอนิเมชันที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ border-top-color และ @keyframes transform: rotate(360deg)",
          "ระดับ 2: ใช้คลาส .paused ร่วมกับ animation-play-state: paused",
          "ระดับ 3: สลับข้อความปุ่มและข้อความสถานะตามการคลิก"
        ],
        solutionCss: `.loading-demo { text-align: center; }\n.spinner { width: 68px; height: 68px; margin: 0 auto 12px; border: 8px solid #dceeed; border-top-color: #0d8582; border-radius: 50%; animation: spin .8s linear infinite; }\n.spinner.paused { animation-play-state: paused; }\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.loading-demo p { color: #31485e; font-weight: 800; margin-bottom: 10px; }\n.loading-demo button { border: 0; border-radius: 8px; background: #173b59; color: white; padding: 8px 18px; font-weight: 800; cursor: pointer; }`,
        solutionJs: `const spinner = document.querySelector('.spinner');\nconst button = document.querySelector('#loading-toggle');\nconst label = document.querySelector('#loading-label');\n\nbutton.addEventListener('click', () => {\n  const paused = spinner.classList.toggle('paused');\n  button.textContent = paused ? 'เริ่ม' : 'หยุด';\n  label.textContent = paused ? 'หยุดโหลดชั่วคราว' : 'กำลังโหลด...';\n});`
      },
      {
        id: "progress", category: "animation", title: "แถบโหลดและจุดกระพริบ", level: "พื้นฐาน",
        brief: "สร้างหน้าโหลดที่มีแถบความคืบหน้าและจุดกระพริบ กดเริ่มแล้วค่อย ๆ วิ่งถึง 100%",
        html: `<div class="progress-demo"><h1>กำลังเตรียมหน้า</h1><div class="dots" aria-hidden="true"><span></span><span></span><span></span></div><div class="track"><div id="progress-fill"></div></div><p id="progress-label" role="status">พร้อมเริ่ม</p><button id="progress-start" type="button">เริ่มโหลด</button></div>`,
        starterCss: `/* เขียน CSS จัดแถบโหลดและ keyframes จุดกระพริบที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ควบคุม setInterval เพิ่ม progress ที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ animation-delay กับจุดแต่ละจุดเพื่อความต่อเนื่อง",
          "ระดับ 2: ใช้ setInterval และกำหนดความกว้าง width เป็นเปอร์เซ็นต์",
          "ระดับ 3: เคลียร์ interval เมื่อครบ 100% พร้อมเปิดใช้งานปุ่มอีกครั้ง"
        ],
        solutionCss: `.progress-demo { width: min(100%, 310px); padding: 22px; border: 1px solid #dce7ed; border-radius: 16px; background: #fff; text-align: center; box-shadow: 0 9px 25px #1d36531b; }\n.progress-demo h1 { margin: 0 0 6px; font-size: 1.1rem; }\n.dots { display: flex; justify-content: center; gap: 6px; height: 25px; }\n.dots span { width: 8px; height: 8px; border-radius: 50%; background: #0b8d8a; animation: blink .9s ease-in-out infinite alternate; }\n.dots span:nth-child(2) { animation-delay: .2s; }\n.dots span:nth-child(3) { animation-delay: .4s; }\n@keyframes blink {\n  from { opacity: .25; transform: translateY(2px); }\n  to { opacity: 1; transform: translateY(-3px); }\n}\n.track { height: 12px; border-radius: 999px; background: #dce9ed; overflow: hidden; }\n#progress-fill { height: 100%; width: 0; background: linear-gradient(90deg, #0a8b88, #60dccc); transition: width .15s linear; }\n.progress-demo p { margin: 10px 0; color: #395369; font-size: .83rem; }\n.progress-demo button { border: 0; border-radius: 8px; background: #173b59; color: white; padding: 8px 16px; font-weight: 800; cursor: pointer; }`,
        solutionJs: `const fill = document.querySelector('#progress-fill');\nconst label = document.querySelector('#progress-label');\nconst button = document.querySelector('#progress-start');\nlet timer;\n\nbutton.addEventListener('click', () => {\n  clearInterval(timer);\n  let value = 0;\n  fill.style.width = '0%';\n  label.textContent = 'กำลังโหลด 0%';\n  button.disabled = true;\n  timer = setInterval(() => {\n    value = Math.min(value + 5, 100);\n    fill.style.width = value + '%';\n    label.textContent = value === 100 ? 'โหลดสำเร็จ' : 'กำลังโหลด ' + value + '%';\n    if (value === 100) {\n      clearInterval(timer);\n      button.disabled = false;\n      button.textContent = 'เริ่มใหม่';\n    }\n  }, 120);\n});`
      },
      {
        id: "traffic", category: "animation", title: "ไฟจราจรตามจังหวะ", level: "กลาง",
        brief: "ให้ไฟแดง เหลือง เขียว ติดทีละดวงตามลำดับพร้อมปุ่มเริ่ม หยุด และรีเซ็ต",
        html: `<div class="traffic-demo"><div class="traffic-light" aria-label="ไฟจราจร"><span class="bulb red"></span><span class="bulb yellow"></span><span class="bulb green"></span></div><p id="traffic-label" role="status">ไฟแดง</p><div class="traffic-actions"><button id="traffic-play" type="button">เริ่ม</button><button id="traffic-pause" type="button">หยุด</button><button id="traffic-reset" type="button">รีเซ็ต</button></div></div>`,
        starterCss: `/* เขียน CSS จัดไฟจราจรและสถานะไฟติดที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ควบคุมลำดับไฟด้วย setInterval ที่นี่\n`,
        hints: [
          "ระดับ 1: จัดกล่องไฟจราจรด้วย background เข้มและหลอดไฟทรงกลม",
          "ระดับ 2: ใช้คลาส .on ควบคุมความสว่างของหลอดไฟแต่ละสี",
          "ระดับ 3: เก็บตัวแปร timer เพื่อรองรับปุ่มหยุดและรีเซ็ตค่ากลับจุดเริ่มต้น"
        ],
        solutionCss: `.traffic-demo { text-align: center; }\n.traffic-light { display: grid; gap: 8px; width: 70px; padding: 10px; margin: 0 auto 10px; border-radius: 16px; background: #142d45; box-shadow: 0 10px 20px #132d4540; }\n.bulb { width: 50px; height: 50px; border-radius: 50%; opacity: .24; box-shadow: inset 0 2px 8px #0008; }\n.red { background: #ff5959; }\n.yellow { background: #ffd05a; }\n.green { background: #3be0a2; }\n.bulb.on { opacity: 1; box-shadow: 0 0 20px currentColor, inset 0 2px 8px #0004; }\n.traffic-demo p { font-weight: 900; color: #263f56; margin-bottom: 10px; }\n.traffic-actions { display: flex; gap: 6px; justify-content: center; }\n.traffic-actions button { border: 0; border-radius: 8px; background: #dff3f1; color: #0b6467; padding: 7px 10px; font-size: .79rem; font-weight: 800; cursor: pointer; }`,
        solutionJs: `const bulbs = [document.querySelector('.red'), document.querySelector('.green'), document.querySelector('.yellow')];\nconst names = ['ไฟแดง', 'ไฟเขียว', 'ไฟเหลือง'];\nconst label = document.querySelector('#traffic-label');\nlet step = 0, timer;\n\nfunction draw() {\n  bulbs.forEach((bulb, i) => bulb.classList.toggle('on', i === step));\n  label.textContent = names[step];\n}\n\ndocument.querySelector('#traffic-play').addEventListener('click', () => {\n  if (timer) return;\n  timer = setInterval(() => {\n    step = (step + 1) % 3;\n    draw();\n  }, 1000);\n});\ndocument.querySelector('#traffic-pause').addEventListener('click', () => {\n  clearInterval(timer);\n  timer = null;\n});\ndocument.querySelector('#traffic-reset').addEventListener('click', () => {\n  clearInterval(timer);\n  timer = null;\n  step = 0;\n  draw();\n});\ndraw();`
      },
      ...ADDITIONAL_EXERCISES.filter(e => e.category === "animation"),
      {
        id: "hide-tiles", category: "dom", title: "คลิกแล้วหาย", level: "เริ่มต้น",
        brief: "คลิกการ์ดแล้วการ์ดนั้นหายไปพร้อมนับจำนวนที่เหลือ และกดรีเซ็ตให้กลับมาครบ",
        html: `<div class="hide-demo"><div class="tile-row"><button class="tile" type="button">A</button><button class="tile" type="button">B</button><button class="tile" type="button">C</button><button class="tile" type="button">D</button></div><p id="tile-count" role="status">เหลือ 4 ใบ</p><button id="tiles-reset" type="button">รีเซ็ต</button></div>`,
        starterCss: `/* เขียน CSS จัดการ์ดและปุ่มรีเซ็ตที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ซ่อนการ์ดเมื่อคลิกและนับจำนวนที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้แอตทริบิวต์ hidden หรือ display:none เพื่อซ่อนการ์ด",
          "ระดับ 2: ใช้ filter เช็คจำนวนการ์ดที่ยังไม่ถูกซ่อน",
          "ระดับ 3: วนลูปคืนค่า hidden=false ทุกใบเมื่อกดปุ่มรีเซ็ต"
        ],
        solutionCss: `.hide-demo { text-align: center; }\n.tile-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 9px; }\n.tile { width: 54px; height: 58px; border: 2px solid #0c817e; border-radius: 11px; background: #dff8f4; color: #116b6c; font-size: 1.35rem; font-weight: 900; transition: transform .18s; cursor: pointer; }\n.tile:hover { transform: translateY(-4px); }\n.tile[hidden] { display: none; }\n.hide-demo p { margin: 13px 0; color: #254860; font-weight: 800; }\n#tiles-reset { border: 0; border-radius: 8px; padding: 8px 14px; background: #1c3657; color: white; cursor: pointer; }`,
        solutionJs: `const tiles = [...document.querySelectorAll('.tile')];\nconst count = document.querySelector('#tile-count');\n\nfunction update() {\n  count.textContent = 'เหลือ ' + tiles.filter(tile => !tile.hidden).length + ' ใบ';\n}\n\ntiles.forEach(tile => {\n  tile.addEventListener('click', () => {\n    tile.hidden = true;\n    update();\n  });\n});\n\ndocument.querySelector('#tiles-reset').addEventListener('click', () => {\n  tiles.forEach(tile => tile.hidden = false);\n  update();\n});`
      },
      {
        id: "file-colors", category: "dom", title: "อ่านไฟล์และสลับสี", level: "พื้นฐาน",
        brief: "เลือกไฟล์ข้อความจากเครื่องเพื่อแสดงเนื้อหา พร้อมปุ่มเปลี่ยนสีพื้นหลัง",
        html: `<div class="reader-demo"><label for="text-file">เลือกไฟล์ .txt</label><input id="text-file" type="file" accept=".txt,text/plain"><p id="file-name" role="status">ยังไม่ได้เลือกไฟล์</p><button id="sample-file" type="button">ลองข้อความตัวอย่าง</button> <button id="color-button" type="button">สลับสีพื้น</button><pre id="file-content">เนื้อหาไฟล์จะแสดงตรงนี้</pre></div>`,
        starterCss: `/* เขียน CSS จัดโซนอ่านไฟล์และสลับสีที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ใช้ FileReader อ่านข้อความที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ FileReader และ readAsText เพื่อดึงข้อมูลข้อความจากไฟล์",
          "ระดับ 2: ดักจับเหตุการณ์ change ที่ input type=file",
          "ระดับ 3: วนลูปเปลี่ยนคลาส tone-1 หรือ tone-2 บนกล่องพรีวิวเพื่อสลับสี"
        ],
        solutionCss: `.reader-demo { width: min(100%, 390px); padding: 17px; border: 1px solid #d5e1e9; border-radius: 13px; background: white; }\n.reader-demo label { display: block; font-weight: 800; }\n.reader-demo input { display: block; max-width: 100%; margin: 8px 0; }\n.reader-demo p { margin: 8px 0; font-size: .8rem; color: #4d6579; }\n.reader-demo button { border: 0; border-radius: 7px; padding: 7px 11px; background: #144f65; color: #fff; cursor: pointer; margin-top: 4px; }\n.reader-demo pre { min-height: 86px; max-height: 126px; overflow: auto; white-space: pre-wrap; overflow-wrap: anywhere; margin: 10px 0 0; padding: 12px; border-radius: 9px; background: #e9f9f5; color: #183646; font: 13px/1.5 Consolas, monospace; }\n.reader-demo pre.tone-1 { background: #fff3d7; }\n.reader-demo pre.tone-2 { background: #e8edff; }`,
        solutionJs: `const input = document.querySelector('#text-file');\nconst output = document.querySelector('#file-content');\nconst name = document.querySelector('#file-name');\nlet tone = 0;\n\ndocument.querySelector('#color-button').addEventListener('click', () => {\n  tone = (tone + 1) % 3;\n  output.className = tone ? 'tone-' + tone : '';\n});\n\nfunction readFile(file) {\n  name.textContent = 'ไฟล์: ' + file.name;\n  const reader = new FileReader();\n  reader.onload = () => {\n    output.textContent = String(reader.result);\n  };\n  reader.onerror = () => {\n    output.textContent = 'อ่านไฟล์ไม่สำเร็จ';\n  };\n  reader.readAsText(file);\n}\n\ninput.addEventListener('change', () => {\n  if (input.files[0]) readFile(input.files[0]);\n});\n\ndocument.querySelector('#sample-file').addEventListener('click', () => {\n  readFile(new File(['สวัสดี! นี่คือข้อความตัวอย่างจากไฟล์ทดลอง'], 'sample.txt', { type: 'text/plain' }));\n});`
      },
      {
        id: "rings", category: "dom", title: "วงกลม 3 ชั้น", level: "กลาง",
        brief: "ฝึก DOM event bubbling: วงนอกเปลี่ยนเฉพาะวงนอก วงกลางเปลี่ยนเฉพาะวงกลาง ส่วนวงในเปลี่ยนทั้งสามวง",
        html: `<div class="rings-demo"><div id="outer" class="ring outer" role="button" tabindex="0" aria-label="วงนอก"><div id="middle" class="ring middle" role="button" tabindex="0" aria-label="วงกลาง"><div id="inner" class="ring inner" role="button" tabindex="0" aria-label="วงใน">INNER</div></div></div><p id="ring-status" role="status">ลองคลิกแต่ละวง</p><button id="rings-reset" type="button">รีเซ็ต</button></div>`,
        starterCss: `/* เขียน CSS จัดวงกลมซ้อน 3 ชั้นและสถานะ active ที่นี่ */\n`,
        starterJs: `// เขียน JavaScript จัดการ event.stopPropagation() ที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ e.stopPropagation() เพื่อป้องกันเหตุการณ์คลิกลามไปยังวงด้านนอก",
          "ระดับ 2: จัดโครงสร้าง CSS ด้วยการวางซ้อนกันตรงกลาง (Grid/Flex)",
          "ระดับ 3: เพิ่มปุ่มรีเซ็ตคลาส active ออกจากทุกวง"
        ],
        solutionCss: `.rings-demo { text-align: center; }\n.ring { display: grid; place-items: center; border-radius: 50%; cursor: pointer; transition: background .22s, transform .22s; }\n.ring:focus-visible { outline: 3px solid #f7a847; outline-offset: 3px; }\n.outer { width: 210px; height: 210px; margin: 0 auto 10px; background: #deebf2; display: grid; place-items: center; }\n.middle { width: 142px; height: 142px; background: #b7d5df; display: grid; place-items: center; }\n.inner { width: 74px; height: 74px; background: #67adb7; color: #073846; font-size: .72rem; font-weight: 900; }\n.outer.active { background: #f7c8bf; }\n.middle.active { background: #ffdb82; }\n.inner.active { background: #62ddbf; transform: scale(1.06); }\n.rings-demo p { margin: 10px 0; color: #355269; font-size: .82rem; }\n.rings-demo button { border: 0; border-radius: 8px; background: #173b59; color: white; padding: 7px 15px; cursor: pointer; }`,
        solutionJs: `const outer = document.querySelector('#outer');\nconst middle = document.querySelector('#middle');\nconst inner = document.querySelector('#inner');\nconst status = document.querySelector('#ring-status');\n\nfunction onActivate(el, action) {\n  el.addEventListener('click', e => {\n    e.stopPropagation();\n    action();\n  });\n}\n\nonActivate(outer, () => {\n  outer.classList.toggle('active');\n  status.textContent = 'เปลี่ยนเฉพาะวงนอก';\n});\nonActivate(middle, () => {\n  middle.classList.toggle('active');\n  status.textContent = 'เปลี่ยนเฉพาะวงกลาง';\n});\nonActivate(inner, () => {\n  [outer, middle, inner].forEach(el => el.classList.toggle('active'));\n  status.textContent = 'เปลี่ยนทั้งสามวง';\n});\ndocument.querySelector('#rings-reset').addEventListener('click', () => {\n  [outer, middle, inner].forEach(el => el.classList.remove('active'));\n  status.textContent = 'กลับสู่สถานะเริ่มต้น';\n});`
      },
      ...ADDITIONAL_EXERCISES.filter(e => e.category === "dom"),
      {
        id: "name-sort", category: "mixed", title: "เพิ่มชื่อและเรียงลำดับ", level: "เริ่มต้น",
        brief: "พิมพ์ชื่อแล้วเพิ่มลงรายการ จากนั้นกดเรียง ก–ฮ หรือ ฮ–ก ได้ทันที",
        html: `<div class="names-demo"><form id="name-form"><label for="name-input">ชื่อ</label><div class="input-row"><input id="name-input" type="text" placeholder="พิมพ์ชื่อ"><button type="submit">เพิ่ม</button></div></form><div class="sort-actions"><button id="sort-asc" type="button">เรียง ก–ฮ</button><button id="sort-desc" type="button">เรียง ฮ–ก</button></div><p id="name-count" role="status">ยังไม่มีชื่อ</p><ul id="name-list"></ul></div>`,
        starterCss: `/* เขียน CSS จัดฟอร์มและรายการชื่อที่นี่ */\n`,
        starterJs: `// เขียน JavaScript จัดการ array, push, sort localeCompare ที่นี่\n`,
        hints: [
          "ระดับ 1: เก็บรายชื่อใน JavaScript Array แล้วเขียนฟังก์ชัน render() แสดงผล",
          "ระดับ 2: ใช้ a.localeCompare(b, 'th') ในการเรียงลำดับภาษาไทย",
          "ระดับ 3: ป้องกันการส่งฟอร์มว่างด้วย e.preventDefault()"
        ],
        solutionCss: `.names-demo { width: min(100%, 360px); padding: 18px; border: 1px solid #d9e5ec; border-radius: 13px; background: white; }\n.names-demo label { font-weight: 800; }\n.input-row { display: flex; gap: 7px; margin-top: 5px; }\n.input-row input { min-width: 0; flex: 1; padding: 8px; border: 1px solid #a9becb; border-radius: 7px; }\n.names-demo button { border: 0; border-radius: 7px; background: #0b817f; color: white; padding: 7px 10px; font-size: .8rem; font-weight: 800; cursor: pointer; }\n.sort-actions { display: flex; gap: 7px; margin-top: 11px; }\n.sort-actions button { background: #dfefed; color: #0d6668; }\n.names-demo p { margin: 11px 0 4px; color: #566e7c; font-size: .8rem; }\n.names-demo ul { margin: 0; padding-left: 23px; max-height: 115px; overflow: auto; text-align: left; }\n.names-demo li { padding: 3px 0; border-bottom: 1px solid #edf2f5; }`,
        solutionJs: `const names = ['มะลิ', 'อิง', 'กานต์'];\nconst input = document.querySelector('#name-input');\nconst list = document.querySelector('#name-list');\nconst count = document.querySelector('#name-count');\n\nfunction render() {\n  list.replaceChildren();\n  names.forEach(name => {\n    const li = document.createElement('li');\n    li.textContent = name;\n    list.append(li);\n  });\n  count.textContent = names.length ? 'ทั้งหมด ' + names.length + ' ชื่อ' : 'ยังไม่มีชื่อ';\n}\n\ndocument.querySelector('#name-form').addEventListener('submit', e => {\n  e.preventDefault();\n  const name = input.value.trim();\n  if (!name) return;\n  names.push(name);\n  input.value = '';\n  render();\n});\n\ndocument.querySelector('#sort-asc').addEventListener('click', () => {\n  names.sort((a, b) => a.localeCompare(b, 'th'));\n  render();\n});\ndocument.querySelector('#sort-desc').addEventListener('click', () => {\n  names.sort((a, b) => b.localeCompare(a, 'th'));\n  render();\n});\nrender();`
      },
      {
        id: "gallery", category: "mixed", title: "กดรูปแล้วเปลี่ยนรูปและข้อความ", level: "พื้นฐาน",
        brief: "คลิกภาพย่อเพื่อแสดงขนาดใหญ่ พร้อมสุ่มข้อความบรรยายจากชุดข้อความ",
        html: `<div class="gallery-demo"><div class="gallery-main"><img id="main-picture" src="{{scene1}}" alt="ภาพตัวอย่าง"></div><p id="picture-caption" role="status">ภาพที่ 1 · เริ่มต้นวันใหม่</p><div class="thumbs"><button class="thumb active" type="button" data-picture="1" aria-pressed="true" aria-label="ภาพที่ 1"><img src="{{scene1}}" alt=""></button><button class="thumb" type="button" data-picture="2" aria-pressed="false" aria-label="ภาพที่ 2"><img src="{{scene2}}" alt=""></button><button class="thumb" type="button" data-picture="3" aria-pressed="false" aria-label="ภาพที่ 3"><img src="{{scene3}}" alt=""></button></div></div>`,
        starterCss: `/* เขียน CSS จัดเลย์เอาต์ภาพใหญ่ ภาพย่อ และกรอบ active ที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ควบคุมการเปลี่ยนภาพและสุ่มข้อความที่นี่\n`,
        hints: [
          "ระดับ 1: เก็บชุดข้อความบรรยาย (Captions) ในออบเจกต์แยกตาม id",
          "ระดับ 2: ใช้ Math.random() สุ่มเลือกข้อความที่ไม่ซ้ำกับข้อความปัจจุบัน",
          "ระดับ 3: เพิ่มคลาส active บนภาพย่อที่ถูกคลิกและเอาออกจากภาพอื่น"
        ],
        solutionCss: `.gallery-demo { width: min(100%, 340px); padding: 12px; border: 1px solid #d8e4eb; border-radius: 14px; background: white; }\n.gallery-main { height: 145px; border-radius: 10px; overflow: hidden; background: #e0edf4; }\n.gallery-main img { display: block; width: 100%; height: 100%; object-fit: cover; }\n.gallery-demo p { min-height: 23px; margin: 9px 1px; color: #254b62; font-size: .78rem; font-weight: 800; }\n.thumbs { display: flex; gap: 7px; justify-content: center; }\n.thumb { width: 65px; height: 48px; padding: 2px; border: 2px solid transparent; border-radius: 7px; background: transparent; overflow: hidden; cursor: pointer; }\n.thumb.active { border-color: #078982; }\n.thumb img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 3px; }`,
        solutionJs: `const main = document.querySelector('#main-picture');\nconst caption = document.querySelector('#picture-caption');\nconst sets = {\n  1: ['เริ่มต้นวันใหม่', 'สูงขึ้นอีกนิด', 'มองไปให้ไกล'],\n  2: ['เมืองยังไม่หลับ', 'ออกไปค้นหา', 'แสงไฟระหว่างทาง'],\n  3: ['พักใจริมทะเล', 'คลื่นลูกใหม่', 'ปล่อยใจให้สบาย']\n};\n\ndocument.querySelectorAll('.thumb').forEach(button => {\n  button.addEventListener('click', () => {\n    document.querySelectorAll('.thumb').forEach(item => item.classList.remove('active'));\n    button.classList.add('active');\n    const id = button.dataset.picture;\n    main.src = button.querySelector('img').src;\n    main.alt = 'ภาพที่ ' + id;\n    const words = sets[id];\n    const choices = words.filter(word => caption.textContent !== 'ภาพที่ ' + id + ' · ' + word);\n    const next = choices[Math.floor(Math.random() * choices.length)];\n    caption.textContent = 'ภาพที่ ' + id + ' · ' + next;\n    document.querySelectorAll('.thumb').forEach(item => item.setAttribute('aria-pressed', String(item === button)));\n  });\n});`
      },
      {
        id: "move-box", category: "mixed", title: "ปุ่มบังคับกล่องสี่ทิศ", level: "กลาง",
        brief: "ทำแผงควบคุมย้ายกล่องไปซ้าย ขวา บน ล่าง โดยไม่ให้กล่องหลุดขอบสนาม พร้อมปุ่มรีเซ็ต",
        html: `<div class="move-demo"><div class="arena"><div id="moving-box" class="moving-box">BOX</div></div><p id="position-label" role="status">ตำแหน่ง: 0, 0</p><div class="direction-pad"><button data-move="up" type="button">บน</button><div><button data-move="left" type="button">ซ้าย</button><button data-move="down" type="button">ล่าง</button><button data-move="right" type="button">ขวา</button></div><button id="move-reset" type="button">รีเซ็ต</button></div></div>`,
        starterCss: `/* เขียน CSS สร้างสนาม กล่อง และแผงปุ่มที่นี่ */\n`,
        starterJs: `// เขียน JavaScript ควบคุมพิกัด x, y และขอบเขตสนามที่นี่\n`,
        hints: [
          "ระดับ 1: ใช้ position: absolute บนกล่อง แล้วปรับค่า style.left และ style.top",
          "ระดับ 2: ใช้ Math.min และ Math.max จำกัดพิกัดไม่ให้เกินขนาด arena",
          "ระดับ 3: อัปเดตป้ายแสดงพิกัดตำแหน่ง x, y ทุกครั้งที่มีการเคลื่อนที่"
        ],
        solutionCss: `.move-demo { text-align: center; }\n.arena { position: relative; width: min(100%, 300px); height: 172px; margin: 0 auto 10px; border: 2px dashed #99b6c8; border-radius: 10px; background: repeating-linear-gradient(0deg, #f5fbfc 0 20px, #ecf5f7 20px 21px); overflow: hidden; }\n.moving-box { position: absolute; left: 0; top: 0; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 9px; background: #0d8987; color: white; font-size: .72rem; font-weight: 900; transition: left .16s, top .16s; }\n.move-demo p { margin: 8px 0; color: #365a70; font-size: .8rem; font-weight: 800; }\n.direction-pad { display: grid; justify-items: center; gap: 4px; }\n.direction-pad > div { display: flex; gap: 4px; }\n.direction-pad button { border: 0; border-radius: 7px; background: #173c5e; color: white; min-width: 48px; padding: 6px 8px; font-size: .78rem; cursor: pointer; }\n.direction-pad #move-reset { background: #e3f3f0; color: #0d6566; }`,
        solutionJs: `const arena = document.querySelector('.arena');\nconst box = document.querySelector('#moving-box');\nconst label = document.querySelector('#position-label');\nlet x = 0, y = 0;\nconst step = 22;\n\nfunction draw() {\n  box.style.left = x + 'px';\n  box.style.top = y + 'px';\n  label.textContent = 'ตำแหน่ง: ' + x + ', ' + y;\n}\n\ndocument.querySelectorAll('[data-move]').forEach(button => {\n  button.addEventListener('click', () => {\n    const dir = button.dataset.move;\n    const maxX = arena.clientWidth - box.offsetWidth - 4;\n    const maxY = arena.clientHeight - box.offsetHeight - 4;\n    if (dir === 'left') x = Math.max(0, x - step);\n    if (dir === 'right') x = Math.min(maxX, x + step);\n    if (dir === 'up') y = Math.max(0, y - step);\n    if (dir === 'down') y = Math.min(maxY, y + step);\n    draw();\n  });\n});\n\ndocument.querySelector('#move-reset').addEventListener('click', () => {\n  x = 0;\n  y = 0;\n  draw();\n});\ndraw();`
      },
      ...ADDITIONAL_EXERCISES.filter(e => e.category === "mixed"),
      ...ADDITIONAL_EXERCISES.filter(e => e.category === "async")
    ];
