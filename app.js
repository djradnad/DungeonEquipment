"use strict";

/* ============================================================
   DUNGEON ODYSSEY - UPGRADE PATHFINDER

   MAIN CHART - pick your highest owned item and scroll. Each row
   answers "when this item is at level N, what level should every
   other item be at?" Every row is solved INDEPENDENTLY from
   level 1, so recommended levels can go DOWN as the main item
   climbs. That is correct and intended: items can be down-levelled.

   EFFICIENCY EXPLORER - a separate manual sandbox.
   ============================================================ */

/* Real observed upgrade costs, levels 2-500. */
const DEFAULT_COST_DATA = `
2,270
3,419
4,594
5,792
6,1010
7,1250
8,1510
9,1790
10,2090
11,2410
12,2750
13,3100
14,3470
15,3860
16,4270
17,4690
18,5130
19,5580
20,6060
21,6540
22,7050
23,7570
24,8100
25,8650
26,9220
27,9800
28,10390
29,11000
30,11630
31,12270
32,12920
33,13590
34,14270
35,14970
36,15680
37,16410
38,17150
39,17900
40,18670
41,19450
42,20250
43,21060
44,21880
45,22720
46,23560
47,24430
48,25300
49,26200
50,27100
51,28020
52,28940
53,29890
54,30840
55,31810
56,32790
57,33790
58,34800
59,35820
60,36850
61,37900
62,38960
63,40030
64,41110
65,42210
66,43320
67,44440
68,45570
69,46720
70,47880
71,49050
72,50230
73,51430
74,52640
75,53860
76,55090
77,56330
78,57590
79,58860
80,60140
81,61430
82,62740
83,64060
84,65380
85,66720
86,68080
87,69440
88,70820
89,72200
90,73600
91,75020
92,76440
93,77870
94,79320
95,80780
96,82250
97,83730
98,85220
99,86730
100,88240
101,89770
102,91310
103,92860
104,94420
105,96000
106,97580
107,99180
108,100780
109,102400
110,104030
111,105670
112,107320
113,108990
114,110660
115,112350
116,114050
117,115760
118,117470
119,119200
120,120950
121,122700
122,124460
123,126240
124,128020
125,129820
126,131630
127,133450
128,135280
129,137120
130,138970
131,140830
132,142700
133,144590
134,146480
135,148390
136,150310
137,152230
138,154170
139,156120
140,158080
141,160050
142,162030
143,164020
144,166030
145,168040
146,170060
147,172100
148,174140
149,176200
150,178270
151,337700
152,344500
153,351380
154,358360
155,365430
156,372590
157,379850
158,387200
159,394640
160,402180
161,409810
162,417540
163,425360
164,433290
165,441310
166,449430
167,457650
168,465960
169,474380
170,482900
171,491520
172,500240
173,509070
174,518000
175,527030
176,536160
177,545400
178,554750
179,564200
180,573760
181,583430
182,593210
183,603090
184,613080
185,623180
186,633400
187,643720
188,654160
189,664710
190,675370
191,686140
192,697030
193,708030
194,719150
195,730380
196,741730
197,753200
198,764780
199,776490
200,788310
201,800250
202,812310
203,824490
204,836800
205,849220
206,861770
207,874440
208,887230
209,900150
210,913190
211,926360
212,939660
213,953080
214,966620
215,980300
216,994100
217,1010000
218,1020000
219,1040000
220,1050000
221,1060000
222,1080000
223,1090000
224,1110000
225,1120000
226,1140000
227,1150000
228,1170000
229,1180000
230,1200000
231,1220000
232,1230000
233,1250000
234,1260000
235,1280000
236,1300000
237,1310000
238,1330000
239,1350000
240,1360000
241,1380000
242,1400000
243,1420000
244,1440000
245,1450000
246,1470000
247,1490000
248,1510000
249,1520000
250,1540000
251,1560000
252,1580000
253,1600000
254,1620000
255,1640000
256,1660000
257,1680000
258,1700000
259,1720000
260,1740000
261,1760000
262,1780000
263,1800000
264,1820000
265,1840000
266,1860000
267,1880000
268,1900000
269,1920000
270,1950000
271,1970000
272,1990000
273,2010000
274,2030000
275,2060000
276,2080000
277,2100000
278,2120000
279,2150000
280,2170000
281,2200000
282,2220000
283,2240000
284,2270000
285,2290000
286,2320000
287,2340000
288,2360000
289,2390000
290,2410000
291,2440000
292,2460000
293,2490000
294,2520000
295,2540000
296,2570000
297,2590000
298,2620000
299,2650000
300,2670000
301,2700000
302,2730000
303,2750000
304,2780000
305,2810000
306,2840000
307,2860000
308,2890000
309,2920000
310,2950000
311,2980000
312,3010000
313,3040000
314,3070000
315,3100000
316,3120000
317,3160000
318,3180000
319,3220000
320,3250000
321,3280000
322,3310000
323,3340000
324,3370000
325,3400000
326,3430000
327,3460000
328,3500000
329,3530000
330,3560000
331,3590000
332,3630000
333,3660000
334,3690000
335,3730000
336,3760000
337,3790000
338,3830000
339,3860000
340,3900000
341,3930000
342,3960000
343,4000000
344,4040000
345,4070000
346,4110000
347,4140000
348,4180000
349,4210000
350,4250000
351,4290000
352,4320000
353,4360000
354,4400000
355,4440000
356,4470000
357,4510000
358,4550000
359,4590000
360,4630000
361,4670000
362,4700000
363,4740000
364,4780000
365,4820000
366,4860000
367,4900000
368,4940000
369,4980000
370,5020000
371,5060000
372,5110000
373,5150000
374,5190000
375,5230000
376,5270000
377,5320000
378,5360000
379,5400000
380,5440000
381,5490000
382,5530000
383,5570000
384,5620000
385,5660000
386,5710000
387,5750000
388,5800000
389,5840000
390,5890000
391,5930000
392,5980000
393,6020000
394,6070000
395,6120000
396,6160000
397,6210000
398,6260000
399,6300000
400,6350000
401,6400000
402,6450000
403,6500000
404,6540000
405,6590000
406,6640000
407,6690000
408,6740000
409,6790000
410,6840000
411,6890000
412,6940000
413,6990000
414,7040000
415,7100000
416,7150000
417,7200000
418,7250000
419,7300000
420,7360000
421,7410000
422,7460000
423,7520000
424,7570000
425,7620000
426,7680000
427,7730000
428,7780000
429,7840000
430,7900000
431,7950000
432,8010000
433,8060000
434,8120000
435,8180000
436,8230000
437,8290000
438,8340000
439,8400000
440,8460000
441,8520000
442,8580000
443,8640000
444,8690000
445,8750000
446,8810000
447,8870000
448,8930000
449,8990000
450,9050000
451,9110000
452,9170000
453,9240000
454,9300000
455,9360000
456,9420000
457,9480000
458,9540000
459,9610000
460,9670000
461,9730000
462,9800000
463,9860000
464,9930000
465,9990000
466,10050000
467,10120000
468,10190000
469,10250000
470,10320000
471,10380000
472,10450000
473,10520000
474,10580000
475,10650000
476,10720000
477,10790000
478,10850000
479,10920000
480,10990000
481,11060000
482,11130000
483,11200000
484,11270000
485,11340000
486,11410000
487,11480000
488,11550000
489,11620000
490,11690000
491,11770000
492,11840000
493,11910000
494,11980000
495,12060000
496,12130000
497,12200000
498,12280000
499,12350000
500,12430000
`;

const STORAGE_KEY = "upgrade-pathfinder-v3";
const TIER_ORDER = ["D", "C", "B", "A", "S", "SS"];
const RANKS = [
  ...["D", "C", "B", "A", "S", "SS"].flatMap((tier) => [1, 2, 3, 4].map((rank) => ({ name: `${tier}${rank}`, tier, rank }))),
  { name: "SSS", tier: "SSS", rank: 1 },
];

const DEFAULT_FORMULAS = {
  baseEquip: 10.2,
  baseH1: 1.01,
  baseH2: 15.78125,
  baseH3: 6.3125,
  equipGrowth: 1.02,
  holdingGrowth: 1.01,
};

const KNOWN_COST_MAX = 500;      // last level with real observed cost data
const BASE_MAX_LEVEL = 500;      // standard cap for every item
const MAX_LEVEL_STEP = 100;      // each level-break unlock adds this much
const ABSOLUTE_MAX_LEVEL = 6500; // believed true ceiling
const BREAKABLE_RANK = "SSS";    // ONLY this rank can exceed level 500
const WINDOW_SIZE = 500;         // levels shown per page
const CHUNK_ROWS = 40;           // rows solved before yielding to the browser
const COMPUTE_BUDGET_MS = 30000;

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */

function rankIndex(rankName) { return RANKS.findIndex((rank) => rank.name === rankName); }
function ownedRanks() { return RANKS.slice(0, rankIndex(state.highestRank) + 1); }
function ownedNames() { return ownedRanks().map((rank) => rank.name); }
function ownsBreakable() { return rankIndex(state.highestRank) >= rankIndex(BREAKABLE_RANK); }

/* LEVEL BREAKING IS CURRENTLY DISABLED.
   In-game stats after a cap raise do not match the formulas below, so until
   that behaviour is understood every item is capped at 500. To re-enable,
   restore the commented body and put the SSS cap selector back in index.html. */
function capFor(rankName) {
  return BASE_MAX_LEVEL;
  // if (rankName !== BREAKABLE_RANK) return BASE_MAX_LEVEL;
  // return ownsBreakable() ? state.maxLevel : BASE_MAX_LEVEL;
}

function parseCostData(text) {
  const costs = {};
  text.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const match = trimmed.match(/^(\d+)\s*,\s*([0-9.]+)$/);
    if (!match) return;
    const level = Number(match[1]);
    const cost = Number(match[2]);
    if (Number.isInteger(level) && level >= 2 && Number.isFinite(cost) && cost > 0) costs[level] = cost;
  });
  return costs;
}

function loadState() {
  const initial = {
    highestRank: "SS2",
    maxLevel: BASE_MAX_LEVEL,
    costs: parseCostData(DEFAULT_COST_DATA),
    formulas: { ...DEFAULT_FORMULAS },
    explorerLevels: {},
    options: { showRawStats: false, useRawHoldingTotals: false, useStagedRounding: false },
    chartOptions: { useRawHoldingTotals: false, useStagedRounding: false },
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return initial;
    return {
      ...initial, ...saved,
      costs: { ...initial.costs, ...(saved.costs || {}) },
      formulas: { ...initial.formulas, ...(saved.formulas || {}) },
      explorerLevels: { ...initial.explorerLevels, ...(saved.explorerLevels || {}) },
      options: { ...initial.options, ...(saved.options || {}) },
      chartOptions: { ...initial.chartOptions, ...(saved.chartOptions || {}) },
    };
  } catch { return initial; }
}

let state = loadState();
function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* non-fatal */ } }
function clamp(value, minimum, maximum) { return Math.min(maximum, Math.max(minimum, value)); }

/* ------------------------------------------------------------
   DOM
   ------------------------------------------------------------ */

const ui = {
  highestRank: document.querySelector("#highest-rank"),
  itemCount: document.querySelector("#item-count"),

  itemBar: document.querySelector("#item-bar"),
  chartItemLabel: document.querySelector("#chart-item-label"),
  chartRawTotals: document.querySelector("#chart-raw-totals"),
  chartStagedRounding: document.querySelector("#chart-staged-rounding"),
  chartPrevItem: document.querySelector("#chart-prev-item"),
  chartNextItem: document.querySelector("#chart-next-item"),
  chartPhaseInfo: document.querySelector("#chart-phase-info"),
  windowPrev: document.querySelector("#window-prev"),
  windowNext: document.querySelector("#window-next"),
  windowLabel: document.querySelector("#window-label"),
  chartHead: document.querySelector("#chart-head"),
  chartBody: document.querySelector("#chart-body"),
  chartStatus: document.querySelector("#chart-status"),

  explorerBody: document.querySelector("#explorer-body"),
  explorerDamage: document.querySelector("#explorer-damage"),
  explorerBreakdown: document.querySelector("#explorer-breakdown"),
  bestUpgrade: document.querySelector("#best-upgrade"),
  rankingBody: document.querySelector("#ranking-body"),
  showRawStats: document.querySelector("#show-raw-stats"),
  useRawHoldingTotals: document.querySelector("#use-raw-holding-totals"),
  useStagedRounding: document.querySelector("#use-staged-rounding"),
  resetLevels: document.querySelector("#reset-levels"),
  applyBest: document.querySelector("#apply-best"),
  matchChart: document.querySelector("#match-chart"),
};

/* ------------------------------------------------------------
   GAME MATHS
   ------------------------------------------------------------ */

function rankFactor(rank) {
  if (rank.tier === "SSS") return 625 * 2 ** 3 * 2.5 * 2.5 ** 3 * 12.5;
  if (["D", "C", "B", "A"].includes(rank.tier)) return 5 ** TIER_ORDER.indexOf(rank.tier) * 1.5 ** (rank.rank - 1);
  if (rank.tier === "S") return 625 * 2 ** (rank.rank - 1);
  return 625 * 2 ** 3 * 2.5 ** rank.rank;
}
function isAtLeast(rankName, cutoffName) { return rankIndex(rankName) >= rankIndex(cutoffName); }

function itemStats(rankName, level) {
  const rank = RANKS[rankIndex(rankName)];
  const multiplier = rankFactor(rank);
  const holdingLevel = state.formulas.holdingGrowth ** (level - 1);
  return {
    equip: state.formulas.baseEquip * multiplier * state.formulas.equipGrowth ** (level - 1),
    h1: state.formulas.baseH1 * multiplier * holdingLevel,
    h2: isAtLeast(rankName, "S1") ? state.formulas.baseH2 * (multiplier / rankFactor(RANKS[rankIndex("S1")])) * holdingLevel : 0,
    h3: isAtLeast(rankName, "SS1") ? state.formulas.baseH3 * (multiplier / rankFactor(RANKS[rankIndex("SS1")])) * holdingLevel : 0,
  };
}

function roundHalfDown(value, decimals = 2) {
  const factor = 10 ** decimals;
  const absolute = Math.abs(value) * factor;
  const whole = Math.floor(absolute);
  const fraction = absolute - whole;
  const rounded = fraction > 0.5 + 1e-10 ? whole + 1 : whole;
  return Math.sign(value) * rounded / factor;
}
function stagedRoundHalfDown(value, decimals = 2) {
  return Math.sign(value) * roundHalfDown(roundHalfDown(roundHalfDown(Math.abs(value), 4), 3), decimals);
}
/* Game-style suffixes: K, M, B, T, then lowercase letters.
   0 -> a, 25 -> z, 26 -> aa, 27 -> ab, ... (bijective base-26). */
function letterSuffix(index) {
  if (index < 0) return "";
  let n = index + 1;
  let out = "";
  while (n > 0) {
    n -= 1;
    out = String.fromCharCode(97 + (n % 26)) + out;
    n = Math.floor(n / 26);
  }
  return out;
}

/* unitIndex 1 = K (1e3), 2 = M, 3 = B, 4 = T, 5 = a (1e15), 6 = b, ... */
function unitSuffix(unitIndex) {
  const fixed = ["", "K", "M", "B", "T"];
  return unitIndex <= 4 ? fixed[unitIndex] : letterSuffix(unitIndex - 5);
}

/* Picks the display unit for a magnitude, guarding against log10 edge cases. */
function unitFor(absolute) {
  if (!(absolute >= 1000)) return { divisor: 1, suffix: "", unitIndex: 0 };
  let unitIndex = Math.max(1, Math.floor(Math.log10(absolute) / 3));
  let divisor = 10 ** (unitIndex * 3);
  if (absolute / divisor >= 1000) { unitIndex += 1; divisor = 10 ** (unitIndex * 3); }
  return { divisor, suffix: unitSuffix(unitIndex), unitIndex };
}
function gameStatValue(value, useStaged) {
  const absolute = Math.abs(value);
  if (absolute === 0) return { display: 0, numeric: 0, suffix: "" };
  let { divisor, suffix, unitIndex } = unitFor(absolute);
  const roundingFn = useStaged ? stagedRoundHalfDown : roundHalfDown;
  let display = roundingFn(value / divisor);
  // Rounding can push the mantissa to exactly 1000 (e.g. 999.996 -> 1000.00);
  // that belongs in the NEXT unit up, displayed as 1.00.
  if (Math.abs(display) >= 1000) {
    unitIndex += 1;
    divisor = 10 ** (unitIndex * 3);
    suffix = unitSuffix(unitIndex);
    display = roundingFn(value / divisor);
  }
  return { display, numeric: display * divisor, suffix };
}

/* Upgrade cost to REACH `level`.
   Levels 2-500 use the real observed table. Above 500 the confirmed
   community formula is used: cost = 0.1*L^3 + L + 49.4, where L is the
   level you are upgrading FROM. It reproduces the real table from 151
   to 500 to within half a percent. */
function nextCost(level) {
  if (level < 2) return null;
  if (level <= KNOWN_COST_MAX) {
    const cost = Number(state.costs[level]);
    return Number.isFinite(cost) && cost > 0 ? cost : null;
  }
  const from = level - 1;
  const cost = 0.1 * from ** 3 + from + 49.4;
  return Number.isFinite(cost) && cost > 0 ? cost : null;
}
function isEstimatedLevel(level) { return level > KNOWN_COST_MAX; }

/* ------------------------------------------------------------
   SOLVER
   Chart maths always uses true in-game rounding so the chart never
   shifts because of a display toggle in the explorer.
   ------------------------------------------------------------ */

const contributionCache = new Map();
function contribution(rankName, level) {
  const key = rankName + "|" + level;
  const hit = contributionCache.get(key);
  if (hit) return hit;
  const stats = itemStats(rankName, level);
  // "raw totals" skips the game's 2-decimal rounding entirely, which removes
  // the quantisation bumps caused by a stat's increment straddling a rounding
  // step. The level-151 cost jump is a real game mechanic and is unaffected.
  const raw = state.chartOptions.useRawHoldingTotals;
  const staged = state.chartOptions.useStagedRounding;
  const round = (v) => (raw ? v : gameStatValue(v, staged).numeric);
  const value = {
    equip: stats.equip,
    h1: round(stats.h1),
    h2: round(stats.h2),
    h3: round(stats.h3),
  };
  contributionCache.set(key, value);
  return value;
}

/* Solves the optimal level of every item BELOW `targetRank`, for the moment
   the target sits at `targetLevel`. Items above the target are pinned at
   their own caps. Always starts from level 1, so the answer is the true
   optimum for this level rather than an accumulation of earlier decisions -
   which is what lets recommended levels legitimately go down. */
function solveAt(targetRank, targetLevel, names) {
  const targetPosition = names.indexOf(targetRank);
  const higher = names.slice(targetPosition + 1);
  const lower = names.slice(0, targetPosition);
  const equipRank = names[names.length - 1];

  const levels = {};
  higher.forEach((name) => { levels[name] = capFor(name); });
  levels[targetRank] = targetLevel;
  lower.forEach((name) => { levels[name] = 1; });

  let h1 = 0, h2 = 0, h3 = 0;
  for (let i = 0; i < names.length; i += 1) {
    const c = contribution(names[i], levels[names[i]]);
    h1 += c.h1; h2 += c.h2; h3 += c.h3;
  }

  for (let guard = 0; guard < 100000; guard += 1) {
    const equipLevel = levels[equipRank];
    const equipBase = contribution(equipRank, equipLevel).equip;
    const base = (1 + equipBase / 100) * (1 + h1 / 100) * (1 + h2 / 100) * (1 + h3 / 100);

    const evaluate = (name) => {
      const from = levels[name];
      const to = from + 1;
      if (to > capFor(name)) return null;
      const cost = nextCost(to);
      if (!cost) return null;
      const a = contribution(name, from);
      const b = contribution(name, to);
      const equipNew = name === equipRank ? contribution(name, to).equip : equipBase;
      const after = (1 + equipNew / 100) * (1 + (h1 - a.h1 + b.h1) / 100) * (1 + (h2 - a.h2 + b.h2) / 100) * (1 + (h3 - a.h3 + b.h3) / 100);
      const percentGain = (after / base - 1) * 100;
      return { percentGain, cost, efficiency: percentGain / cost };
    };

    const targetAction = evaluate(targetRank);
    if (!targetAction) break;

    let best = null, bestName = null;
    for (let i = 0; i < lower.length; i += 1) {
      const name = lower[i];
      const action = evaluate(name);
      if (!action) continue;
      if (!best || action.efficiency > best.efficiency || (action.efficiency === best.efficiency && rankIndex(name) > rankIndex(bestName))) {
        best = action; bestName = name;
      }
    }
    if (!best || best.efficiency <= targetAction.efficiency * (1 + 1e-12)) break;

    const before = contribution(bestName, levels[bestName]);
    levels[bestName] += 1;
    const after = contribution(bestName, levels[bestName]);
    h1 += after.h1 - before.h1; h2 += after.h2 - before.h2; h3 += after.h3 - before.h3;
  }
  return levels;
}

/* ------------------------------------------------------------
   CHART
   ------------------------------------------------------------ */

let chart = null;
let activeRun = null;

function chartSignature() { return JSON.stringify({ rank: state.highestRank, max: state.maxLevel, formulas: state.formulas, chartOptions: state.chartOptions }); }

function buildChart() {
  const names = ownedNames();
  const order = names.slice().reverse();
  contributionCache.clear();

  // Each phase targets one item, working from the highest downwards. A phase
  // starts wherever the previous phase left that item standing.
  const phases = order.map((name) => ({ rank: name, startLevel: null, windows: new Map(), complete: false }));
  phases[0].startLevel = 1;
  for (let i = 1; i < phases.length; i += 1) {
    const previous = phases[i - 1];
    const previousCap = capFor(previous.rank);
    const settled = solveAt(previous.rank, Math.max(1, previousCap - 1), names);
    phases[i].startLevel = settled[phases[i].rank] || 1;
  }

  chart = { signature: chartSignature(), names, order, phases, activePhase: 0, activeWindow: 0 };
}
function ensureChart() { if (!chart || chart.signature !== chartSignature()) buildChart(); }

function windowBounds(phase) {
  const cap = capFor(phase.rank);
  const start = phase.startLevel + chart.activeWindow * WINDOW_SIZE;
  return { start, end: Math.min(cap, start + WINDOW_SIZE - 1), cap };
}
function windowCount(phase) {
  const cap = capFor(phase.rank);
  return Math.max(1, Math.ceil((cap - phase.startLevel + 1) / WINDOW_SIZE));
}

function yieldToBrowser() { return new Promise((resolve) => setTimeout(resolve, 0)); }

async function computeWindow(phase, windowIndex, run) {
  const key = windowIndex;
  if (phase.windows.has(key)) return phase.windows.get(key);
  const { start, end, cap } = windowBounds(phase);
  const deadline = Date.now() + COMPUTE_BUDGET_MS;
  const rows = [];
  let sinceYield = 0;

  for (let level = start; level <= end; level += 1) {
    if (run.cancelled || Date.now() > deadline) return null;
    // At the cap the item has no next upgrade to save for, so the correct
    // holding levels are the ones in place when that last upgrade was bought.
    const solveLevel = level >= cap ? Math.max(1, cap - 1) : level;
    rows.push({ level, levels: solveAt(phase.rank, solveLevel, chart.names) });
    sinceYield += 1;
    // Yield periodically so a long solve can never lock up the tab.
    if (sinceYield >= CHUNK_ROWS) {
      sinceYield = 0;
      await yieldToBrowser();
    }
  }
  phase.windows.set(key, rows);
  return rows;
}

function setComputing(isComputing) {
  ui.itemBar.classList.toggle("is-busy", isComputing);
}

async function showWindow(phaseIndex, windowIndex) {
  ensureChart();
  chart.activePhase = clamp(phaseIndex, 0, chart.phases.length - 1);
  const phase = chart.phases[chart.activePhase];
  chart.activeWindow = clamp(windowIndex, 0, windowCount(phase) - 1);

  if (activeRun) activeRun.cancelled = true;
  const run = { cancelled: false };
  activeRun = run;

  const cached = phase.windows.has(chart.activeWindow);
  if (!cached) {
    setComputing(true);
    ui.chartStatus.textContent = "";
    await yieldToBrowser();
  }
  const rows = await computeWindow(phase, chart.activeWindow, run);
  setComputing(false);
  if (run.cancelled) return;
  if (rows === null) { ui.chartStatus.textContent = "Calculation stopped early."; return; }
  renderChart(rows);
}

function renderItemBar() {
  const phase = chart.phases[chart.activePhase];
  const cap = capFor(phase.rank);
  ui.chartItemLabel.innerHTML = `<strong>${phase.rank}</strong><span class="item-bar-range">levels ${phase.startLevel}\u2013${cap}</span>`;
  ui.chartPrevItem.disabled = chart.activePhase === 0;
  ui.chartNextItem.disabled = chart.activePhase >= chart.phases.length - 1;
}

function renderChart(rows) {
  const phase = chart.phases[chart.activePhase];
  const lower = chart.order.slice(chart.activePhase + 1);
  const maxed = chart.order.slice(0, chart.activePhase);
  const { start, end, cap } = windowBounds(phase);

  renderItemBar();
  ui.chartPhaseInfo.innerHTML = maxed.length
    ? `This page assumes you have already taken <strong>${maxed.join(", ")}</strong> to level ${BASE_MAX_LEVEL}.`
    : "This is your highest owned item, so nothing is assumed maxed yet.";

  ui.windowLabel.textContent = `Levels ${start}\u2013${end}  (page ${chart.activeWindow + 1} of ${windowCount(phase)})`;
  ui.windowPrev.disabled = chart.activeWindow === 0;
  ui.windowNext.disabled = chart.activeWindow >= windowCount(phase) - 1;
  ui.chartPrevItem.disabled = chart.activePhase === 0;
  ui.chartNextItem.disabled = chart.activePhase >= chart.phases.length - 1;

  if (!lower.length) {
    ui.chartHead.innerHTML = "";
    ui.chartBody.innerHTML = `<tr><td class="muted-cell">${phase.rank} is your lowest owned item, so there is nothing to prepare with. Level it straight to ${cap}.</td></tr>`;
    ui.chartStatus.textContent = "";
    return;
  }

  // Only show columns for items that actually move on this page. An item that
  // sits at level 1 for every visible row is just noise.
  const active = lower.filter((name) => rows.some((row) => row.levels[name] > 1));
  const hiddenCount = lower.length - active.length;

  if (!active.length) {
    ui.chartHead.innerHTML = "";
    ui.chartBody.innerHTML = `<tr><td class="muted-cell">Across levels ${start}\u2013${end}, every other owned item stays at level 1. Put everything into ${phase.rank}.</td></tr>`;
    ui.chartStatus.textContent = "";
    return;
  }

  ui.chartHead.innerHTML = `<tr><th class="sticky-col">${phase.rank}</th>${active.map((name) => `<th>${name}</th>`).join("")}</tr>`;
  ui.chartBody.innerHTML = rows.map((row) => {
    const estimated = isEstimatedLevel(row.level);
    return `<tr class="${estimated ? "estimated-row" : ""}"><td class="mono sticky-col">${row.level}${estimated ? '<span class="est-dot">~</span>' : ""}</td>${active.map((name) => `<td class="mono">${row.levels[name]}</td>`).join("")}</tr>`;
  }).join("");

  ui.chartStatus.textContent = hiddenCount > 0
    ? `${hiddenCount} lower item${hiddenCount === 1 ? "" : "s"} hidden: ${hiddenCount === 1 ? "it stays" : "they stay"} at level 1 across this whole page.`
    : "";
}

/* ------------------------------------------------------------
   FORMATTING
   ------------------------------------------------------------ */

/* Uses the same K/M/B/T + a,b,c... scale the game shows. */
function formatNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return "\u2014";
  const absolute = Math.abs(value);
  if (absolute === 0) return "0";
  const { divisor, suffix } = unitFor(absolute);
  if (divisor === 1) return value.toLocaleString(undefined, { maximumSignificantDigits: digits, maximumFractionDigits: 3 });
  return `${(value / divisor).toLocaleString(undefined, { maximumSignificantDigits: digits })}${suffix}`;
}
function formatCost(value) { return formatNumber(value, 4); }
function formatPercent(value) { return Number.isFinite(value) ? `${formatNumber(value, 4)}%` : "\u2014"; }
function formatStatPercent(value) {
  if (state.options.showRawStats) return `${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}%`;
  const game = gameStatValue(value, state.options.useStagedRounding);
  const display = game.display.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1");
  return `${display}${game.suffix}%`;
}

/* ------------------------------------------------------------
   EXPLORER
   ------------------------------------------------------------ */

function ensureExplorerLevels() {
  ownedRanks().forEach((rank) => {
    const current = Number(state.explorerLevels[rank.name]);
    state.explorerLevels[rank.name] = Number.isInteger(current) ? clamp(current, 1, capFor(rank.name)) : 1;
  });
}
function holdingValueForTotal(value) {
  if (state.options.useRawHoldingTotals) return value;
  return gameStatValue(value, state.options.useStagedRounding).numeric;
}
function explorerSummary(levels) {
  const detail = { h1: 0, h2: 0, h3: 0 };
  ownedRanks().forEach((rank) => {
    const stats = itemStats(rank.name, levels[rank.name]);
    detail.h1 += holdingValueForTotal(stats.h1);
    detail.h2 += holdingValueForTotal(stats.h2);
    detail.h3 += holdingValueForTotal(stats.h3);
  });
  const equipped = itemStats(state.highestRank, levels[state.highestRank]).equip;
  return {
    total: (1 + equipped / 100) * (1 + detail.h1 / 100) * (1 + detail.h2 / 100) * (1 + detail.h3 / 100),
    equipFactor: 1 + equipped / 100,
    h1Factor: 1 + detail.h1 / 100,
    h2Factor: 1 + detail.h2 / 100,
    h3Factor: 1 + detail.h3 / 100,
    equipped,
  };
}
function explorerAction(rankName, levels) {
  const toLevel = levels[rankName] + 1;
  if (toLevel > capFor(rankName)) return null;
  const cost = nextCost(toLevel);
  if (!cost) return null;
  const before = explorerSummary(levels).total;
  const after = explorerSummary({ ...levels, [rankName]: toLevel }).total;
  const percentGain = ((after - before) / before) * 100;
  return { rank: rankName, fromLevel: levels[rankName], toLevel, cost, percentGain, efficiency: percentGain / cost };
}
function explorerActions(levels) {
  return ownedRanks().map((rank) => explorerAction(rank.name, levels)).filter(Boolean)
    .sort((a, b) => b.efficiency - a.efficiency || rankIndex(b.rank) - rankIndex(a.rank));
}

function renderExplorer() {
  ensureExplorerLevels();
  const levels = state.explorerLevels;
  const summary = explorerSummary(levels);
  ui.explorerDamage.textContent = `\u00d7${formatNumber(summary.total, 5)}`;
  ui.explorerBreakdown.textContent = `H1 \u00d7${formatNumber(summary.h1Factor, 5)} \u00b7 H2 \u00d7${formatNumber(summary.h2Factor, 5)} \u00b7 H3 \u00d7${formatNumber(summary.h3Factor, 5)}`;

  const actions = Object.fromEntries(explorerActions(levels).map((action) => [action.rank, action]));
  ui.explorerBody.innerHTML = ownedRanks().slice().reverse().map((rank) => {
    const level = levels[rank.name];
    const stats = itemStats(rank.name, level);
    const action = actions[rank.name];
    const isHighest = rank.name === state.highestRank;
    const parts = [`H1 ${formatStatPercent(stats.h1)}`];
    if (stats.h2) parts.push(`H2 ${formatStatPercent(stats.h2)}`);
    if (stats.h3) parts.push(`H3 ${formatStatPercent(stats.h3)}`);
    // The highest item is the equipped one, so show its actual equip stat here.
    const nameCell = isHighest
      ? `<span class="item-name">${rank.name}<span class="equip-stat" title="Equip stat">+${formatStatPercent(stats.equip)}</span></span>`
      : `<span class="item-name">${rank.name}</span>`;
    return `<tr class="${isHighest ? "equipped-row" : ""}">
      <td>${nameCell}</td>
      <td><input class="level-input" data-rank="${rank.name}" type="number" min="1" max="${capFor(rank.name)}" value="${level}" aria-label="${rank.name} level" /></td>
      <td class="mono ${action ? "" : "muted-cell"}">${action ? formatCost(action.cost) + (isEstimatedLevel(action.toLevel) ? " ~" : "") : "at cap"}</td>
      <td class="mono">${parts.join(" \u00b7 ")}</td>
      <td class="mono ${action ? "" : "muted-cell"}">${action ? formatPercent(action.percentGain) : "\u2014"}</td>
    </tr>`;
  }).join("");

  const ranked = explorerActions(levels);
  const best = ranked[0];
  if (!best) {
    ui.bestUpgrade.className = "best-upgrade empty";
    ui.bestUpgrade.innerHTML = "Every owned item is at its level cap.";
    ui.rankingBody.innerHTML = "";
  } else {
    ui.bestUpgrade.className = "best-upgrade";
    ui.bestUpgrade.innerHTML = `<div class="upgrade-title">Level ${best.rank} from ${best.fromLevel} \u2192 ${best.toLevel}</div><p>Costs <strong>${formatCost(best.cost)}</strong>${isEstimatedLevel(best.toLevel) ? " <em>(formula estimate)</em>" : ""} and raises total damage by <strong>${formatPercent(best.percentGain)}</strong> \u2014 ${formatNumber(best.efficiency * 1e6, 5)}% per 1M.</p>`;
    ui.rankingBody.innerHTML = ranked.slice(0, 12).map((action) => `<tr><td><strong>${action.rank}</strong></td><td>${action.fromLevel} \u2192 ${action.toLevel}</td><td class="mono">${formatPercent(action.percentGain)}</td><td class="mono">${formatCost(action.cost)}</td><td class="mono">${formatNumber(action.efficiency * 1e6, 5)}%</td></tr>`).join("");
  }
  saveState();
}

/* ------------------------------------------------------------
   TOP CONTROLS
   ------------------------------------------------------------ */

function renderRankOptions() {
  ui.highestRank.innerHTML = RANKS.map((rank) => `<option value="${rank.name}">${rank.name}</option>`).join("");
  ui.highestRank.value = state.highestRank;
}
function renderOwnershipInfo() {
  const names = ownedNames();
  ui.itemCount.textContent = `${names.length} item${names.length === 1 ? "" : "s"} owned (${names[0]} through ${state.highestRank})`;
}

/* ------------------------------------------------------------
   EVENTS
   ------------------------------------------------------------ */

function refreshAll() {
  ensureExplorerLevels();
  renderOwnershipInfo();
  renderExplorer();
  buildChart();
  showWindow(0, 0);
}

function attachEvents() {
  ui.highestRank.addEventListener("change", () => {
    state.highestRank = ui.highestRank.value;
    state.explorerLevels = {};
    saveState();
    refreshAll();
  });

  ui.chartPrevItem.addEventListener("click", () => showWindow(chart.activePhase - 1, 0));
  ui.chartNextItem.addEventListener("click", () => showWindow(chart.activePhase + 1, 0));
  ui.chartRawTotals.addEventListener("change", () => {
    state.chartOptions.useRawHoldingTotals = ui.chartRawTotals.checked;
    saveState(); refreshAll();
  });
  ui.chartStagedRounding.addEventListener("change", () => {
    state.chartOptions.useStagedRounding = ui.chartStagedRounding.checked;
    saveState(); refreshAll();
  });
  ui.windowPrev.addEventListener("click", () => showWindow(chart.activePhase, chart.activeWindow - 1));
  ui.windowNext.addEventListener("click", () => showWindow(chart.activePhase, chart.activeWindow + 1));

  ui.explorerBody.addEventListener("change", (event) => {
    const input = event.target.closest("input[data-rank]");
    if (!input) return;
    state.explorerLevels[input.dataset.rank] = clamp(Math.round(Number(input.value) || 1), 1, capFor(input.dataset.rank));
    renderExplorer();
  });
  ui.showRawStats.addEventListener("change", () => { state.options.showRawStats = ui.showRawStats.checked; renderExplorer(); });
  ui.useRawHoldingTotals.addEventListener("change", () => { state.options.useRawHoldingTotals = ui.useRawHoldingTotals.checked; renderExplorer(); });
  ui.useStagedRounding.addEventListener("change", () => { state.options.useStagedRounding = ui.useStagedRounding.checked; renderExplorer(); });
  ui.resetLevels.addEventListener("click", () => { ownedRanks().forEach((rank) => { state.explorerLevels[rank.name] = 1; }); renderExplorer(); });
  ui.applyBest.addEventListener("click", () => {
    const best = explorerActions(state.explorerLevels)[0];
    if (!best) return;
    state.explorerLevels[best.rank] = best.toLevel;
    renderExplorer();
  });
  ui.matchChart.addEventListener("click", () => {
    if (!chart) return;
    const phase = chart.phases[chart.activePhase];
    const rows = phase.windows.get(chart.activeWindow);
    if (!rows || !rows.length) return;
    state.explorerLevels = { ...rows[0].levels };
    renderExplorer();
    ui.explorerBody.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */

function initialize() {
  if (rankIndex(state.highestRank) < 0) state.highestRank = "SS2";
  state.maxLevel = BASE_MAX_LEVEL; // level breaking disabled for now
  renderRankOptions();
  ui.chartRawTotals.checked = state.chartOptions.useRawHoldingTotals;
  ui.chartStagedRounding.checked = state.chartOptions.useStagedRounding;
  ui.showRawStats.checked = state.options.showRawStats;
  ui.useRawHoldingTotals.checked = state.options.useRawHoldingTotals;
  ui.useStagedRounding.checked = state.options.useStagedRounding;
  attachEvents();
  refreshAll();
}
initialize();
