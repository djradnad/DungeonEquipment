"use strict";
(function () {
  const STORAGE_KEY = "upgrade-pathfinder-v1";
  const RANKS = [
    ...["D", "C", "B", "A", "S", "SS"].flatMap((tier) => [1,2,3,4].map((rank) => ({ name: `${tier}${rank}`, tier, rank }))),
    { name: "SSS", tier: "SSS", rank: 1 },
  ];
  const TIERS = ["D","C","B","A"];
  const F = { baseEquip:10.2, baseH1:1.01, baseH2:15.78125, baseH3:6.3125, equipGrowth:1.02, holdingGrowth:1.01 };
  const ri = (n) => RANKS.findIndex((r) => r.name === n);

  function state() {
    let s = {}; try { s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch {}
    return { equippedRank:s.equippedRank || document.querySelector("#equipped-rank")?.value || "SS2", levels:{...(s.levels||{})}, costs:{...(s.costs||{})}, formulas:{...F,...(s.formulas||{})}, options:{useRawHoldingTotals:false,...(s.options||{})} };
  }
  function rf(r) {
    if (r.tier === "SSS") return 625 * 2**3 * 2.5**4 * 12.5;
    if (TIERS.includes(r.tier)) return 5**TIERS.indexOf(r.tier) * 1.5**(r.rank-1);
    if (r.tier === "S") return 625 * 2**(r.rank-1);
    return 625 * 2**3 * 2.5**r.rank;
  }
  function stats(name, level, f) {
    const r = RANKS[ri(name)], factor = rf(r), hg = f.holdingGrowth**(level-1);
    return {
      equip:f.baseEquip*factor*f.equipGrowth**(level-1),
      h1:f.baseH1*factor*hg,
      h2:ri(name)>=ri("S1") ? f.baseH2*(factor/rf(RANKS[ri("S1")]))*hg : 0,
      h3:ri(name)>=ri("SS1") ? f.baseH3*(factor/rf(RANKS[ri("SS1")]))*hg : 0,
    };
  }
  function roundHD(v) { const a=Math.abs(v)*100,w=Math.floor(a),fr=a-w; return Math.sign(v)*(fr>0.5+1e-10?w+1:w)/100; }
  function gv(v) {
    const a=Math.abs(v); if(!a) return {n:0,t:"0"};
    let g=Math.max(0,Math.floor(Math.log10(a)/3)), d=10**(g*3), n=roundHD(v/d);
    if(Math.abs(n)>=1000){g++;d*=1000;n=roundHD(v/d);}
    let suf=""; if(g===1)suf="K"; else if(g===2)suf="M"; else if(g===3)suf="B"; else if(g===4)suf="T"; else if(g>=5){const i=g-5;suf=String.fromCharCode(97+i%26).repeat(Math.floor(i/26)+1);}
    return {n:n*d,t:`${n}${suf}`};
  }
  function totals(s, levels) {
    let h1=0,h2=0,h3=0;
    RANKS.slice(0,ri(s.equippedRank)+1).forEach(r=>{const x=stats(r.name,Number(levels[r.name]||1),s.formulas);if(s.options.useRawHoldingTotals){h1+=x.h1;h2+=x.h2;h3+=x.h3;}else{h1+=gv(x.h1).n;h2+=gv(x.h2).n;h3+=gv(x.h3).n;}});
    const eq=stats(s.equippedRank,Number(levels[s.equippedRank]||1),s.formulas).equip;
    return {eq,h1,h2,h3};
  }
  function dmg(s, levels) { const t=totals(s,levels); return (1+t.eq/100)*(1+t.h1/100)*(1+t.h2/100)*(1+t.h3/100); }
  function bestRows() {
    const s=state(), before=dmg(s,s.levels), rows=[];
    RANKS.slice(0,ri(s.equippedRank)+1).forEach(r=>{const from=Number(s.levels[r.name]||1),cost=Number(s.costs[from+1]||0);if(from>=500||!cost)return;const lv={...s.levels,[r.name]:from+1},gain=dmg(s,lv)-before;rows.push({rank:r.name,from,to:from+1,gain,cost,eff:gain/cost});});
    return rows.sort((a,b)=>b.eff-a.eff);
  }
  function renderBest() {
    const box=document.querySelector("#best-upgrade"), body=document.querySelector("#ranking-body"); if(!box||!body)return;
    const rows=bestRows();
    if(!rows.length){box.className="best-upgrade empty";box.textContent="No known-cost upgrades are available from the current build.";body.innerHTML='<tr><td colspan="5" class="muted-cell">No upgrades with a known cost.</td></tr>';return;}
    const b=rows[0]; box.className="best-upgrade"; box.innerHTML=`<div class="upgrade-title">${b.rank} ${b.from} → ${b.to}</div><p>${gv(b.gain*100).t} damage multiplier gain · ${gv(b.cost).t} · ${gv(b.eff*1e6).t} gain per 1M cost</p>`;
    body.innerHTML=rows.map(r=>`<tr><td><strong>${r.rank}</strong></td><td>${r.from} → ${r.to}</td><td>${gv(r.gain*100).t}</td><td>${gv(r.cost).t}</td><td>${gv(r.eff*1e6).t}</td></tr>`).join("");
  }
  function combineNoPrep() {
    const out=document.querySelector("#planner-output"); if(!out)return;
    const rows=[...out.querySelectorAll(".route-row")]; if(!rows.length)return;
    const merged=[];
    for(const row of rows){
      const text=row.textContent.replace(/\s+/g," ").trim();
      const m=text.match(/^(?:Before )?([A-Za-z0-9]+)\s+(\d+)\s*→\s*(\d+)\s+—?\s*(.*)$/);
      if(!m){merged.push(row.cloneNode(true));continue;}
      const rank=m[1],from=Number(m[2]),to=Number(m[3]),tail=m[4];
      const noPrep=/no preparatory lower upgrades/i.test(tail);
      const last=merged[merged.length-1];
      if(noPrep && last?.dataset?.noPrep === "1" && last.dataset.rank===rank && Number(last.dataset.to)===from){
        last.dataset.to=String(to); last.querySelector(".route-main").textContent=`${rank} ${last.dataset.from} → ${to}`; continue;
      }
      const div=document.createElement("div");div.className="route-row";div.dataset.rank=rank;div.dataset.from=String(from);div.dataset.to=String(to);div.dataset.noPrep=noPrep?"1":"0";
      if(noPrep)div.innerHTML=`<strong class="route-main">${rank} ${from} → ${to}</strong> <span>no preparatory lower upgrades <b>(0 prep upgrades, 0)</b></span>`;
      else div.innerHTML=`<span>${text}</span>`;
      merged.push(div);
    }
    const list=document.createElement("div");list.className="route-list";merged.forEach(x=>list.appendChild(x));
    const old=out.querySelector(".route-list"); if(old)old.replaceWith(list); else out.appendChild(list);
  }
  function hideRaw() {
    const raw=document.querySelector("#show-raw-stats"); if(raw){raw.checked=false;raw.closest("label")?.setAttribute("hidden","");}
    const t=document.querySelector("#use-raw-holding-totals"); if(t)t.closest("label")?.classList.add("micro-toggle");
  }
  function install(){
    hideRaw();renderBest();
    document.querySelector("#refresh-results")?.addEventListener("click",()=>setTimeout(renderBest,30));
    document.querySelector("#equipped-level")?.addEventListener("change",()=>setTimeout(renderBest,30));
    document.querySelector("#equipped-rank")?.addEventListener("change",()=>setTimeout(renderBest,30));
    document.querySelector("#use-raw-holding-totals")?.addEventListener("change",()=>setTimeout(renderBest,30));
    document.querySelector("#items-body")?.addEventListener("change",()=>setTimeout(renderBest,50));
    document.querySelector("#build-equipped-route")?.addEventListener("click",()=>setTimeout(combineNoPrep,40));
    document.querySelector("#plan-holding-route")?.addEventListener("click",()=>setTimeout(combineNoPrep,40));
    new MutationObserver(hideRaw).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install);else install();
})();
