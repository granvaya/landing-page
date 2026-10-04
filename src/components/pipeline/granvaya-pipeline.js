/*!
 * <granvaya-pipeline> — knowledge-graph pipeline animation, restyled as "the press".
 * ------------------------------------------------------------------
 * Self-contained custom element (Shadow DOM). Adapted from the supplied
 * "Webpage Animation" package: same behaviour, re-skinned in the Gazette palette.
 * Colours and fonts come from the page's CSS variables (--color-*, --font-*), which
 * inherit straight through the shadow boundary.
 *
 * LAYOUTS
 *   wide   (container >= 720px)  landscape: belt + press on the left, tree on the right.
 *   stack  (container <  720px)  portrait: belt + press on top, the tree filed beneath.
 *   The element re-builds itself if its container crosses the breakpoint.
 *
 * ATTRIBUTES (all optional, all live)
 *   chrome   "full" (default) | "minimal" (no headline/captions) | "none" (diagram only)
 *   links    "fade" (default) | "keep"  — keep accumulates cross-links so the graph thickens
 *   speed    number, default 1. 0.7 = slower, 1.5 = faster.
 *   paused   boolean attribute — present means frozen
 *
 * BEHAVIOUR
 *   Pauses when scrolled out of view and when the tab is hidden.
 *   Honours prefers-reduced-motion. Cleans up every timer and observer on disconnect.
 */

import { TREE, KEEP, JUNK, ORDER } from '../../data/pipeline.js';

const BREAK = 720;

const LAYOUTS = {
  wide: {
    stack: false, W: 1240, H: 680,
    X1: 612, X2: 792, X3: 986, TOP: 42, BOT: 612,
    BASE: { x: 556, y: 362 },
    trunk: 'M 540 362 L 556 362', trunkLab: null,
    CARD_Y: 336, START_X: -200, GATE_X: 176, IN_X: 378,
    NOTE0: { x: 434, y: 332 },
    legend: { x: 612, y: 648, gap: 132 }
  },
  stack: {
    stack: true, W: 580, H: 1430,
    X1: 62, X2: 198, X3: 338, TOP: 712, BOT: 1328,
    BASE: { x: 28, y: 1020 },
    trunk: 'M 453 476 L 453 606 Q 453 626 433 626 L 48 626 Q 28 626 28 646 L 28 1020',
    trunkLab: { x: 240, y: 614 },
    CARD_Y: 312, START_X: -240, GATE_X: 140, IN_X: 378,
    NOTE0: { x: 430, y: 420 },
    legend: { x: 30, y: 1396, gap: 134 }
  }
};

/* ---------------- styles ---------------- */

const css = (L) => `
:host{display:block;position:relative;width:100%;
  --ink:var(--color-ink,#14110e);--ink-soft:var(--color-ink-soft,#4a443a);--ink-faint:var(--color-ink-faint,#857c6b);
  --paper:var(--color-paper,#ece4d0);--paper-deep:var(--color-paper-deep,#ddd2b4);--paper-hi:var(--color-paper-hi,#f7f1e1);
  --verm:var(--color-vermilion,#d63a1c);--marker:var(--color-marker,#f2cf3a);--pine:var(--color-pine,#2d6a49);
  --display:var(--font-display,"Rozha One",serif);--body:var(--font-body,"Newsreader",Georgia,serif);
  --mono:var(--font-mono,"DM Mono",ui-monospace,monospace);
  font-family:var(--body)}
:host([hidden]){display:none}
*{box-sizing:border-box;margin:0;padding:0}
.frame{position:relative;width:100%;aspect-ratio:${L.W} / ${L.H};overflow:hidden}
.scaler{position:absolute;top:0;left:0;transform-origin:top left}
.stage{position:relative;width:${L.W}px;height:${L.H}px;color:var(--ink);background:var(--paper-hi)}
.grid{position:absolute;inset:0;opacity:.55;
  background-image:linear-gradient(rgba(20,17,14,.055) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(20,17,14,.055) 1px,transparent 1px);
  background-size:40px 40px}

/* ---- title: COLLECTION / CONNECTION differ by exactly two letters ---- */
.head{position:absolute;left:36px;top:80px;z-index:6}
.title{font-family:var(--display);font-size:46px;line-height:1;letter-spacing:-.012em;
  display:flex;align-items:center;gap:14px;white-space:nowrap}
.word{color:var(--ink)}
.morph{display:inline-grid;vertical-align:baseline}
.morph i{grid-area:1/1;font-style:normal;text-align:center}
.morph .a{color:var(--ink-faint);animation:gvA 10s ease-in-out infinite}
.morph .b{color:var(--verm);animation:gvB 10s ease-in-out infinite}
.mark{display:inline-grid;width:30px;height:30px;flex:none}
.mark i{grid-area:1/1;font-style:normal;display:grid;place-items:center;
  width:30px;height:30px;font-size:16px;font-weight:700;font-family:var(--mono)}
.mark .mx{color:var(--ink-faint);border:2px solid var(--ink-faint);animation:gvA 10s ease-in-out infinite}
.mark .mk{color:var(--paper-hi);background:var(--verm);border:2px solid var(--ink);animation:gvB 10s ease-in-out infinite}
.rule{position:absolute;left:36px;top:140px;height:4px;width:0;z-index:6;
  background:var(--ink);animation:gvRule 10s ease-in-out infinite}
@keyframes gvA{0%,20%{opacity:1}27%,92%{opacity:0}100%{opacity:1}}
@keyframes gvB{0%,20%{opacity:0}27%,92%{opacity:1}100%{opacity:0}}
@keyframes gvRule{0%,22%{width:0}34%,92%{width:272px}100%{width:0}}

.stats{position:absolute;left:36px;top:172px;display:grid;grid-template-columns:1fr 1fr;gap:8px;z-index:6}
.stat{background:var(--paper);border:2px solid var(--ink);padding:6px 12px;min-width:116px;
  box-shadow:3px 3px 0 var(--ink)}
.stat b{display:block;font-family:var(--display);font-weight:400;font-size:24px;
  font-variant-numeric:tabular-nums;line-height:1.15}
.stat span{font-family:var(--mono);font-size:9.5px;color:var(--ink-soft);letter-spacing:.14em}
.stat.k b{color:var(--pine)}.stat.s b{color:var(--ink-faint)}.stat.x b{color:var(--verm)}
.bintext{position:absolute;left:150px;top:578px;width:178px;text-align:center;z-index:5;
  font-family:var(--mono);font-size:11px;color:var(--ink-soft);letter-spacing:.2em;font-weight:500}

:host([chrome="minimal"]) .head,:host([chrome="minimal"]) .rule,
:host([chrome="minimal"]) .bintext{display:none}
:host([chrome="none"]) .head,:host([chrome="none"]) .rule,
:host([chrome="none"]) .bintext,:host([chrome="none"]) .stats{display:none}

.belt{position:absolute;left:-60px;top:430px;width:452px;height:24px;z-index:1;
  background:var(--ink);box-shadow:0 6px 0 rgba(20,17,14,.18)}
.belt::after{content:"";position:absolute;inset:0;
  background:repeating-linear-gradient(90deg,rgba(236,228,208,.28) 0 3px,transparent 3px 28px);
  animation:beltmove 1.4s linear infinite}
@keyframes beltmove{to{background-position:28px 0}}
.roller{position:absolute;top:426px;width:32px;height:32px;border-radius:50%;z-index:1;
  background:conic-gradient(from 0deg,var(--ink),#3a342b,var(--ink),#3a342b);
  border:3px solid var(--paper-deep);animation:spin 1.4s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.legs{position:absolute;top:454px;height:66px;width:8px;z-index:1;background:var(--ink)}

.bin{position:absolute;z-index:4;left:176px;top:498px;width:126px;height:70px;
  background:var(--ink);
  clip-path:polygon(7% 0,93% 0,83% 100%,17% 100%)}
.binlid{position:absolute;z-index:4;left:168px;top:488px;width:142px;height:9px;
  background:var(--ink-soft);border:2px solid var(--ink);transform-origin:left center}

.machine{position:absolute;z-index:5;left:352px;top:250px;width:186px;height:226px;
  background:var(--ink);border:2px solid var(--ink);box-shadow:7px 7px 0 var(--verm)}
.mouth{position:absolute;left:12px;right:12px;top:132px;height:62px;
  background:rgba(0,0,0,.5);border:1px solid rgba(236,228,208,.28)}
.scan{position:absolute;left:14px;right:14px;top:134px;height:3px;
  background:var(--verm);animation:scanmove 1.9s ease-in-out infinite}
@keyframes scanmove{0%,100%{transform:translateY(0)}50%{transform:translateY(54px)}}
.steps{position:absolute;left:13px;right:11px;top:16px;display:grid;gap:17px}
.step{position:relative;display:flex;align-items:center;gap:7px;font-family:var(--mono);font-size:9px;
  color:rgba(236,228,208,.55);font-weight:500;letter-spacing:.06em;transition:color .2s}
.step::after{content:"";position:absolute;left:3px;top:12px;width:2px;height:19px;
  background:rgba(236,228,208,.22);transition:background .25s}
.step:last-child::after{display:none}
.step.on::after{background:var(--marker)}
.num{font-size:8.5px;font-weight:500;color:rgba(236,228,208,.4);flex:none;transition:color .2s}
.step.on .num{color:var(--marker)}
.dot{width:8px;height:8px;background:transparent;flex:none;
  border:1.5px solid rgba(236,228,208,.4);transition:all .2s}
.step.on .dot{background:var(--marker);border-color:var(--marker)}
.step.on{color:var(--paper-hi)}
.mlabel{position:absolute;left:0;right:0;bottom:13px;text-align:center;
  font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;color:var(--marker);font-weight:500}

.layer{position:absolute;inset:0;pointer-events:none;z-index:3}
.card{position:absolute;left:0;top:0;width:150px;height:92px;
  background:var(--paper-hi);color:var(--ink);border:2px solid var(--ink);padding:8px 10px;
  will-change:transform,opacity;box-shadow:4px 4px 0 var(--ink)}
.card .src{font-family:var(--mono);font-size:8px;font-weight:500;letter-spacing:.1em;color:var(--ink-soft)}
.card .hl{font-size:12px;font-weight:600;line-height:1.2;margin-top:4px}
.card .ln{height:3px;background:rgba(20,17,14,.16);margin-top:5px}
.card.junk{background:var(--paper-deep);color:var(--ink-faint);box-shadow:none;border-color:var(--ink-faint)}
.card.junk .src{color:var(--ink-faint)}
.card.junk .hl{text-decoration:line-through;opacity:.8}
.card.junk .ln{background:rgba(20,17,14,.1)}
.tag{position:absolute;right:6px;bottom:6px;font-family:var(--mono);font-size:8.5px;font-weight:500;
  padding:3px 7px;letter-spacing:.12em;rotate:-5deg;border:2px solid var(--ink)}
.tag.skip{background:var(--paper-hi);color:var(--ink-faint);border-color:var(--ink-faint)}
.tag.keep{background:var(--verm);color:var(--paper-hi)}

.note{position:absolute;left:0;top:0;width:130px;height:82px;
  background:var(--paper-hi);border:2px solid var(--ink);box-shadow:3px 3px 0 var(--ink);
  overflow:hidden;will-change:transform,opacity}
.note .bar{height:17px;font-family:var(--mono);font-size:8px;font-weight:500;letter-spacing:.14em;
  padding:3px 8px;color:var(--paper-hi);border-bottom:2px solid var(--ink)}
.note.fresh .bar{background:var(--verm)}
.note.addendum .bar{background:var(--marker);color:var(--ink)}
.note.merge .bar{background:var(--pine)}
.note .body{padding:5px 8px}
.note .nt{font-size:11px;font-weight:600;color:var(--ink);line-height:1.2}
.note .gs{font-family:var(--mono);font-size:7.5px;font-weight:500;color:var(--ink-soft);margin-top:4px;letter-spacing:.08em}
.note .ln{height:3px;background:rgba(20,17,14,.14);margin-top:4px}

svg{position:absolute;inset:0;width:${L.W}px;height:${L.H}px;z-index:2}
.trunk{stroke:var(--ink);stroke-width:5;fill:none;stroke-linecap:square;stroke-linejoin:round}
.cv{fill:none;stroke:var(--ink);stroke-linecap:round}
.cv1{stroke-width:3.4;stroke-opacity:.6}
.cv2{stroke-width:2.2;stroke-opacity:.4}
.cv3{stroke-width:1.8;stroke-opacity:.34}
.cv4{stroke-width:1.4;stroke-opacity:.18;stroke-dasharray:3 4}
.pn{fill:var(--ink)}
.hn{fill:var(--paper-hi);stroke:var(--ink);stroke-width:2}
.stubn{fill:none;stroke:var(--ink-faint);stroke-width:1.2;stroke-dasharray:2 2}
.core{fill:var(--ink);stroke:var(--ink);stroke-width:2}
.core.fresh{fill:var(--verm)}.core.addendum{fill:var(--marker)}.core.merge{fill:var(--pine)}
.halo{fill:var(--ink);fill-opacity:.1}
.halo.fresh{fill:var(--verm);fill-opacity:.16}.halo.addendum{fill:var(--marker);fill-opacity:.28}
.halo.merge{fill:var(--pine);fill-opacity:.16}
.dot2{fill:var(--ink-soft);fill-opacity:.7}
.xl{fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round}
.paperlab{font-family:var(--display);font-size:17px;fill:var(--ink)}
.headlab{font-family:var(--body);font-style:italic;font-size:12.5px;fill:var(--ink-soft)}
.leaflab{font-family:var(--body);font-size:13.5px;font-weight:600;fill:var(--ink)}
.stublab{font-family:var(--body);font-style:italic;font-size:12px;fill:var(--ink-faint)}
.trunklab{font-family:var(--mono);font-size:11px;letter-spacing:.18em;fill:var(--ink-soft)}
.legend{font-family:var(--mono);font-size:10px;letter-spacing:.08em;fill:var(--ink-soft)}

${L.stack ? `
/* ---------- stacked (phone) layout: bigger type, press on top, tree beneath ---------- */
.head{top:30px}
.title{font-size:48px}
.rule{top:94px}
.stats{top:116px;left:36px;width:508px;grid-template-columns:repeat(4,1fr);gap:7px}
.stat{min-width:0;padding:6px 8px}
.stat b{font-size:26px}
.stat span{font-size:10px;letter-spacing:.08em}
.belt{width:420px}
.bin{left:104px}.binlid{left:96px}.bintext{left:78px}
.bintext{font-size:12.5px}
.machine{left:340px;width:226px;box-shadow:6px 6px 0 var(--verm)}
.steps{gap:14px;left:15px}
.step{font-size:11.5px;gap:8px}
.step::after{top:13px;height:16px}
.num{font-size:10.5px}
.mlabel{font-size:11.5px}
.card{width:190px;height:118px;padding:9px 11px}
.card .src{font-size:10px}
.card .hl{font-size:15px;margin-top:5px}
.card .ln{height:4px}
.tag{font-size:10.5px;padding:3px 8px}
.note{width:168px;height:100px}
.note .bar{height:21px;font-size:10px}
.note .nt{font-size:14px}
.note .gs{font-size:9.5px}
.paperlab{font-size:20px}
.headlab{font-size:14.5px}
.leaflab{font-size:16px}
.stublab{font-size:14px}
.trunklab{font-size:13px}
.legend{font-size:12px}
` : ''}

@media (prefers-reduced-motion:reduce){
  .belt::after,.roller,.scan{animation:none}
  .morph .a,.mark .mx{animation:none;opacity:0}
  .morph .b,.mark .mk{animation:none;opacity:1}
  .rule{animation:none;width:272px}
}`;

const html = (L) => `
<div class="frame" part="frame"><div class="scaler"><div class="stage${L.stack ? ' stack' : ''}">
  <div class="grid"></div>
  <div class="head">
    <div class="title" role="heading" aria-level="2" aria-label="Collection becomes connection">
      <span><span class="word">Co</span><span class="morph" aria-hidden="true"
        ><i class="a">ll</i><i class="b">nn</i></span><span class="word">ection</span></span>
      <span class="mark" aria-hidden="true"><i class="mx">&#10005;</i><i class="mk">&#10003;</i></span>
    </div>
  </div>
  <div class="rule"></div>
  <div class="stats">
    <div class="stat"><b data-c="in">0</b><span>READ</span></div>
    <div class="stat s"><b data-c="skip">0</b><span>DROPPED</span></div>
    <div class="stat k"><b data-c="keep">0</b><span>FILED</span></div>
    <div class="stat x"><b data-c="link">0</b><span>LINKS</span></div>
  </div>
  <svg viewBox="0 0 ${L.W} ${L.H}" aria-hidden="true"></svg>
  <div class="belt"></div>
  <div class="roller" style="left:-44px"></div><div class="roller" style="left:104px"></div>
  <div class="roller" style="left:252px"></div><div class="roller" style="left:346px"></div>
  <div class="legs" style="left:36px"></div><div class="legs" style="left:336px"></div>
  <div class="binlid"></div><div class="bin"></div>
  <div class="bintext">DROPPED</div>
  <div class="machine">
    <div class="steps">
      <div class="step"><i class="dot"></i><span class="num">01</span>CLASSIFY</div>
      <div class="step"><i class="dot"></i><span class="num">02</span>WRITE NOTE</div>
      <div class="step"><i class="dot"></i><span class="num">03</span>FRESH / ADD / MERGE</div>
      <div class="step"><i class="dot"></i><span class="num">04</span>CROSS-LINK</div>
    </div>
    <div class="mouth"></div><div class="scan"></div>
    <div class="mlabel">HUMAN-CHECKED</div>
  </div>
  <div class="layer"></div>
</div></div></div>`;

const NS = 'http://www.w3.org/2000/svg';
const el = (n, a) => { const e = document.createElementNS(NS, n);
  for (const k in a) e.setAttribute(k, a[k]); return e; };

/* ---------------- element ---------------- */

class GranvayaPipeline extends HTMLElement {
  static get observedAttributes(){ return ['chrome','links','speed','paused']; }

  constructor(){
    super();
    this.attachShadow({ mode:'open' });
    this._timers = new Set();
    this._anims  = new Set();
    this._built  = false;
  }

  connectedCallback(){
    if(!this._built){ this._build(); this._built = true; }
    this._observe();
    this._maybeRun();
  }

  disconnectedCallback(){ this._teardown(); }

  attributeChangedCallback(name){
    if(!this._built) return;
    if(name === 'speed'){ this._speed(); this._restart(); }
    if(name === 'paused') this._maybeRun();
    if(name === 'links')  this._linkMode = this.getAttribute('links') || 'fade';
  }

  /* ---- public API ---- */
  play(){ this.removeAttribute('paused'); }
  pause(){ this.setAttribute('paused',''); }

  /* ---- lifecycle helpers ---- */
  _later(fn, ms){ const t = setTimeout(()=>{ this._timers.delete(t); fn(); }, ms);
                  this._timers.add(t); return t; }
  _anim(node, frames, opts){ const a = node.animate(frames, opts);
                             this._anims.add(a); a.finished?.catch(()=>{})
                               .finally?.(()=>this._anims.delete(a)); return a; }

  _stopWork(){
    this._timers.forEach(clearTimeout); this._timers.clear();
    this._anims.forEach(a=>{ try{ a.cancel(); }catch(e){} }); this._anims.clear();
    clearInterval(this._loop); this._loop = null;
  }

  _teardown(){
    this._stopWork();
    this._ro?.disconnect(); this._io?.disconnect();
    document.removeEventListener('visibilitychange', this._vis);
    this._ro = this._io = null;
  }

  _pickMode(){
    const w = this.clientWidth;
    return w && w < BREAK ? 'stack' : 'wide';
  }

  // container crossed the breakpoint: start over in the other layout
  _rebuild(){
    this._stopWork();
    this._build();
    this._maybeRun();
  }

  _observe(){
    this._ro = new ResizeObserver(entries=>{
      // read-only: we set a transform, never a size — so this cannot re-trigger itself
      const w = entries[0].contentRect.width;
      if(!w) return;
      if((w < BREAK ? 'stack' : 'wide') !== this._mode){ this._rebuild(); return; }
      this._scaler.style.transform = 'scale(' + (w / this._L.W) + ')';
    });
    this._ro.observe(this);

    this._io = new IntersectionObserver(e=>{ this._onScreen = e[0].isIntersecting;
                                             this._maybeRun(); }, { threshold:0 });
    this._io.observe(this);

    this._vis = ()=> this._maybeRun();
    document.addEventListener('visibilitychange', this._vis);
  }

  _maybeRun(){
    const run = this._onScreen !== false
             && !this.hasAttribute('paused')
             && !document.hidden;
    if(run && !this._loop){
      this._tick();
      this._loop = setInterval(()=>this._tick(), this.T.cycle);
    } else if(!run && this._loop){
      clearInterval(this._loop); this._loop = null;
    }
  }

  _restart(){ if(this._loop){ clearInterval(this._loop); this._loop = null; } this._maybeRun(); }

  _speed(){
    const s = Math.max(.25, Math.min(3, parseFloat(this.getAttribute('speed')) || 1));
    this.T = { ride:4800/s, gate:700/s, pull:600/s, fly:1400/s, link:320/s, cycle:4800/s };
  }

  /* ---- build ---- */
  _build(){
    this._mode = this._pickMode();
    const L = this._L = LAYOUTS[this._mode];
    this.shadowRoot.innerHTML = `<style>${css(L)}</style>` + html(L);

    const $ = s => this.shadowRoot.querySelector(s);
    this._scaler = $('.scaler');
    this._layer  = $('.layer');
    this._svg    = $('svg');
    this._binlid = $('.binlid');
    this._steps  = [...this.shadowRoot.querySelectorAll('.step')];
    this._out    = {}; ['in','skip','keep','link'].forEach(k =>
      this._out[k] = this.shadowRoot.querySelector(`[data-c="${k}"]`));
    this._C = { in:0, skip:0, keep:0, link:0 };
    this._k = 0;
    this._linkMode = this.getAttribute('links') || 'fade';
    this._reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._speed();
    this._buildTree();
    this._scaler.style.transform = 'scale(' + (this.clientWidth / L.W || 1) + ')';
  }

  _buildTree(){
    const L = this._L, { X1, X2, X3, TOP, BOT, BASE } = L;
    const svg = this._svg;
    const tree = structuredClone(TREE); // the animation mutates its nodes, so work on a copy
    this._linkG = el('g',{}); const treeG = el('g',{}), nodeG = el('g',{});
    svg.append(this._linkG, treeG, nodeG);

    // rows: every thread and every collapsed stub gets one row
    const rows = [];
    tree.forEach(p => p.heads.forEach(h => {
      h.leaves.forEach(l => rows.push({ kind:'leaf', ref:l, head:h }));
      if(h.more) rows.push({ kind:'stub', ref:{ more:h.more }, head:h });
    }));
    const gap = (BOT - TOP) / (rows.length - 1);
    rows.forEach((r,i)=>{ r.y = TOP + i*gap; r.ref.y = r.y; });

    tree.forEach(p=>{
      p.heads.forEach(h=>{
        const ys = rows.filter(r=>r.head===h).map(r=>r.y);
        h.y = (Math.min(...ys) + Math.max(...ys)) / 2;
      });
      const hy = p.heads.map(h=>h.y);
      p.y = (Math.min(...hy) + Math.max(...hy)) / 2;
    });

    const curve = (x0,y0,x1,y1,cls)=> el('path',{
      d:`M ${x0} ${y0} C ${(x0+x1)/2} ${y0}, ${(x0+x1)/2} ${y1}, ${x1} ${y1}`, class:`cv ${cls}` });

    treeG.append(el('path',{ d:L.trunk, class:'trunk' }));
    if(L.trunkLab){
      const tl = el('text',{ x:L.trunkLab.x, y:L.trunkLab.y, class:'trunklab', 'text-anchor':'middle' });
      tl.textContent = 'GS 1–4'; treeG.append(tl);
    }

    this._byId = {};
    tree.forEach(p=>{
      treeG.append(curve(BASE.x, BASE.y, X1, p.y, 'cv1'));
      nodeG.append(el('rect',{ x:X1-6.5, y:p.y-6.5, width:13, height:13, class:'pn' }));
      const pt = el('text',{ x:X1, y:p.y-14, class:'paperlab', 'text-anchor':'middle' });
      pt.textContent = p.paper; nodeG.append(pt);

      p.heads.forEach(h=>{
        treeG.append(curve(X1, p.y, X2, h.y, 'cv2'));
        nodeG.append(el('rect',{ x:X2-4.5, y:h.y-4.5, width:9, height:9, class:'hn' }));
        const ht = el('text',{ x:X2, y:h.y-12, class:'headlab', 'text-anchor':'middle' });
        ht.textContent = h.name; nodeG.append(ht);

        rows.filter(r=>r.head===h).forEach(r=>{
          if(r.kind === 'stub'){
            treeG.append(curve(X2, h.y, X3, r.y, 'cv4'));
            nodeG.append(el('circle',{ cx:X3, cy:r.y, r:3.4, class:'stubn' }));
            const st = el('text',{ x:X3+13, y:r.y+4, class:'stublab' });
            st.textContent = '+ ' + r.ref.more + ' more threads'; nodeG.append(st);
            return;
          }
          const l = r.ref, live = l.preset !== false;
          const br   = curve(X2, h.y, X3, l.y, 'cv3');
          const halo = el('circle',{ cx:X3, cy:l.y, r:8, class:'halo' });
          const core = el('circle',{ cx:X3, cy:l.y, r:4.5, class:'core' });
          const lab  = el('text',{ x:X3+14, y:l.y+4.5, class:'leaflab' }); lab.textContent = l.label;
          const dots = el('g',{ transform:`translate(${X3+15},${l.y+14})` });
          treeG.append(br); nodeG.append(halo, core, lab, dots);
          if(!live) [br,halo,core,lab].forEach(e=>e.setAttribute('opacity',0));
          Object.assign(l, { br, halo, core, lab, dots, n:0, live, x:X3, base:l.adden||0 });
          for(let i=0;i<(l.adden||0);i++) this._addDot(l,false);
          this._byId[l.id] = l;
        });
      });
    });

    // legend: what the three note colours mean
    const lg = el('g',{ transform:`translate(${L.legend.x},${L.legend.y})` });
    [['fresh','Fresh'],['addendum','Addendum'],['merge','Merge']].forEach((p,i)=>{
      lg.append(el('circle',{ cx:i*L.legend.gap, cy:-4, r:5, class:`core ${p[0]}` }));
      const t = el('text',{ x:i*L.legend.gap+13, y:0, class:'legend' }); t.textContent = p[1].toUpperCase(); lg.append(t);
    });
    const kx = 3*L.legend.gap;
    lg.append(el('path',{ d:`M ${kx-4} -4 L ${kx+16} -4`, class:'xl', 'stroke-dasharray':'4 4' }));
    const kt = el('text',{ x:kx+23, y:0, class:'legend' }); kt.textContent = 'LINK'; lg.append(kt);
    svg.append(lg);
  }

  /* ---- animation ---- */
  _addDot(l, animate){
    const d = el('circle',{ cx:l.n*9, cy:0, r:2.8, class:'dot2' });
    l.dots.append(d); l.n++;
    if(animate && !this._reduced)
      this._anim(d, [{r:0,opacity:0},{r:5.5,opacity:1},{r:2.8,opacity:1}],
                 { duration:620, easing:'ease-out' });
  }

  _bump(k){ this._C[k]++; this._out[k].textContent = this._C[k]; }
  _lite(i){ for(let j=0;j<=i;j++) this._steps[j].classList.add('on'); }
  _clearSteps(){ this._steps.forEach(s=>s.classList.remove('on')); }

  _arc(x0,y0,x1,y1){
    // wide: swoop up over the press then down onto the tree.
    // stack: the tree is below the press, so swing out to the right and drop down.
    const st = this._L.stack;
    const cx = st ? Math.max(x0, x1) + 110 : (x0+x1)/2;
    const cy = st ? y0 + (y1-y0)*0.3 : Math.min(y0,y1)-150, f=[];
    for(let i=0;i<=26;i++){ const t=i/26, u=1-t;
      f.push({ transform:`translate(${u*u*x0+2*u*t*cx+t*t*x1}px,${u*u*y0+2*u*t*cy+t*t*y1}px) `+
               `scale(${1-.72*t}) rotate(${-12+26*t}deg)`, opacity: t>.9 ? 0 : 1 }); }
    return f;
  }

  _reveal(l){
    if(l.live) return; l.live = true;
    [l.br,l.halo,l.core,l.lab].forEach(e=>{ e.setAttribute('opacity',1);
      if(!this._reduced) this._anim(e,[{opacity:0},{opacity:1}],{duration:800,easing:'ease-out'}); });
  }

  _attach(l, kind){
    this._reveal(l);
    l.core.setAttribute('class', 'core ' + kind);
    l.halo.setAttribute('class', 'halo ' + kind);
    if(!this._reduced){
      this._anim(l.core,[{r:4.5},{r:13},{r:4.5}],{duration:700,easing:'ease-out'});
      this._anim(l.halo,[{r:8,fillOpacity:.14},{r:34,fillOpacity:.38},{r:8,fillOpacity:.14}],
                 {duration:1000,easing:'ease-out'});
    }
    if(kind !== 'fresh') this._addDot(l,true);
  }

  _crossLink(from, to, delay){
    this._later(()=>{
      const a = this._byId[from], b = this._byId[to];
      if(!a || !b || !b.live) return;
      const bulge = Math.max(60, Math.abs(a.y-b.y)*0.45);
      const p = el('path',{ d:`M ${a.x} ${a.y} Q ${a.x+bulge+70} ${(a.y+b.y)/2} ${b.x} ${b.y}`, class:'xl' });
      this._linkG.append(p);
      this._bump('link');

      const settle = ()=>{
        p.setAttribute('stroke-dasharray','4 5'); p.setAttribute('stroke-dashoffset',0);
        if(this._linkMode === 'keep'){ p.setAttribute('opacity',.3); return; }
        this._anim(p,[{opacity:1},{opacity:.28}],{duration:1300,fill:'forwards'});
        this._later(()=>{ this._anim(p,[{opacity:.28},{opacity:0}],{duration:1500,fill:'forwards'})
          .onfinish = ()=>p.remove(); }, 2800);
      };

      if(this._reduced){ settle(); return; }
      const len = p.getTotalLength();
      p.setAttribute('stroke-dasharray',len); p.setAttribute('stroke-dashoffset',len);
      this._anim(p,[{strokeDashoffset:len},{strokeDashoffset:0}],
        {duration:900, easing:'cubic-bezier(.3,.7,.3,1)', fill:'forwards'}).onfinish = settle;
    }, delay);
  }

  _mkCard(d, junk){
    const c = document.createElement('div');
    c.className = 'card' + (junk ? ' junk' : '');
    c.innerHTML = `<div class="src">${d.src}</div><div class="hl">${d.hl}</div>`+
                  `<div class="ln" style="width:84%"></div><div class="ln" style="width:58%"></div>`;
    c.style.transform = `translate(${this._L.START_X}px,${this._L.CARD_Y}px)`;
    this._layer.append(c); return c;
  }

  _mkNote(d){
    const n = document.createElement('div');
    n.className = 'note ' + d.kind;
    n.innerHTML = `<div class="bar">${d.kind.toUpperCase()}</div><div class="body">`+
                  `<div class="nt">${d.note}</div><div class="gs">${d.gs}</div>`+
                  `<div class="ln" style="width:88%"></div><div class="ln" style="width:62%"></div></div>`;
    this._layer.append(n); return n;
  }

  _toBin(card){
    const { GATE_X, CARD_Y } = this._L;
    this._anim(this._binlid,[{transform:'rotate(0)'},{transform:'rotate(-28deg)'},{transform:'rotate(0)'}],
      {duration:560,easing:'ease-out'});
    this._anim(card,[
      {transform:`translate(${GATE_X}px,${CARD_Y}px) rotate(0)`,opacity:1},
      {transform:`translate(${GATE_X+14}px,${CARD_Y+88}px) rotate(18deg)`,opacity:.95,offset:.45},
      {transform:`translate(${GATE_X+22}px,${CARD_Y+184}px) rotate(34deg) scale(.66)`,opacity:0}
    ],{duration:950,easing:'cubic-bezier(.4,.05,.6,1)',fill:'forwards'}).onfinish = ()=>card.remove();
    this._bump('skip');
  }

  _release(item){
    const T = this.T, { START_X, GATE_X, IN_X, CARD_Y, NOTE0 } = this._L;
    const junk = item.t === 'j', d = junk ? JUNK[item.i] : KEEP[item.i];
    const card = this._mkCard(d, junk);
    const tag = document.createElement('div');
    tag.className = 'tag ' + (junk ? 'skip' : 'keep');
    tag.textContent = junk ? 'SKIP' : 'MUST NOTE';

    this._anim(card,[{transform:`translate(${START_X}px,${CARD_Y}px)`},
                     {transform:`translate(${GATE_X}px,${CARD_Y}px)`}],
      {duration:T.ride, easing:'linear', fill:'forwards'}).onfinish = ()=>{
      // 01 CLASSIFY — verdict stamped at the gate
      this._bump('in'); this._clearSteps(); this._lite(0);
      card.append(tag);
      this._anim(tag,[{opacity:0,transform:'scale(1.6)'},{opacity:1,transform:'scale(1)'}],
                 {duration:240,easing:'ease-out'});

      this._later(()=>{
        if(junk){ this._toBin(card); this._later(()=>this._clearSteps(),1100); return; }

        // 02 WRITE NOTE — card drawn into the press
        this._lite(1);
        this._anim(card,[{transform:`translate(${GATE_X}px,${CARD_Y}px)`},
                         {transform:`translate(${IN_X}px,${CARD_Y}px)`}],
          {duration:T.pull, easing:'cubic-bezier(.5,0,.6,1)', fill:'forwards'}).onfinish = ()=>{
          card.remove();

          // 03 FRESH / ADD / MERGE — note departs for its place on the tree
          this._lite(2);
          const note = this._mkNote(d), l = this._byId[d.node], x0 = NOTE0.x, y0 = NOTE0.y;
          note.style.transform = `translate(${x0}px,${y0}px)`;
          this._anim(note, this._arc(x0,y0,l.x-14,l.y-12),
            {duration:T.fly, easing:'cubic-bezier(.2,.6,.25,1)', fill:'forwards'}).onfinish = ()=>{
              note.remove(); this._attach(l, d.kind); this._bump('keep');

              // 04 CROSS-LINK — only once the note is filed
              const links = d.links || [];
              if(!links.length){ this._later(()=>this._clearSteps(),700); return; }
              this._lite(3);
              links.forEach((t,i)=>this._crossLink(d.node, t, 200 + i*T.link));
              this._later(()=>this._clearSteps(), 200 + (links.length-1)*T.link + 1000);
            };
        };
      }, T.gate);
    };
  }

  _tick(){
    this._release(ORDER[this._k % ORDER.length]);
    this._k++;
    if(this._k % ORDER.length === 0) this._later(()=>{
      this._C = { in:0, skip:0, keep:0, link:0 };
      for(const k in this._out) this._out[k].textContent = '0';
      if(this._linkMode === 'keep'){ this._linkG.textContent = ''; }
    }, 8000);
  }
}

if(!customElements.get('granvaya-pipeline'))
  customElements.define('granvaya-pipeline', GranvayaPipeline);
