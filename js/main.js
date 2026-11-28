// Portafolio Chris Vivas — interacciones
// Paletas de muestra para las "piezas" (se reemplazan por imágenes reales)
const pal = [
  ['#ff4a1c','#0b0b0b'],['#e9e2d4','#111'],['#1d3cff','#f1ede6'],['#111','#ff4a1c'],
  ['#c9f24a','#111'],['#7a2bff','#f1ede6'],['#f1ede6','#d1261b'],['#2b2b2b','#e9e2d4'],
  ['#ff9fc6','#111'],['#0f5c3a','#f1ede6']
];
const art = (i, title, sub, size=32) => {
  const [bg, fg] = pal[i % pal.length];
  const ang = 120 + i * 37;
  return `<div class="art" style="background:linear-gradient(${ang}deg,${bg},${bg} 55%,color-mix(in srgb,${bg} 70%,${fg}));color:${fg};font-size:${size}px"><small>${sub}</small><span>${title}</span></div>`;
};

// Hero collage
const pieces = [
  {t:'NOCHE<br>ROJA',s:'Cover art · 2025',x:4,y:6,w:38,r:-6},
  {t:'MAREA',s:'Identidad visual',x:40,y:0,w:30,r:4},
  {t:'ESTÁTICA',s:'Afiche · Festival',x:68,y:10,w:30,r:-3},
  {t:'Fluor<br>Club',s:'Branding',x:0,y:46,w:32,r:3},
  {t:'TAKE 04',s:'Dirección de arte',x:28,y:36,w:40,r:-2},
  {t:'Volumen',s:'Campaña',x:64,y:46,w:34,r:6},
  {t:'SUR',s:'Packaging',x:16,y:70,w:28,r:-5},
  {t:'ÚLTIMO<br>TREN',s:'Cover art',x:52,y:72,w:28,r:2},
];
const col = document.getElementById('collage');
col.innerHTML = pieces.map((p,i)=>
  `<a class="piece" href="#grafico" data-cursor="Ver proyecto" style="left:${p.x}%;top:${p.y}%;width:${p.w}%;aspect-ratio:1/1;transform:rotate(${p.r}deg);z-index:${i+1}" aria-label="${p.t.replace('<br>',' ')}">${art(i,p.t,p.s,Math.round(p.w*0.9))}</a>`
).join('') + `<span class="tag" style="left:58%;top:34%">Cover arts</span><span class="tag b" style="left:6%;top:38%">Branding</span>`;

// Cintas
const skills = ['Dirección de arte','Branding','Cover arts','Identidad visual','Tipografía','Campañas','Fotografía','Packaging','Moodboards','Photoshop','Illustrator','Figma'];
const clients = ['Marca Uno','Estudio Norte','Sello Sur','Colectivo 22','Radio Faro','Casa Bruma','Fluor Club','Disquera Eco'];
const fill = (id, arr) => {
  const row = arr.map(s=>`<span>${s}</span><span class="sep">/</span>`).join('');
  document.getElementById(id).innerHTML = row + row;
};
fill('skills', skills); fill('clients', clients);

// Diseño gráfico (carrusel)
const gd = [
  ['Noche Roja','Cover art · 2025'],['Marea','Identidad visual · 2025'],['Estática','Afiche · 2024'],
  ['Fluor Club','Branding · 2024'],['Sur','Packaging · 2024'],['Último Tren','Cover art · 2023']
];
const rail = document.getElementById('rail');
rail.innerHTML = gd.map(([t,m],i)=>
  `<a class="card" href="#grafico" data-cursor="Ver proyecto"><div class="thumb">${art(i,t.toUpperCase(),m.split(' · ')[0],40)}</div><h3>${t}</h3><p class="meta">${m}</p></a>`
).join('');
const step = dir => {
  const card = rail.querySelector('.card');
  rail.scrollBy({left: dir * (card.offsetWidth + 16), behavior:'smooth'});
};
document.getElementById('prev').addEventListener('click',()=>step(-1));
document.getElementById('next').addEventListener('click',()=>step(1));
rail.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'){e.preventDefault();step(1)}
  if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}
});

// Dirección de arte
const ad = [
  ['Take 04','Videoclip · Dirección de arte'],['Volumen','Campaña · Fotografía'],
  ['Polvo','Sesión editorial'],['Casa Bruma','Lanzamiento · Set design']
];
document.getElementById('ad').innerHTML = ad.map(([t,m],i)=>
  `<a class="card" href="#arte" data-cursor="Ver proyecto"><div class="thumb">${art(i+4,t.toUpperCase(),m,48)}</div><h3>${t}</h3><p class="meta">${m}</p></a>`
).join('');

// Proyectos reales desde Sanity (si falla o está vacío, quedan las piezas de muestra)
const SANITY = { id: 'slugmlsh', dataset: 'production', v: '2025-01-01' };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let proyectos = [];

const cardReal = (p, i) =>
  `<a class="card" href="#" data-i="${i}" data-cursor="Ver proyecto">
     <div class="thumb"><img src="${esc(p.img)}?w=900&auto=format" alt="${esc(p.alt || p.titulo)}" loading="lazy"></div>
     <h3>${esc(p.titulo)}</h3>
     <p class="meta">${esc(p.categoria)}${p.fecha ? ' · ' + p.fecha.slice(0, 4) : ''}</p>
   </a>`;

(async () => {
  const q = `*[_type=="proyecto"] | order(orden asc, fecha desc){
    titulo, categoria, cliente, fecha, descripcion,
    "img": portada.asset->url, "alt": portada.alt,
    "galeria": galeria[]{ "url": asset->url, alt }
  }`;
  const url = `https://${SANITY.id}.apicdn.sanity.io/v${SANITY.v}/data/query/${SANITY.dataset}?query=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const { result } = await res.json();
    if (!result.length) return;
    proyectos = result;
    const html = (filtro) => result
      .map((p, i) => filtro(p) ? cardReal(p, i) : '')
      .join('');
    const esArte = p => p.categoria === 'Dirección de arte';
    if (result.some(p => !esArte(p))) rail.innerHTML = html(p => !esArte(p));
    if (result.some(esArte)) document.getElementById('ad').innerHTML = html(esArte);
  } catch (err) {
    console.error('Sanity:', err);
  }
})();

// Visor de proyecto
const visor = document.getElementById('visor');

const abrirVisor = (p) => {
  document.getElementById('visorTitulo').textContent = p.titulo;
  document.getElementById('visorMeta').textContent =
    [p.categoria, p.cliente, p.fecha?.slice(0, 4)].filter(Boolean).join(' · ');
  document.getElementById('visorDesc').textContent = p.descripcion || '';
  const fotos = [{ url: p.img, alt: p.alt }, ...(p.galeria || [])];
  document.getElementById('visorFotos').innerHTML = fotos
    .filter(f => f.url)
    .map(f => `<img src="${esc(f.url)}?w=1600&auto=format" alt="${esc(f.alt || p.titulo)}" loading="lazy">`)
    .join('');
  visor.showModal();
  visor.scrollTop = 0;
};

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card[data-i]');
  if (!card) return;
  e.preventDefault();
  abrirVisor(proyectos[card.dataset.i]);
});

document.getElementById('visorCerrar').addEventListener('click', () => visor.close());
visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });

// Rubros
const rubros = [['Música','12 proyectos'],['Branding','9 proyectos'],['Campañas','6 proyectos'],['Editorial','4 proyectos'],['Fotografía','8 proyectos'],['Packaging','3 proyectos']];
document.getElementById('rubrosList').innerHTML = rubros.map(([t,c],i)=>
  `<li><a href="#grafico" data-cursor="Explorar"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="t">${t}</span><span class="c">${c}</span></a></li>`
).join('');

// Retrato de muestra
document.getElementById('portrait').innerHTML = art(7,'TU FOTO<br>AQUÍ','Retrato',44);

// Formulario (prototipo: no envía nada)
const form = document.getElementById('form');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const sent = document.getElementById('sent');
  if(!form.checkValidity()){ sent.textContent = 'Completa nombre, un email válido y tu mensaje.'; return; }
  sent.textContent = '¡Listo! (En el prototipo no se envía: en la web real va a Formspree.)';
  form.reset();
});

// Cursor personalizado
const cur = document.getElementById('cursor');
const label = document.getElementById('cursorLabel');
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
if (fine && !calm) {
  let x=-100,y=-100,cx=-100,cy=-100;
  document.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
  const loop = () => {
    cx += (x-cx)*.2; cy += (y-cy)*.2;
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('mouseover',e=>{
    const t = e.target.closest('[data-cursor]');
    if(t){ label.textContent = t.dataset.cursor; cur.classList.add('on'); }
    else cur.classList.remove('on');
  });
  document.addEventListener('mouseleave',()=>{x=y=-100});
}
