(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const loader = $('#loader');
let seen = false;
try { seen = sessionStorage.getItem('yd-seen') === '1'; sessionStorage.setItem('yd-seen', '1'); } catch (e) {}
function startPage() { document.body.classList.add('ready'); heroIn(); }
if (reduce || seen) { loader.remove(); requestAnimationFrame(startPage); }
else {
const t0 = performance.now(), dur = 1100, num = $('#loader-count'), bar = $('#loader-bar');
(function tick(now) {
const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
num.textContent = String(Math.round(e * 100)).padStart(2, '0');
bar.style.transform = `scaleX(${e})`;
if (p < 1) requestAnimationFrame(tick);
else { loader.classList.add('done'); setTimeout(startPage, 250); setTimeout(() => loader.remove(), 1000); }
})(t0);
}
function heroIn() {
$('#hero-copy').classList.add('in');
$$('#hero-copy .reveal').forEach(el => el.classList.add('in'));
setTimeout(() => $('#stage').classList.remove('pre'), 250);
setTimeout(startSwap, 1600);
countUp($$('#hero-copy [data-count]'));
startReel();
}
function startSwap() {
if (reduce) return;
const items = $$('#swap > span'); let i = 0;
setInterval(() => {
const cur = items[i]; i = (i + 1) % items.length; const nxt = items[i];
cur.classList.remove('on'); cur.classList.add('off');
nxt.classList.remove('off'); nxt.classList.add('on');
setTimeout(() => cur.classList.remove('off'), 700);
}, 2400);
}
function countUp(els) {
els.forEach((el, k) => {
const to = +el.dataset.count, t0 = performance.now() + k * 120, dur = 1400;
if (reduce) { el.textContent = to; return; }
(function f(now) {
const p = Math.max(0, Math.min(1, (now - t0) / dur)), e = 1 - Math.pow(1 - p, 4);
el.textContent = Math.round(to * e);
if (p < 1) requestAnimationFrame(f);
})(performance.now());
});
}
const io = new IntersectionObserver(entries => {
entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach(el => { if (!el.closest('#hero-copy')) io.observe(el); });
setTimeout(() => {
$$('.reveal').forEach(el => el.classList.add('in'));
$('#hero-copy').classList.add('in'); $('#stage').classList.remove('pre'); $('#funnel').classList.add('in');
}, 3500);
const fio = new IntersectionObserver(en => { if (en[0].isIntersecting) { $('#funnel').classList.add('in'); fio.disconnect(); } }, { threshold: .35 });
fio.observe($('#funnel'));
const nav = $('#navbar'), prog = $('#progress');
addEventListener('scroll', () => {
const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
nav.classList.toggle('scrolled', y > 40);
prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
}, { passive: true });
if (fine && !reduce) {
document.body.classList.add('has-cursor');
const dot = $('#cursor-dot'), ring = $('#cursor-ring');
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; });
(function loop() { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); })();
document.addEventListener('mouseover', e => {
const view = e.target.closest('[data-cursor="view"]');
const btn = e.target.closest('a, button, label, .opt');
ring.classList.toggle('view', !!view && !btn);
ring.classList.toggle('hover', !!btn);
});
$$('[data-magnetic]').forEach(el => {
el.addEventListener('mousemove', e => {
const r = el.getBoundingClientRect();
const x = (e.clientX - r.left - r.width / 2) * .25, y = (e.clientY - r.top - r.height / 2) * .35;
el.style.transform = `translate(${x}px, ${y}px)`;
});
el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});
const stage = $('#stage'), inner = $('#stage-inner');
addEventListener('mousemove', e => {
const r = stage.getBoundingClientRect();
if (r.bottom < 0 || r.top > innerHeight) return;
const engaged = !!e.target.closest('.laptop');
stage.classList.toggle('engaged', engaged);
if (engaged) { inner.style.transform = 'none'; return; }
const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
inner.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
});
$$('[data-tilt]').forEach(card => {
card.addEventListener('mousemove', e => {
const r = card.getBoundingClientRect();
const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
card.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px)`;
});
card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
}
function startReel() {
const slides = $$('#reel .reel-slide'), bars = $$('#reel-progress b');
$$('[data-words]').forEach(h => {
let i = 0;
h.innerHTML = h.innerHTML.split(/(<em>.*?<\/em>|\s+)/).filter(s => s && s.trim()).map(s =>
`<span class="w" style="--i:${i++}">${s}</span>`).join(' ');
});
let k = 0;
function show(n) {
slides.forEach((s, j) => s.classList.toggle('on', j === n));
bars.forEach((b, j) => { b.classList.remove('run', 'done'); if (j < n) b.classList.add('done'); });
void bars[n].offsetWidth; bars[n].classList.add('run');
}
show(0);
if (!reduce) setInterval(() => { k = (k + 1) % slides.length; show(k); }, 3200);
}
const presets = {
birdbuddy: {
url: 'yourstore.com/products/birdbuddy-bundle',
title: 'Birdbuddy Nook vs. Home 2K HDR solar matchmaker', badge: 'Q4 gift AOV +58%',
desc: 'Pick yard sunlight and birding goal to auto-bundle the right feeder, Solar Roof, nutrition set and Pro membership:',
opts: [{ title: 'Birdbuddy Home (2K HDR) + Solar Roof', sub: '135° FOV · continuous solar charging', price: 239 },
{ title: 'Birdbuddy Nook starter bundle', sub: 'Accessible <$100 feeder + seed pack', price: 99 }],
addon1: { label: 'Add 3-in-1 nutrition set + perch extender (+$49)', price: 49 },
addon2: { label: 'Attach Nature Intelligence Pro annual pass (+$59/yr)', price: 59 },
ship: 150
},
burrow: {
url: 'yourstore.com/products/nomad-sectional',
title: 'Burrow Nomad vs. Union room-width & stairwell sizer', badge: 'Free-shipping unlocker',
desc: 'Match living-room width and 24-inch walk-up stairwell clearance with tool-free modular add-ons:',
opts: [{ title: 'Nomad 5-seat corner sectional', sub: '110" L × 85" D · ships in 6 UPS boxes', price: 2235 },
{ title: 'Union 4-seat plush sectional', sub: '108" L · 27" deep chenille bench', price: 2405 }],
addon1: { label: 'Add matching modular ottoman (+$337 sale)', price: 337 },
addon2: { label: 'Attach Index 60" walnut media console (+$579)', price: 579 },
ship: 2000
},
lectric: {
url: 'yourstore.com/products/xp4-long-range',
title: 'Lectric XP4 vs. XPedition2 long-range & gas ROI builder', badge: 'TIME 100 climate hook',
desc: 'Compare 500W standard vs. 750W long-range battery tiers and attach high-margin commuter accessories:',
opts: [{ title: 'XP4 750W long-range step-thru', sub: 'Includes 8 free accessories · save $532', price: 1299 },
{ title: 'XPedition2 dual-battery cargo eBike', sub: '450 lb payload · extended range', price: 1999 }],
addon1: { label: 'Add front + rear cargo basket package (+$119)', price: 119 },
addon2: { label: 'Attach waterproof pannier bag + lock (+$111)', price: 111 },
ship: 1500
}
};
let cur = 'birdbuddy', opt = 0, shown = 0;
const priceEl = $('#sim-price');
function animatePrice(to) {
const from = shown, t0 = performance.now(), dur = reduce ? 1 : 600;
priceEl.classList.remove('bump'); void priceEl.offsetWidth; priceEl.classList.add('bump');
(function f(now) {
const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
shown = Math.round(from + (to - from) * e);
priceEl.textContent = '$' + shown.toLocaleString('en-US');
if (p < 1) requestAnimationFrame(f);
})(t0);
}
function render() {
const p = presets[cur];
const a1 = $('#addon1').checked ? p.addon1.price : 0, a2 = $('#addon2').checked ? p.addon2.price : 0;
const total = p.opts[opt].price + a1 + a2;
animatePrice(total);
$('#sim-lift').textContent = `+$${(a1 + a2).toLocaleString('en-US')} add-on AOV lift`;
const pct = Math.min(100, total / p.ship * 100);
$('#ship-bar').style.width = pct + '%';
$('#ship-label').textContent = total >= p.ship ? `✓ Free shipping unlocked ($${p.ship.toLocaleString('en-US')}+)` : `$${(p.ship - total).toLocaleString('en-US')} away from free shipping`;
$$('.opt').forEach(b => b.classList.toggle('active', +b.dataset.opt === opt));
}
function load(key, animate) {
const body = $('#sim-body');
const apply = () => {
cur = key; opt = 0;
const p = presets[key];
$('#sim-url').textContent = p.url;
$('#sim-title').textContent = p.title; $('#sim-badge').textContent = p.badge; $('#sim-desc').textContent = p.desc;
[0, 1].forEach(i => { $(`#opt${i}-title`).textContent = p.opts[i].title; $(`#opt${i}-sub`).textContent = p.opts[i].sub; });
$('#addon1-label').textContent = p.addon1.label; $('#addon2-label').textContent = p.addon2.label;
$('#addon1').checked = true; $('#addon2').checked = true;
$$('.sandbox-tab').forEach(t => t.classList.toggle('active', t.dataset.preset === key));
render();
body.classList.remove('swapping');
};
if (animate && !reduce) { body.classList.add('swapping'); setTimeout(apply, 220); } else apply();
}
$$('.sandbox-tab').forEach(t => t.addEventListener('click', () => load(t.dataset.preset, true)));
$$('.opt').forEach(b => b.addEventListener('click', () => { opt = +b.dataset.opt; render(); }));
['#addon1', '#addon2'].forEach(id => $(id).addEventListener('change', render));
load('birdbuddy', false);
const matrix = $('#matrix');
for (let i = 0; i < 12; i++) matrix.appendChild(document.createElement('i'));
const cells = $$('#matrix i');
let step = 0;
function matrixTick() {
cells.forEach(c => c.className = '');
const n = step % 6;
for (let i = 0; i <= n * 2 && i < 12; i++) cells[i].classList.add('hot');
if (n === 5) [2, 7].forEach(i => cells[i].className = 'win');
step++;
}
matrixTick();
if (!reduce) setInterval(matrixTick, 700);
$('#copy-email').addEventListener('click', async () => {
const t = $('#toast'), btn = $('#copy-email');
try { await navigator.clipboard.writeText('smileyesh2007@gmail.com'); t.textContent = 'Email copied'; }
catch (e) {
const r = document.createRange(); r.selectNodeContents(btn);
const s = getSelection(); s.removeAllRanges(); s.addRange(r);
t.textContent = 'Address selected. Press Ctrl+C or ⌘C to copy';
}
t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2400);
});
})();
