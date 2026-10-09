// Extra exercises use the same HTML/CSS/JS contract as the original lab.
const EXTRA_BASE_CSS = `
.exercise-demo{width:min(100%,380px);padding:18px;border:1px solid #cbdce5;border-radius:16px;background:#fff;box-shadow:0 10px 25px #19364d18}
.exercise-demo h1{margin:0 0 12px;font-size:1.15rem;color:#17374b}
.exercise-demo p{margin:8px 0;font-size:.84rem;color:#40596b}
.exercise-demo button{border:0;border-radius:8px;background:#087f80;color:white;padding:7px 11px;font-weight:700;cursor:pointer}
.exercise-demo button:disabled{opacity:.5;cursor:not-allowed}
.exercise-demo input{min-width:0;padding:7px;border:1px solid #a9becb;border-radius:8px}
.exercise-demo .row{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:8px 0}
.exercise-demo .status{font-weight:700;color:#086c75}
`;

function extraExercise({id, category, title, level = 'พื้นฐาน', brief, html, css, js, hints}) {
  return {
    id, category, title, level, brief, html,
    starterCss: '/* เขียน CSS สำหรับ ' + title + ' ที่นี่ */\n',
    starterJs: '// เขียน JavaScript สำหรับ ' + title + ' ที่นี่\n',
    hints,
    solutionCss: EXTRA_BASE_CSS + css,
    solutionJs: js
  };
}

const ADDITIONAL_EXERCISES = [
  extraExercise({
    id:'product-quantity', category:'css-js', title:'การ์ดสินค้าปรับจำนวน',
    brief:'กดเพิ่มหรือลดจำนวนสินค้า โดยจำนวนต่ำสุดคือ 1 และยอดรวมเปลี่ยนทุกครั้ง',
    html:`<article class="exercise-demo product-card"><h1>แก้วกาแฟเซรามิก</h1><p>ราคาใบละ ฿129</p><div class="row"><button id="qty-minus" type="button" aria-label="ลดจำนวน">−</button><output id="quantity">1</output><button id="qty-plus" type="button" aria-label="เพิ่มจำนวน">+</button></div><p class="status" id="product-total" role="status">รวม ฿129</p></article>`,
    css:`.product-card{text-align:center}.product-card .row{justify-content:center}.product-card output{min-width:36px;font-size:1.2rem;font-weight:800}.product-card button{min-width:36px}`,
    js:`const quantity = document.querySelector('#quantity');
const total = document.querySelector('#product-total');
const minus = document.querySelector('#qty-minus');
let count = 1;
function render(){quantity.textContent=count;total.textContent='รวม ฿'+(count*129).toLocaleString('th-TH');minus.disabled=count===1;}
document.querySelector('#qty-plus').addEventListener('click',()=>{count++;render();});
minus.addEventListener('click',()=>{count=Math.max(1,count-1);render();});
render();`,
    hints:['เก็บจำนวนในตัวแปร เริ่มต้นที่ 1','ใช้ Math.max(1, จำนวน - 1) เพื่อป้องกันค่าต่ำกว่า 1','คูณจำนวนกับราคาต่อชิ้นและอัปเดต output ทุกครั้ง']
  }),
  extraExercise({
    id:'theme-colors', category:'css-js', title:'ปุ่มเลือกสีธีม',
    brief:'เลือกสีหลักจากอย่างน้อย 4 สี แสดงชื่อสี และเน้นกรอบปุ่มที่เลือก',
    html:`<section class="exercise-demo palette-demo"><h1>เลือกสีธีม</h1><div class="row" aria-label="สีธีม"><button type="button" data-color="#087f80" data-name="เขียว" aria-pressed="true">เขียว</button><button type="button" data-color="#2563eb" data-name="น้ำเงิน" aria-pressed="false">น้ำเงิน</button><button type="button" data-color="#be185d" data-name="ชมพู" aria-pressed="false">ชมพู</button><button type="button" data-color="#7c3aed" data-name="ม่วง" aria-pressed="false">ม่วง</button></div><p class="status" id="color-name" role="status">สีที่เลือก: เขียว</p><div class="color-banner">ตัวอย่างสีหลัก</div></section>`,
    css:`.palette-demo{--theme:#087f80}.palette-demo h1,.palette-demo .status{color:var(--theme)}.palette-demo .row{justify-content:center}.palette-demo button{background:var(--swatch);border:3px solid transparent}.palette-demo button:nth-child(1){--swatch:#087f80}.palette-demo button:nth-child(2){--swatch:#2563eb}.palette-demo button:nth-child(3){--swatch:#be185d}.palette-demo button:nth-child(4){--swatch:#7c3aed}.palette-demo button.selected{border-color:#172a46;box-shadow:0 0 0 2px #fff inset}.color-banner{padding:18px;border-radius:10px;background:var(--theme);color:#fff;text-align:center;font-weight:800;transition:background .2s}`,
    js:`const panel=document.querySelector('.palette-demo');
const buttons=[...panel.querySelectorAll('[data-color]')];
function select(button){panel.style.setProperty('--theme',button.dataset.color);document.querySelector('#color-name').textContent='สีที่เลือก: '+button.dataset.name;buttons.forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));});}
buttons.forEach(button=>button.addEventListener('click',()=>select(button)));
select(buttons[0]);`,
    hints:['กำหนดสีหลักด้วย CSS custom property','อ่านชื่อและรหัสสีจาก data attributes ของปุ่ม','ลบคลาส selected จากปุ่มอื่น แล้วใส่ให้ปุ่มที่เลือก']
  }),
  extraExercise({
    id:'article-font-size', category:'css-js', title:'แผงควบคุมขนาดตัวอักษร',
    brief:'เพิ่ม ลด และคืนค่าขนาดตัวอักษรเฉพาะบทความ พร้อมแสดงขนาดปัจจุบัน',
    html:`<section class="exercise-demo font-demo"><h1>แผงอ่านบทความ</h1><div class="row"><button type="button" id="font-decrease">เล็กลง</button><button type="button" id="font-reset">ค่าเดิม</button><button type="button" id="font-increase">ใหญ่ขึ้น</button></div><p class="status" id="font-size" role="status">ขนาดปัจจุบัน: 16px</p><article id="reading-article">การอ่านบนหน้าจอจะสบายตาขึ้น เมื่อเราเลือกขนาดตัวอักษรที่เหมาะกับตัวเอง</article></section>`,
    css:`.font-demo .row{justify-content:center}.font-demo article{padding:12px;border-left:4px solid #087f80;background:#e8f6f5;line-height:1.6;font-size:16px}.font-demo .status{text-align:center}`,
    js:`const article=document.querySelector('#reading-article');const sizeLabel=document.querySelector('#font-size');let size=16;
function render(){article.style.fontSize=size+'px';sizeLabel.textContent='ขนาดปัจจุบัน: '+size+'px';}
document.querySelector('#font-decrease').addEventListener('click',()=>{size=Math.max(12,size-2);render();});
document.querySelector('#font-increase').addEventListener('click',()=>{size=Math.min(28,size+2);render();});
document.querySelector('#font-reset').addEventListener('click',()=>{size=16;render();});`,
    hints:['กำหนด font-size ที่ element บทความเท่านั้น','เก็บขนาดในตัวแปรและปรับครั้งละ 2px','ปุ่มคืนค่ากำหนดขนาดกลับเป็น 16px แล้วอัปเดตป้าย']
  }),
  extraExercise({
    id:'typing-dots', category:'animation', title:'จุดกำลังพิมพ์ข้อความ',
    brief:'สร้างจุดสามจุดที่เคลื่อนไหวเหลื่อมกัน และมีปุ่มเริ่มหรือหยุดแอนิเมชัน',
    html:`<section class="exercise-demo typing-demo"><h1>สถานะการพิมพ์</h1><div class="typing-bubble" aria-label="กำลังพิมพ์"><span></span><span></span><span></span></div><div class="row"><button id="typing-toggle" type="button">หยุด</button><span id="typing-status" role="status">กำลังพิมพ์...</span></div></section>`,
    css:`.typing-bubble{display:flex;gap:7px;align-items:center;width:max-content;padding:13px 18px;border-radius:18px;background:#dff4f1}.typing-bubble span{width:10px;height:10px;border-radius:50%;background:#087f80;animation:typing-bounce .75s infinite alternate}.typing-bubble span:nth-child(2){animation-delay:.18s}.typing-bubble span:nth-child(3){animation-delay:.36s}.typing-bubble.paused span{animation-play-state:paused}@keyframes typing-bounce{to{transform:translateY(-9px);opacity:.35}}`,
    js:`const bubble=document.querySelector('.typing-bubble');const button=document.querySelector('#typing-toggle');
button.addEventListener('click',()=>{const paused=bubble.classList.toggle('paused');button.textContent=paused?'เริ่ม':'หยุด';document.querySelector('#typing-status').textContent=paused?'หยุดชั่วคราว':'กำลังพิมพ์...';});`,
    hints:['สร้าง @keyframes ให้จุดขยับขึ้นและลง','ใช้ animation-delay คนละค่าในแต่ละจุด','สลับคลาสที่กำหนด animation-play-state: paused']
  }),
  extraExercise({
    id:'bouncing-ball', category:'animation', title:'ลูกบอลเด้งในสนาม',
    brief:'ให้ลูกบอลเด้งกลับเมื่อถึงขอบสนาม และเปลี่ยนความเร็วด้วยปุ่ม',
    html:`<section class="exercise-demo ball-demo"><h1>ลูกบอลเด้ง</h1><div class="ball-field"><div class="ball"></div></div><div class="row"><button id="ball-speed" type="button">เพิ่มความเร็ว</button><span id="speed-label" role="status">ความเร็ว: ปกติ</span></div></section>`,
    css:`.ball-field{position:relative;height:150px;border:2px solid #aac8ce;border-radius:12px;background:#edf8f7;overflow:hidden}.ball{position:absolute;top:56px;left:0;width:34px;height:34px;border-radius:50%;background:#f27c54;box-shadow:inset -6px -5px 0 #d45b49;animation:ball-travel 2s linear infinite alternate}.ball.fast{animation-duration:.7s}@keyframes ball-travel{from{left:0}to{left:calc(100% - 34px)}}`,
    js:`const ball=document.querySelector('.ball');const button=document.querySelector('#ball-speed');
button.addEventListener('click',()=>{const fast=ball.classList.toggle('fast');button.textContent=fast?'ลดความเร็ว':'เพิ่มความเร็ว';document.querySelector('#speed-label').textContent='ความเร็ว: '+(fast?'เร็ว':'ปกติ');});`,
    hints:['กำหนด position: relative ให้สนามและ absolute ให้ลูกบอล','ใช้ keyframes กับ animation-direction: alternate เพื่อเด้งกลับ','เปลี่ยน animation-duration ผ่านคลาส fast']
  }),
  extraExercise({
    id:'sliding-notice', category:'animation', title:'การ์ดแจ้งเตือนเข้าและออก',
    brief:'แสดงการ์ดด้วยการเลื่อนเข้า ปิดด้วยการเลื่อนออก และกดแสดงใหม่ได้',
    html:`<section class="exercise-demo notice-demo"><h1>การแจ้งเตือน</h1><button id="show-notice" type="button">แสดงแจ้งเตือน</button><div class="notice-stage"><div class="notice-card" id="notice-card"><strong>บันทึกสำเร็จ</strong><p>ข้อมูลของคุณพร้อมใช้งานแล้ว</p><button id="close-notice" type="button">ปิด</button></div></div></section>`,
    css:`.notice-stage{height:140px;overflow:hidden;margin-top:12px}.notice-card{padding:10px 14px;border-left:5px solid #087f80;border-radius:10px;background:#e1f5ed;transform:translateX(120%);opacity:0;transition:transform .45s ease,opacity .45s ease}.notice-card.visible{transform:translateX(0);opacity:1}.notice-card p{margin:4px 0}.notice-card button{background:#22536a}`,
    js:`const card=document.querySelector('#notice-card');document.querySelector('#show-notice').addEventListener('click',()=>card.classList.add('visible'));document.querySelector('#close-notice').addEventListener('click',()=>card.classList.remove('visible'));`,
    hints:['กำหนดตำแหน่งเริ่มต้นของการ์ดด้วย transform: translateX','ใช้ transition กับ transform และ opacity','ปุ่มแสดงเพิ่มคลาส visible ปุ่มปิดลบคลาสนั้น']
  }),
  extraExercise({
    id:'faq-toggle', category:'dom', title:'คำถามที่กดเปิดคำตอบ',
    brief:'เปิดหรือปิดคำตอบอย่างน้อย 4 ข้อ โดยเปิดหลายข้อพร้อมกันได้',
    html:`<section class="exercise-demo faq-demo"><h1>คำถามที่พบบ่อย</h1><div class="faq-item"><button type="button" aria-expanded="false">สมัครสมาชิกอย่างไร?</button><p hidden>กดสมัครแล้วกรอกอีเมลของคุณ</p></div><div class="faq-item"><button type="button" aria-expanded="false">เปลี่ยนรหัสผ่านได้ไหม?</button><p hidden>เปลี่ยนได้ในหน้าตั้งค่าบัญชี</p></div><div class="faq-item"><button type="button" aria-expanded="false">มีค่าบริการหรือไม่?</button><p hidden>การใช้งานพื้นฐานไม่มีค่าบริการ</p></div><div class="faq-item"><button type="button" aria-expanded="false">ติดต่อฝ่ายช่วยเหลืออย่างไร?</button><p hidden>ส่งข้อความผ่านหน้าติดต่อเรา</p></div></section>`,
    css:`.faq-item{border-bottom:1px solid #d8e5e9}.faq-item button{width:100%;padding:10px 2px;text-align:left;background:transparent;color:#17374b}.faq-item button[aria-expanded=true]{color:#087f80}.faq-item p{margin:0 0 10px;padding:0 2px}.faq-item p[hidden]{display:none}`,
    js:`document.querySelectorAll('.faq-item button').forEach(button=>button.addEventListener('click',()=>{const answer=button.nextElementSibling;answer.hidden=!answer.hidden;button.setAttribute('aria-expanded',String(!answer.hidden));}));`,
    hints:['จับคู่ปุ่มกับคำตอบโดยใช้ nextElementSibling','สลับ hidden ของคำตอบแต่ละข้ออย่างอิสระ','อัปเดต aria-expanded ให้ตรงกับสถานะคำตอบ']
  }),
  extraExercise({
    id:'search-filter', category:'dom', title:'ค้นหาและกรองรายการ',
    brief:'แสดงรายการที่ตรงกับทั้งคำค้นและประเภทที่เลือก พร้อมข้อความเมื่อไม่พบข้อมูล',
    html:`<section class="exercise-demo filter-demo"><h1>ค้นหาสิ่งของ</h1><input id="item-search" type="search" placeholder="ค้นหาชื่อสิ่งของ" aria-label="ค้นหาชื่อสิ่งของ"><div class="row" id="item-filters"><button type="button" data-type="all" aria-pressed="true">ทั้งหมด</button><button type="button" data-type="fruit" aria-pressed="false">ผลไม้</button><button type="button" data-type="drink" aria-pressed="false">เครื่องดื่ม</button><button type="button" data-type="snack" aria-pressed="false">ขนม</button></div><ul id="item-list"><li data-type="fruit">แอปเปิล</li><li data-type="fruit">กล้วย</li><li data-type="drink">กาแฟ</li><li data-type="drink">ชาเขียว</li><li data-type="snack">คุกกี้</li><li data-type="snack">เค้ก</li></ul><p id="filter-empty" hidden>ไม่พบรายการ</p></section>`,
    css:`.filter-demo input{width:100%}.filter-demo .row{gap:4px}.filter-demo button{font-size:.75rem;background:#dceceb;color:#176468}.filter-demo button.active{background:#087f80;color:white}.filter-demo ul{margin:5px 0;padding-left:22px;max-height:100px;overflow:auto}.filter-demo li{padding:3px}.filter-demo [hidden]{display:none}`,
    js:`const search=document.querySelector('#item-search');const filters=[...document.querySelectorAll('#item-filters button')];const items=[...document.querySelectorAll('#item-list li')];let type='all';
function render(){const query=search.value.trim().toLocaleLowerCase('th');let shown=0;items.forEach(item=>{item.hidden=!(type==='all'||item.dataset.type===type)||!item.textContent.toLocaleLowerCase('th').includes(query);if(!item.hidden)shown++;});document.querySelector('#filter-empty').hidden=shown!==0;}
search.addEventListener('input',render);filters.forEach(button=>button.addEventListener('click',()=>{type=button.dataset.type;filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});render();}));filters[0].classList.add('active');render();`,
    hints:['อ่านคำค้นจาก input และประเภทจากปุ่มที่เลือก','แสดงรายการเมื่อชื่อมีคำค้นและประเภทตรงกันทั้งคู่','นับรายการที่แสดงเพื่อแจ้งว่าไม่พบข้อมูล']
  }),
  extraExercise({
    id:'detail-modal', category:'dom', title:'หน้าต่างรายละเอียด',
    brief:'กดการ์ดอย่างน้อย 3 ใบเพื่อดูรายละเอียด และปิดด้วยปุ่มหรือคลิกด้านนอก',
    html:`<section class="exercise-demo detail-demo"><h1>เลือกสถานที่</h1><div class="detail-cards"><button type="button" data-title="ทะเล" data-detail="พักผ่อนริมชายหาดและชมพระอาทิตย์ตก">🏖️ ทะเล</button><button type="button" data-title="ภูเขา" data-detail="เดินป่าและรับอากาศสดชื่น">⛰️ ภูเขา</button><button type="button" data-title="เมือง" data-detail="สำรวจร้านกาแฟและพิพิธภัณฑ์">🏙️ เมือง</button></div><dialog id="detail-dialog"><h2 id="detail-title"></h2><p id="detail-text"></p><button id="detail-close" type="button">ปิด</button></dialog></section>`,
    css:`.detail-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.detail-cards button{min-height:70px;background:#dff1ef;color:#176568}.detail-demo dialog{width:min(90%,300px);border:0;border-radius:14px;padding:20px;box-shadow:0 15px 40px #142b4566}.detail-demo dialog::backdrop{background:#142b4588}.detail-demo h2{margin:0;font-size:1.15rem}.detail-demo dialog p{margin:10px 0}`,
    js:`const dialog=document.querySelector('#detail-dialog');document.querySelectorAll('.detail-cards button').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#detail-title').textContent=button.dataset.title;document.querySelector('#detail-text').textContent=button.dataset.detail;dialog.showModal();}));document.querySelector('#detail-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close();});`,
    hints:['เก็บชื่อและรายละเอียดไว้ใน data attributes ของการ์ด','ใช้ dialog.showModal() เมื่อเลือกการ์ด','ตรวจ event.target === dialog เพื่อปิดเมื่อคลิกพื้นหลัง']
  }),
  extraExercise({
    id:'personal-tasks', category:'mixed', title:'รายการงานส่วนตัว',
    brief:'เพิ่มงาน ทำเครื่องหมายว่าเสร็จ ลบงาน และกรองทั้งหมด กำลังทำ หรือเสร็จแล้ว',
    html:`<section class="exercise-demo todo-demo"><h1>งานของฉัน</h1><form id="task-form" class="row"><input id="task-input" type="text" placeholder="พิมพ์งานใหม่" aria-label="งานใหม่" required><button type="submit">เพิ่ม</button></form><div class="row" id="task-filters"><button type="button" data-filter="all">ทั้งหมด</button><button type="button" data-filter="open">กำลังทำ</button><button type="button" data-filter="done">เสร็จแล้ว</button></div><ul id="task-list"></ul><p class="status" id="task-count" role="status">ยังไม่มีงาน</p></section>`,
    css:`.todo-demo input{flex:1}.todo-demo #task-filters button{font-size:.75rem;background:#dceceb;color:#176468}.todo-demo #task-filters button.active{background:#087f80;color:white}.todo-demo ul{list-style:none;margin:4px 0;padding:0;max-height:115px;overflow:auto}.todo-demo li{display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid #e1ebee}.todo-demo li span{flex:1;overflow-wrap:anywhere}.todo-demo li.done span{text-decoration:line-through;color:#8496a2}.todo-demo li button{padding:4px 7px;font-size:.75rem}.todo-demo li .remove{background:#b54754}`,
    js:`const tasks=[];let filter='all';const list=document.querySelector('#task-list');const filters=[...document.querySelectorAll('#task-filters button')];
function render(){list.replaceChildren();tasks.forEach((task,index)=>{if(filter==='open'&&task.done||filter==='done'&&!task.done)return;const li=document.createElement('li');li.classList.toggle('done',task.done);const toggle=document.createElement('button');toggle.type='button';toggle.textContent=task.done?'↩':'✓';toggle.setAttribute('aria-label',task.done?'ยกเลิกเสร็จ':'ทำเสร็จ');toggle.addEventListener('click',()=>{task.done=!task.done;render();});const name=document.createElement('span');name.textContent=task.name;const remove=document.createElement('button');remove.type='button';remove.className='remove';remove.textContent='ลบ';remove.addEventListener('click',()=>{tasks.splice(index,1);render();});li.append(toggle,name,remove);list.append(li);});document.querySelector('#task-count').textContent='ทั้งหมด '+tasks.length+' งาน · เสร็จ '+tasks.filter(task=>task.done).length+' งาน';filters.forEach(button=>button.classList.toggle('active',button.dataset.filter===filter));}
document.querySelector('#task-form').addEventListener('submit',event=>{event.preventDefault();const input=document.querySelector('#task-input');const name=input.value.trim();if(!name)return;tasks.push({name,done:false});input.value='';render();});filters.forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;render();}));render();`,
    hints:['เก็บงานเป็น array ของ object ที่มี name และ done','สร้างปุ่มเปลี่ยนสถานะกับปุ่มลบของแต่ละงาน','กรองงานตามสถานะก่อนสร้าง element และทำเส้นขีดฆ่างานที่เสร็จ']
  }),
  extraExercise({
    id:'choice-quiz', category:'mixed', title:'แบบทดสอบตัวเลือก',
    brief:'แสดงคำถามพร้อมตัวเลือก บอกว่าตอบถูกหรือผิด นับคะแนน และเริ่มใหม่ได้',
    html:`<section class="exercise-demo quiz-demo"><h1>แบบทดสอบเว็บ</h1><p id="quiz-progress"></p><p id="quiz-question"></p><div id="quiz-options"></div><p class="status" id="quiz-feedback" role="status"></p><p id="quiz-score">คะแนน: 0</p><button id="quiz-next" type="button" hidden>ข้อต่อไป</button><button id="quiz-restart" type="button" hidden>เริ่มใหม่</button></section>`,
    css:`.quiz-demo #quiz-options{display:grid;gap:6px}.quiz-demo #quiz-options button{text-align:left;background:#e1f1ef;color:#175f65}.quiz-demo #quiz-options button.correct{background:#0b8f72;color:white}.quiz-demo #quiz-options button.wrong{background:#bb4353;color:white}.quiz-demo #quiz-feedback{min-height:20px}.quiz-demo [hidden]{display:none}`,
    js:`const questions=[{q:'ภาษาใดใช้จัดโครงสร้างหน้าเว็บ?',options:['HTML','CSS','JavaScript'],answer:0},{q:'สิ่งใดใช้จัดสีและเลย์เอาต์?',options:['HTML','CSS','JSON'],answer:1},{q:'เมธอดใดใช้เลือก element ตาม CSS selector?',options:['setTimeout','querySelector','fetch'],answer:1}];let index=0,score=0,answered=false;const options=document.querySelector('#quiz-options');const next=document.querySelector('#quiz-next');const restart=document.querySelector('#quiz-restart');
function render(){answered=false;options.replaceChildren();document.querySelector('#quiz-progress').textContent='ข้อ '+(index+1)+' / '+questions.length;document.querySelector('#quiz-question').textContent=questions[index].q;document.querySelector('#quiz-feedback').textContent='';document.querySelector('#quiz-score').textContent='คะแนน: '+score;next.hidden=true;restart.hidden=true;questions[index].options.forEach((choice,n)=>{const button=document.createElement('button');button.type='button';button.textContent=choice;button.addEventListener('click',()=>{if(answered)return;answered=true;const correct=n===questions[index].answer;if(correct)score++;document.querySelector('#quiz-feedback').textContent=correct?'ถูกต้อง!':'ผิด — คำตอบคือ '+questions[index].options[questions[index].answer];document.querySelector('#quiz-score').textContent='คะแนน: '+score;[...options.children].forEach((item,i)=>{item.disabled=true;if(i===questions[index].answer)item.classList.add('correct');else if(i===n)item.classList.add('wrong');});if(index<questions.length-1)next.hidden=false;else restart.hidden=false;});options.append(button);});}
next.addEventListener('click',()=>{index++;render();});restart.addEventListener('click',()=>{index=0;score=0;render();});render();`,
    hints:['เก็บคำถาม ตัวเลือก และ index คำตอบใน array','หลังตอบให้ปิดปุ่มตัวเลือกและบอกผลทันที','เพิ่มคะแนนเฉพาะคำตอบที่ถูก แล้วรีเซ็ต index กับคะแนนเมื่อเริ่มใหม่']
  }),
  extraExercise({
    id:'shopping-cart', category:'mixed', title:'ตะกร้าสินค้า',
    brief:'เพิ่มสินค้าหลายชนิด เปลี่ยนจำนวนหรือลบสินค้า และอัปเดตยอดรวมทุกครั้ง',
    html:`<section class="exercise-demo cart-demo"><h1>ร้านเล็ก ๆ</h1><div id="catalog" class="row"><button type="button" data-id="cup">เพิ่มแก้ว ฿120</button><button type="button" data-id="book">เพิ่มสมุด ฿80</button><button type="button" data-id="pen">เพิ่มปากกา ฿25</button></div><ul id="cart-list"></ul><p class="status" id="cart-total" role="status">รวม ฿0</p></section>`,
    css:`.cart-demo #catalog button{font-size:.73rem}.cart-demo ul{list-style:none;margin:8px 0;padding:0;max-height:135px;overflow:auto}.cart-demo li{display:flex;align-items:center;gap:5px;padding:5px 0;border-bottom:1px solid #e1ebee}.cart-demo li span{flex:1}.cart-demo li button{padding:3px 7px;font-size:.75rem}.cart-demo li .remove{background:#b54754}.cart-demo output{min-width:18px;text-align:center}`,
    js:`const products={cup:{name:'แก้ว',price:120},book:{name:'สมุด',price:80},pen:{name:'ปากกา',price:25}};const cart={};const list=document.querySelector('#cart-list');
function render(){list.replaceChildren();let total=0;Object.entries(cart).forEach(([id,quantity])=>{const product=products[id];total+=product.price*quantity;const li=document.createElement('li');const name=document.createElement('span');name.textContent=product.name+' ฿'+product.price;const minus=document.createElement('button');minus.type='button';minus.textContent='−';minus.setAttribute('aria-label','ลดจำนวน'+product.name);minus.addEventListener('click',()=>{if(--cart[id]===0)delete cart[id];render();});const count=document.createElement('output');count.textContent=quantity;const plus=document.createElement('button');plus.type='button';plus.textContent='+';plus.setAttribute('aria-label','เพิ่มจำนวน'+product.name);plus.addEventListener('click',()=>{cart[id]++;render();});const remove=document.createElement('button');remove.type='button';remove.className='remove';remove.textContent='ลบ';remove.addEventListener('click',()=>{delete cart[id];render();});li.append(name,minus,count,plus,remove);list.append(li);});document.querySelector('#cart-total').textContent='รวม ฿'+total.toLocaleString('th-TH');}
document.querySelectorAll('#catalog button').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.id;cart[id]=(cart[id]||0)+1;render();}));render();`,
    hints:['เก็บสินค้าและราคาแยกจากจำนวนในตะกร้า','เพิ่มจำนวนสินค้าเดิมแทนสร้างรายการซ้ำ','คำนวณยอดรวมใหม่ทุกครั้งที่เพิ่ม ลด หรือลบ']
  }),
  extraExercise({
    id:'order-status', category:'async', title:'ติดตามสถานะคำสั่งซื้อ', level:'กลาง',
    brief:'ใช้ async/await แสดงสถานะกำลังโหลด แล้วแสดงข้อมูลหลังรอ หรือแจ้งข้อผิดพลาด',
    html:`<section class="exercise-demo async-demo"><h1>ติดตามคำสั่งซื้อ</h1><p>คำสั่งซื้อ #A102</p><div class="row"><button id="check-order" type="button">ตรวจสอบ</button><label><input id="order-fail" type="checkbox"> จำลองข้อผิดพลาด</label></div><p class="status" id="order-result" role="status">พร้อมตรวจสอบ</p></section>`,
    css:`.async-demo label{font-size:.78rem;color:#40596b}.async-demo input{vertical-align:middle}.async-demo .status{min-height:40px;padding:9px;border-radius:8px;background:#e4f3f1}.async-demo .status.error{background:#fee8e8;color:#a33745}`,
    js:`const button=document.querySelector('#check-order');const result=document.querySelector('#order-result');
function fetchOrder(shouldFail){return new Promise((resolve,reject)=>setTimeout(()=>shouldFail?reject(new Error('ตรวจสอบคำสั่งซื้อไม่สำเร็จ')):resolve({id:'A102',status:'กำลังจัดส่ง'}),900));}
button.addEventListener('click',async()=>{button.disabled=true;result.classList.remove('error');result.textContent='กำลังโหลด...';try{const order=await fetchOrder(document.querySelector('#order-fail').checked);result.textContent='คำสั่งซื้อ #'+order.id+' · '+order.status;}catch(error){result.classList.add('error');result.textContent=error.message;}finally{button.disabled=false;}});`,
    hints:['สร้าง Promise ที่ resolve หรือ reject หลัง setTimeout','ใช้ async function และ await เพื่อรอผล','ครอบด้วย try/catch/finally เพื่อแสดงข้อผิดพลาดและเปิดปุ่มอีกครั้ง']
  }),
  extraExercise({
    id:'parallel-load', category:'async', title:'โหลดข้อมูลหลายส่วนพร้อมกัน', level:'กลาง',
    brief:'โหลดข้อมูลสินค้าและผู้ใช้พร้อมกันด้วย Promise.all แล้วแสดงผลเมื่อครบ หรือแจ้งข้อผิดพลาด',
    html:`<section class="exercise-demo async-demo"><h1>ข้อมูลร้านค้า</h1><div class="row"><button id="load-data" type="button">โหลดข้อมูล</button><label><input id="load-fail" type="checkbox"> จำลองข้อผิดพลาด</label></div><p class="status" id="load-status" role="status">พร้อมโหลด</p><div id="load-result"></div></section>`,
    css:`.async-demo label{font-size:.78rem;color:#40596b}.async-demo input{vertical-align:middle}.async-demo .status{padding:8px;border-radius:8px;background:#e4f3f1}.async-demo .status.error{background:#fee8e8;color:#a33745}.async-demo #load-result p{padding:5px;border-bottom:1px solid #dce8e9}`,
    js:`const button=document.querySelector('#load-data');const status=document.querySelector('#load-status');const output=document.querySelector('#load-result');
function loadProducts(fail){return new Promise((resolve,reject)=>setTimeout(()=>fail?reject(new Error('โหลดข้อมูลสินค้าไม่สำเร็จ')):resolve(['แก้ว','สมุด','ปากกา']),650));}
function loadUser(){return new Promise(resolve=>setTimeout(()=>resolve({name:'มินตรา'}),1000));}
button.addEventListener('click',async()=>{button.disabled=true;output.replaceChildren();status.classList.remove('error');status.textContent='กำลังโหลดทั้งสองส่วน...';try{const [products,user]=await Promise.all([loadProducts(document.querySelector('#load-fail').checked),loadUser()]);const person=document.createElement('p');person.textContent='ผู้ใช้: '+user.name;const items=document.createElement('p');items.textContent='สินค้า: '+products.join(', ');output.append(person,items);status.textContent='โหลดครบทั้งสองส่วนแล้ว';}catch(error){status.classList.add('error');status.textContent=error.message;}finally{button.disabled=false;}});`,
    hints:['สร้าง Promise สองตัวที่ใช้เวลาต่างกัน','ใช้ await Promise.all([งานสินค้า, งานผู้ใช้])','แสดงข้อมูลหลัง Promise ทั้งสองสำเร็จ และ catch เมื่อมีงานล้มเหลว']
  }),
  extraExercise({
    id:'all-settled-check', category:'async', title:'ตรวจสอบงานหลายรายการ', level:'กลาง',
    brief:'จำลองงาน 4 รายการที่มีทั้งสำเร็จและล้มเหลว แสดงผลทุกรายการและสรุปจำนวนด้วย Promise.allSettled',
    html:`<section class="exercise-demo async-demo"><h1>ตรวจสอบ 4 รายการ</h1><button id="run-checks" type="button">เริ่มตรวจสอบ</button><p class="status" id="check-summary" role="status">พร้อมตรวจสอบ</p><ol id="check-results"></ol></section>`,
    css:`.async-demo .status{padding:8px;border-radius:8px;background:#e4f3f1}.async-demo ol{margin:7px 0;padding-left:22px;max-height:140px;overflow:auto;font-size:.82rem}.async-demo li{padding:3px}.async-demo li.ok{color:#087f80}.async-demo li.fail{color:#ae3448}`,
    js:`const button=document.querySelector('#run-checks');const summary=document.querySelector('#check-summary');const list=document.querySelector('#check-results');const jobs=[{name:'รูปภาพ',ok:true,delay:350},{name:'ข้อมูลสมาชิก',ok:false,delay:650},{name:'ตะกร้า',ok:true,delay:450},{name:'การชำระเงิน',ok:false,delay:800}];
function check(job){return new Promise((resolve,reject)=>setTimeout(()=>job.ok?resolve(job.name):reject(new Error(job.name)),job.delay));}
button.addEventListener('click',async()=>{button.disabled=true;list.replaceChildren();summary.textContent='กำลังตรวจสอบ...';const results=await Promise.allSettled(jobs.map(check));let passed=0,failed=0;results.forEach((result,index)=>{const li=document.createElement('li');if(result.status==='fulfilled'){passed++;li.className='ok';li.textContent=jobs[index].name+' — สำเร็จ';}else{failed++;li.className='fail';li.textContent=jobs[index].name+' — ล้มเหลว';}list.append(li);});summary.textContent='สำเร็จ '+passed+' รายการ · ล้มเหลว '+failed+' รายการ';button.disabled=false;});`,
    hints:['ใช้ Promise.allSettled เพื่อให้ได้ผลแม้บาง Promise จะ reject','ตรวจ status ว่า fulfilled หรือ rejected ของแต่ละรายการ','นับผลทั้งสองประเภทและแสดงรายการครบทั้ง 4 งาน']
  })
];
