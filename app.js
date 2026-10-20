const apps = [
  {id:'spreadsheet',name:'Spreadsheet',cat:'Productivité',icon:'▦',desc:'Calculs et graphiques',url:'https://spreadsheet.puter.com/'},
  {id:'documents',name:'Documents',cat:'Productivité',icon:'▤',desc:'Écrire et partager',url:'https://documents.puter.com/'},
  {id:'presentation',name:'Presentation',cat:'Productivité',icon:'▥',desc:'Créer des présentations',url:'https://presentation.puter.com/'},
  {id:'whiteboard',name:'Whiteboard',cat:'Productivité',icon:'✎',desc:'Dessiner et brainstormer',url:'https://whiteboard.puter.com/'},
  {id:'pdf',name:'PDF Editor',cat:'Productivité',icon:'PDF',desc:'Modifier des PDF',url:'#'},
  {id:'chat',name:'Team Chat',cat:'Collaboration',icon:'◌',desc:'Canaux et messages',url:'#'},
  {id:'email',name:'Email',cat:'Collaboration',icon:'@',desc:'Boîte de réception',url:'#'},
  {id:'meetings',name:'Meetings',cat:'Collaboration',icon:'◉',desc:'Appels vidéo',url:'#'},
  {id:'calendar',name:'Calendar',cat:'Collaboration',icon:'□',desc:'Planifier ses journées',url:'#'},
  {id:'contacts',name:'Contacts',cat:'Collaboration',icon:'♙',desc:'Carnet de contacts',url:'#'},
  {id:'signatures',name:'Signatures',cat:'Collaboration',icon:'✓',desc:'Signer des documents',url:'#'},
  {id:'business',name:'Business Hub',cat:'Business',icon:'◆',desc:'Gérer son activité',url:'#'},
  {id:'chess',name:'Chess',cat:'Jeux',icon:'♟',desc:'Échecs',url:'#'},
  {id:'checkers',name:'Checkers',cat:'Jeux',icon:'●',desc:'Dames',url:'#'},
  {id:'backgammon',name:'Backgammon',cat:'Jeux',icon:'⚄',desc:'Backgammon',url:'#'},
  {id:'blockarena',name:'BlockArena',cat:'Jeux',icon:'▦',desc:'Arcade',url:'#'},
  {id:'solitaire',name:'Solitaire',cat:'Jeux',icon:'♤',desc:'Solitaire',url:'#'},
  {id:'sudoku',name:'Sudoku',cat:'Jeux',icon:'9',desc:'Puzzle',url:'#'}
];

const categories = ['Tous','Productivité','Collaboration','Business','Jeux'];
let activeCategory = 'Tous';
let zIndex = 30;
const openWindows = new Map();

const $ = id => document.getElementById(id);

function renderCategories(){
  $('categoryTabs').innerHTML = categories.map(c => `<button class="${c===activeCategory?'active':''}" data-category="${c}">${c}</button>`).join('');
  document.querySelectorAll('[data-category]').forEach(btn => btn.onclick = () => {activeCategory=btn.dataset.category; renderCategories(); renderApps();});
}

function renderApps(){
  const query = $('appSearch').value.trim().toLowerCase();
  const filtered = apps.filter(app => (activeCategory==='Tous'||app.cat===activeCategory) && (!query || `${app.name} ${app.desc} ${app.cat}`.toLowerCase().includes(query)));
  $('appGrid').innerHTML = filtered.length ? filtered.map(app => `
    <button class="app-card" data-app="${app.id}">
      <span class="app-icon">${app.icon}</span>
      <span><strong>${app.name}</strong><small>${app.desc}</small></span>
    </button>`).join('') : '<p style="color:#8993ae">Aucune application trouvée.</p>';
  document.querySelectorAll('[data-app]').forEach(el => el.onclick = () => launchApp(el.dataset.app));
}

function renderDesktopIcons(){
  const favorites = ['spreadsheet','documents','presentation','calendar'];
  $('desktopIcons').innerHTML = favorites.map(id => {
    const app=apps.find(a=>a.id===id); return `<button class="desktop-icon" data-desktop-app="${id}"><span class="icon">${app.icon}</span><span>${app.name}</span></button>`;
  }).join('');
  document.querySelectorAll('[data-desktop-app]').forEach(el => el.onclick=()=>launchApp(el.dataset.desktopApp));
}

function launchApp(id){
  const app = apps.find(a=>a.id===id); if(!app) return;
  $('startMenu').classList.add('hidden');
  if(openWindows.has(id)) { focusWindow(openWindows.get(id)); return; }

  const win=document.createElement('section');
  win.className='app-window'; win.style.zIndex=++zIndex;
  const isExternal = app.url !== '#';
  const body = isExternal
    ? `<h2>${app.name}</h2><p>${app.desc}. Cette application peut être ouverte depuis AlteOS 7. Pour préserver la compatibilité avec les sites externes, elle s'ouvre dans un nouvel onglet.</p><a class="external-launch" href="${app.url}" target="_blank" rel="noopener noreferrer">Ouvrir ${app.name} ↗</a>`
    : `<h2>${app.name}</h2><p>${app.desc}.</p><div class="placeholder-grid"><div class="placeholder"><b>Module en préparation</b><span>Cette application fait partie de l'écosystème AlteOS 7.</span></div><div class="placeholder"><b>Prochaine étape</b><span>L'interface complète sera ajoutée progressivement.</span></div></div>`;
  win.innerHTML=`<div class="window-titlebar"><div class="window-title"><span>${app.icon}</span>${app.name}</div><div class="window-controls"><button data-minimize="1" title="Réduire">—</button><button data-close="1" title="Fermer">×</button></div></div><div class="window-body">${body}</div>`;
  $('windowLayer').appendChild(win); openWindows.set(id,win);
  win.querySelector('[data-close]').onclick=()=>{win.remove();openWindows.delete(id);renderTaskbar();};
  win.querySelector('[data-minimize]').onclick=()=>{win.style.display='none';};
  win.addEventListener('mousedown',()=>focusWindow(win));
  makeDraggable(win);
  renderTaskbar();
}

function focusWindow(win){win.style.display='block';win.style.zIndex=++zIndex;}
function makeDraggable(win){
  const bar=win.querySelector('.window-titlebar'); let dragging=false,startX=0,startY=0,left=0,top=0;
  bar.addEventListener('pointerdown',e=>{dragging=true;bar.setPointerCapture(e.pointerId);const r=win.getBoundingClientRect();left=r.left;top=r.top;startX=e.clientX;startY=e.clientY;win.style.transform='none';});
  bar.addEventListener('pointermove',e=>{if(!dragging)return;const x=Math.max(5,Math.min(window.innerWidth-win.offsetWidth-5,left+e.clientX-startX));const y=Math.max(5,Math.min(window.innerHeight-win.offsetHeight-75,top+e.clientY-startY));win.style.left=x+'px';win.style.top=y+'px';});
  bar.addEventListener('pointerup',()=>dragging=false);
}

function renderTaskbar(){
  $('taskbarApps').innerHTML=[...openWindows.keys()].map(id=>{const a=apps.find(x=>x.id===id);return `<button class="task-app active" data-task-app="${id}" title="${a.name}">${a.icon}</button>`}).join('');
  document.querySelectorAll('[data-task-app]').forEach(el=>el.onclick=()=>focusWindow(openWindows.get(el.dataset.taskApp)));
}

$('startButton').onclick=()=>{$('startMenu').classList.toggle('hidden');if(!$('startMenu').classList.contains('hidden'))$('appSearch').focus();};
$('appSearch').addEventListener('input',renderApps);
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('startMenu').classList.add('hidden');if(e.key==='Meta' || (e.ctrlKey&&e.key===' ')){$('startMenu').classList.toggle('hidden');}});

function updateClock(){ $('clock').textContent=new Intl.DateTimeFormat('fr-CA',{hour:'2-digit',minute:'2-digit'}).format(new Date()); }
renderCategories();renderApps();renderDesktopIcons();updateClock();setInterval(updateClock,1000);
