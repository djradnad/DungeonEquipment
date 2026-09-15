"use strict";

/* ============================================================
   DUNGEON ODYSSEY - UPGRADE PATHFINDER
   ------------------------------------------------------------
   Two independent tools share one ownership setting:

   SECTION A "Optimal path" - the main chart. Pick your highest
   owned item, then scroll. It shows, for every level of that
   item, what level each lower item should be at. Computed
   lazily in 500-level windows so it never locks up the page.

   SECTION B "Efficiency explorer" - a manual sandbox. Set any
   levels you like and inspect the cost/gain maths directly.
   Deliberately NOT linked to section A.
   ============================================================ */

/* ------------------------------------------------------------
   COST DATA
   Real in-game costs are known for levels 2-500 only. Anything
   above 500 is ESTIMATED by geometric extrapolation - see
   nextCost(). The tail of the real table grows at a very steady
   ~1.0062x per level, which is where the default comes from.
   ------------------------------------------------------------ */
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

const STORAGE_KEY = "upgrade-pathfinder-v2";
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

const KNOWN_COST_MAX = 500;        // last level with real, observed cost data
const BASE_MAX_LEVEL = 500;        // cap before any max-level unlocks
const MAX_LEVEL_STEP = 100;        // each unlock raises the cap by this much
const ABSOLUTE_MAX_LEVEL = 6500;   // believed true ceiling
const DEFAULT_COST_GROWTH = 1.0062; // per-level growth used above level 500
const WINDOW_SIZE = 500;           // levels shown per page of the main chart
const CHUNK_SIZE = 20;             // target-levels computed before yielding to the browser
const COMPUTE_BUDGET_MS = 60000;   // absolute ceiling on one compute run

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */

function rankIndex(rankName) { return RANKS.findIndex((rank) => rank.name === rankName); }
function ownedRanks() { return RANKS.slice(0, rankIndex(state.highestRank) + 1); }

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
    costGrowth: DEFAULT_COST_GROWTH,
    costs: parseCostData(DEFAULT_COST_DATA),
    formulas: { ...DEFAULT_FORMULAS },
    explorerLevels: {},
    options: { showRawStats: false, useRawHoldingTotals: false, useStagedRounding: false },
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return initial;
    return {
      ...initial,
      ...saved,
      costs: { ...initial.costs, ...(saved.costs || {}) },
      formulas: { ...initial.formulas, ...(saved.formulas || {}) },
      explorerLevels: { ...initial.explorerLevels, ...(saved.explorerLevels || {}) },
      options: { ...initial.options, ...(saved.options || {}) },
    };
  } catch { return initial; }
}

let state = loadState();
function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage full or blocked - not fatal */ } }
function clamp(value, minimum, maximum) { return Math.min(maximum, Math.max(minimum, value)); }

/* ------------------------------------------------------------
   DOM
   ------------------------------------------------------------ */

const ui = {
  highestRank: document.querySelector("#highest-rank"),
  maxLevel: document.querySelector("#max-level"),
  costGrowth: document.querySelector("#cost-growth"),
  itemCount: document.querySelector("#item-count"),
  estimateNote: document.querySelector("#estimate-note"),

  chartTabs: document.querySelector("#chart-tabs"),
  chartPrevItem: document.querySelector("#chart-prev-item"),
  chartNextItem: document.querySelector("#chart-next-item"),
  chartPhaseInfo: document.querySelector("#chart-phase-info"),
  windowPrev: document.querySelector("#window-prev"),
  windowNext: document.querySelector("#window-next"),
  windowLabel: document.querySelector("#window-label"),
  chartHead: document.querySelector("#chart-head"),
  chartBody: document.querySelector("#chart-body"),
  chartStatus: document.querySelector("#chart-status"),
  progressWrap: document.querySelector("#progress-wrap"),
  progressBar: document.querySelector("#progress-bar"),
  progressLabel: document.querySelector("#progress-label"),
  cancelCompute: document.querySelector("#cancel-compute"),

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

// Game-style suffixes: K/M/B/T capitalised, then a, b, c ... z, aa, bb ...
function letterSuffix(index) {
  if (index < 0) return "";
  if (index < 26) return String.fromCharCode(97 + index);
  const letter = String.fromCharCode(97 + ((index - 26) % 26));
  return letter.repeat(Math.floor((index - 26) / 26) + 2);
}

function gameStatValue(value, useStaged) {
  const absolute = Math.abs(value);
  if (absolute === 0) return { display: 0, numeric: 0, suffix: "" };
  let unitIndex, divisor, suffix;
  if (absolute >= 1e15) {
    unitIndex = Math.floor(Math.log10(absolute) / 3) - 5;
    divisor = 10 ** ((unitIndex + 5) * 3);
    suffix = unitIndex === 0 ? "T" : unitIndex === 1 ? "a" : letterSuffix(unitIndex - 2);
  } else if (absolute >= 1e12) { divisor = 1e12; suffix = "T"; }
  else if (absolute >= 1e9) { divisor = 1e9; suffix = "B"; }
  else if (absolute >= 1e6) { divisor = 1e6; suffix = "M"; }
  else if (absolute >= 1e3) { divisor = 1e3; suffix = "K"; }
  else { divisor = 1; suffix = ""; }
  const roundingFn = useStaged ? stagedRoundHalfDown : roundHalfDown;
  let display = roundingFn(value / divisor);
  if (Math.abs(display) >= 1000 && divisor > 1) {
    divisor = divisor / 1000;
    suffix = divisor === 1e12 ? "T" : divisor === 1e9 ? "B" : divisor === 1e6 ? "M" : divisor === 1e3 ? "K" : "";
    display = roundingFn(value / divisor);
  }
  return { display, numeric: display * divisor, suffix };
}

/* Cost lookup. Levels 2..500 are real observed data. Above 500 the value is
   ESTIMATED by geometric growth from the level-500 cost. */
function nextCost(level) {
  if (level < 2) return null;
  if (level > state.maxLevel) return null;
  if (level <= KNOWN_COST_MAX) {
    const cost = Number(state.costs[level]);
    return Number.isFinite(cost) && cost > 0 ? cost : null;
  }
  const anchor = Number(state.costs[KNOWN_COST_MAX]);
  if (!Number.isFinite(anchor) || anchor <= 0) return null;
  const growth = Number(state.costGrowth);
  if (!Number.isFinite(growth) || growth <= 1) return null;
  const estimated = anchor * growth ** (level - KNOWN_COST_MAX);
  return Number.isFinite(estimated) && estimated > 0 ? estimated : null;
}
function isEstimatedLevel(level) { return level > KNOWN_COST_MAX; }

/* ------------------------------------------------------------
   CHART ENGINE (section A)
   Uses true in-game rounding always, so the chart never shifts
   because of a display toggle in section B.
   ------------------------------------------------------------ */

const contributionCache = new Map();
function cacheKey(rankName, level) { return rankName + "|" + level; }
function itemContribution(rankName, level) {
  const key = cacheKey(rankName, level);
  const hit = contributionCache.get(key);
  if (hit) return hit;
  const stats = itemStats(rankName, level);
  const value = {
    equip: stats.equip,
    h1: gameStatValue(stats.h1, false).numeric,
    h2: gameStatValue(stats.h2, false).numeric,
    h3: gameStatValue(stats.h3, false).numeric,
  };
  contributionCache.set(key, value);
  return value;
}
function clearComputeCaches() { contributionCache.clear(); }

function chartTotal(levels, owned, highestRank) {
  let h1 = 0, h2 = 0, h3 = 0;
  for (let i = 0; i < owned.length; i += 1) {
    const contribution = itemContribution(owned[i].name, levels[owned[i].name]);
    h1 += contribution.h1; h2 += contribution.h2; h3 += contribution.h3;
  }
  const equip = itemContribution(highestRank, levels[highestRank]).equip;
  return (1 + equip / 100) * (1 + h1 / 100) * (1 + h2 / 100) * (1 + h3 / 100);
}

function chartEfficiency(rankName, levels, owned, highestRank, baseTotal) {
  const toLevel = levels[rankName] + 1;
  const cost = nextCost(toLevel);
  if (!cost) return null;
  const previous = levels[rankName];
  levels[rankName] = toLevel;
  const after = chartTotal(levels, owned, highestRank);
  levels[rankName] = previous;
  const percentGain = ((after - baseTotal) / baseTotal) * 100;
  return { rank: rankName, cost, percentGain, efficiency: percentGain / cost };
}

/* Buys every lower-item upgrade that beats the target's own next level,
   repeatedly, until the target itself is the best buy. Mutates `levels`. */
function prepareForTarget(levels, targetRank, owned, highestRank) {
  for (let safety = 0; safety < 20000; safety += 1) {
    const baseTotal = chartTotal(levels, owned, highestRank);
    const target = chartEfficiency(targetRank, levels, owned, highestRank, baseTotal);
    if (!target) return false;
    let best = null;
    for (let i = 0; i < owned.length; i += 1) {
      const name = owned[i].name;
      if (name === targetRank) continue;
      const action = chartEfficiency(name, levels, owned, highestRank, baseTotal);
      if (!action) continue;
      if (!best || action.efficiency > best.efficiency || (action.efficiency === best.efficiency && rankIndex(name) > rankIndex(best.rank))) best = action;
    }
    if (!best || best.efficiency <= target.efficiency * (1 + 1e-12)) return true;
    levels[best.rank] += 1;
  }
  return true;
}

/* The chart is a sequence of phases: highest item first, then the next
   highest, and so on. Each phase runs that item from wherever it stands up
   to the cap. Computation is strictly forward-only, so we advance a single
   running cursor and cache rows as we go. */
let chart = null;
let activeRun = null;

function resetChart() {
  const owned = ownedRanks();
  const levels = {};
  owned.forEach((rank) => { levels[rank.name] = 1; });
  chart = {
    signature: chartSignature(),
    order: owned.slice().reverse().map((rank) => rank.name),
    levels,
    phases: owned.slice().reverse().map((rank, index) => ({
      rank: rank.name,
      startLevel: index === 0 ? 1 : null,
      rows: index === 0 ? [{ level: 1, levels: { ...levels } }] : [],
      complete: false,
    })),
    cursor: 0,
    activePhase: 0,
    activeWindow: 0,
    exhausted: false,
  };
  clearComputeCaches();
}
function chartSignature() {
  return JSON.stringify({ rank: state.highestRank, max: state.maxLevel, growth: state.costGrowth, formulas: state.formulas });
}
function ensureChartFresh() {
  if (!chart || chart.signature !== chartSignature()) resetChart();
}

function yieldToBrowser() { return new Promise((resolve) => setTimeout(resolve, 0)); }

/* Advances computation until `phaseIndex` has rows covering `throughLevel`
   (or is finished). Returns when done or cancelled. */
async function computeThrough(phaseIndex, throughLevel, run) {
  const owned = ownedRanks();
  const highestRank = state.highestRank;
  const deadline = Date.now() + COMPUTE_BUDGET_MS;
  let sinceYield = 0;

  while (chart.cursor <= phaseIndex) {
    if (run.cancelled || Date.now() > deadline) return;
    const phase = chart.phases[chart.cursor];

    if (phase.startLevel === null) {
      phase.startLevel = chart.levels[phase.rank];
      phase.rows.push({ level: phase.startLevel, levels: { ...chart.levels } });
    }

    const needLevel = chart.cursor < phaseIndex ? state.maxLevel : throughLevel;

    while (chart.levels[phase.rank] < Math.min(needLevel, state.maxLevel)) {
      if (run.cancelled || Date.now() > deadline) return;
      const ok = prepareForTarget(chart.levels, phase.rank, owned, highestRank);
      const canUpgrade = ok && nextCost(chart.levels[phase.rank] + 1) !== null;
      if (!canUpgrade) { chart.exhausted = true; phase.complete = true; break; }
      chart.levels[phase.rank] += 1;
      phase.rows.push({ level: chart.levels[phase.rank], levels: { ...chart.levels } });
      sinceYield += 1;
      if (sinceYield >= CHUNK_SIZE) {
        sinceYield = 0;
        reportProgress(phase.rank, chart.levels[phase.rank], chart.cursor, chart.phases.length);
        await yieldToBrowser();
      }
    }

    if (chart.levels[phase.rank] >= state.maxLevel) phase.complete = true;
    if (chart.cursor === phaseIndex && !phase.complete) return; // reached requested window
    if (!phase.complete) return;
    chart.cursor += 1;
    if (chart.cursor >= chart.phases.length) return;
  }
}

function reportProgress(rankName, level, phaseIndex, totalPhases) {
  ui.progressLabel.textContent = `${rankName} - level ${level} of ${state.maxLevel} (item ${phaseIndex + 1} of ${totalPhases})`;
  const fraction = (phaseIndex + level / state.maxLevel) / totalPhases;
  ui.progressBar.style.width = `${Math.min(100, Math.round(fraction * 100))}%`;
}
function setComputing(isComputing) {
  ui.progressWrap.hidden = !isComputing;
  ui.cancelCompute.hidden = !isComputing;
  ui.chartTabs.classList.toggle("is-busy", isComputing);
}

/* Requests a view. Computes only as far as that window needs. */
async function showPhaseWindow(phaseIndex, windowIndex) {
  ensureChartFresh();
  chart.activePhase = phaseIndex;
  chart.activeWindow = Math.max(0, windowIndex);

  if (activeRun) activeRun.cancelled = true;
  const run = { cancelled: false };
  activeRun = run;

  const phase = chart.phases[phaseIndex];
  const startLevel = phase.startLevel !== null ? phase.startLevel : 1;
  const throughLevel = Math.min(state.maxLevel, startLevel + (chart.activeWindow + 1) * WINDOW_SIZE);

  const needsWork = chart.cursor < phaseIndex || (!phase.complete && (phase.rows.length === 0 || phase.rows[phase.rows.length - 1].level < throughLevel));
  if (needsWork) {
    setComputing(true);
    ui.chartStatus.textContent = "Calculating this section...";
    await yieldToBrowser();
    await computeThrough(phaseIndex, throughLevel, run);
    setComputing(false);
  }
  if (run.cancelled) return;
  renderChart();
}

/* ------------------------------------------------------------
   FORMATTING
   ------------------------------------------------------------ */

function formatNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return "\u2014";
  const absolute = Math.abs(value);
  if (absolute === 0) return "0";
  const suffixes = [
    [1e33, "Dc"], [1e30, "No"], [1e27, "Oc"], [1e24, "Sp"], [1e21, "Sx"],
    [1e18, "Qi"], [1e15, "Qa"], [1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"],
  ];
  // Past the named range, fall back to exponential rather than printing an
  // absurd mantissa like "2,835,500,000Q".
  if (absolute >= 1e36) return value.toExponential(2).replace("e+", "e");
  const found = suffixes.find(([threshold]) => absolute >= threshold);
  if (found) return `${(value / found[0]).toLocaleString(undefined, { maximumSignificantDigits: digits })}${found[1]}`;
  return value.toLocaleString(undefined, { maximumSignificantDigits: digits, maximumFractionDigits: 3 });
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
   CHART RENDERING
   ------------------------------------------------------------ */

function renderMaxLevelOptions() {
  const options = [];
  for (let cap = BASE_MAX_LEVEL; cap <= ABSOLUTE_MAX_LEVEL; cap += MAX_LEVEL_STEP) {
    const label = cap === BASE_MAX_LEVEL ? `${cap} (no unlocks)` : `${cap}`;
    options.push(`<option value="${cap}">${label}</option>`);
  }
  ui.maxLevel.innerHTML = options.join("");
  ui.maxLevel.value = String(state.maxLevel);
}
function renderRankOptions() {
  ui.highestRank.innerHTML = RANKS.map((rank) => `<option value="${rank.name}">${rank.name}</option>`).join("");
  ui.highestRank.value = state.highestRank;
}
function renderOwnershipInfo() {
  const count = ownedRanks().length;
  ui.itemCount.textContent = `${count} item${count === 1 ? "" : "s"} owned (${ownedRanks()[0].name} through ${state.highestRank})`;
  ui.estimateNote.hidden = state.maxLevel <= KNOWN_COST_MAX;
  ui.costGrowth.value = state.costGrowth;
}

function renderChartTabs() {
  ui.chartTabs.innerHTML = chart.phases.map((phase, index) => {
    const reachable = index <= chart.cursor;
    const range = phase.startLevel === null ? "not reached yet" : `from ${phase.startLevel}`;
    return `<button type="button" class="chart-tab${index === chart.activePhase ? " active" : ""}${reachable ? "" : " pending"}" data-phase="${index}">${phase.rank}<span class="chart-tab-sub">${range}</span></button>`;
  }).join("");
}

function renderChart() {
  const phase = chart.phases[chart.activePhase];
  const laterRanks = chart.order.slice(chart.activePhase + 1);
  const maxedRanks = chart.order.slice(0, chart.activePhase);

  renderChartTabs();

  ui.chartPhaseInfo.innerHTML = maxedRanks.length
    ? `Assumes these are already maxed: <strong>${maxedRanks.join(", ")}</strong>`
    : `This is your highest owned item. Nothing is maxed yet.`;

  const startLevel = phase.startLevel !== null ? phase.startLevel : 1;
  const windowStart = startLevel + chart.activeWindow * WINDOW_SIZE;
  const windowEnd = Math.min(state.maxLevel, windowStart + WINDOW_SIZE - 1);
  const rows = phase.rows.filter((row) => row.level >= windowStart && row.level <= windowEnd);

  const totalWindows = Math.max(1, Math.ceil((state.maxLevel - startLevel + 1) / WINDOW_SIZE));
  ui.windowLabel.textContent = `Levels ${windowStart}\u2013${windowEnd}  (page ${chart.activeWindow + 1} of ${totalWindows})`;
  ui.windowPrev.disabled = chart.activeWindow === 0;
  ui.windowNext.disabled = chart.activeWindow >= totalWindows - 1;
  ui.chartPrevItem.disabled = chart.activePhase === 0;
  ui.chartNextItem.disabled = chart.activePhase >= chart.phases.length - 1;

  if (!laterRanks.length) {
    ui.chartHead.innerHTML = "";
    ui.chartBody.innerHTML = `<tr><td class="muted-cell">${phase.rank} is your lowest owned item, so there is nothing left to prepare with. Level it straight to ${state.maxLevel}.</td></tr>`;
  } else if (!rows.length) {
    ui.chartHead.innerHTML = "";
    ui.chartBody.innerHTML = `<tr><td class="muted-cell">Nothing computed for this page yet.</td></tr>`;
  } else {
    ui.chartHead.innerHTML = `<tr><th class="sticky-col">${phase.rank}</th>${laterRanks.map((name) => `<th>${name}</th>`).join("")}</tr>`;
    ui.chartBody.innerHTML = rows.map((row) => {
      const estimated = isEstimatedLevel(row.level);
      return `<tr class="${estimated ? "estimated-row" : ""}"><td class="mono sticky-col">${row.level}${estimated ? '<span class="est-dot" title="Cost above level 500 is estimated">~</span>' : ""}</td>${laterRanks.map((name) => `<td class="mono">${row.levels[name]}</td>`).join("")}</tr>`;
    }).join("");
  }

  const lastRow = phase.rows[phase.rows.length - 1];
  if (chart.exhausted && lastRow) {
    ui.chartStatus.textContent = `Stopped at ${phase.rank} level ${lastRow.level}: no further cost data is available.`;
  } else if (phase.complete) {
    ui.chartStatus.textContent = `${phase.rank} is fully mapped to level ${state.maxLevel}.`;
  } else {
    ui.chartStatus.textContent = "";
  }
}

/* ------------------------------------------------------------
   EXPLORER (section B) - independent manual sandbox
   ------------------------------------------------------------ */

function ensureExplorerLevels() {
  ownedRanks().forEach((rank) => {
    const current = Number(state.explorerLevels[rank.name]);
    state.explorerLevels[rank.name] = Number.isInteger(current) ? clamp(current, 1, state.maxLevel) : 1;
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
  const equipFactor = 1 + equipped / 100;
  const h1Factor = 1 + detail.h1 / 100;
  const h2Factor = 1 + detail.h2 / 100;
  const h3Factor = 1 + detail.h3 / 100;
  return { total: equipFactor * h1Factor * h2Factor * h3Factor, equipFactor, h1Factor, h2Factor, h3Factor, equipped };
}
function explorerAction(rankName, levels) {
  const toLevel = levels[rankName] + 1;
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
  ui.explorerBreakdown.textContent = `equip +${formatStatPercent(summary.equipped)}  \u00b7  H1 \u00d7${formatNumber(summary.h1Factor, 5)} \u00b7 H2 \u00d7${formatNumber(summary.h2Factor, 5)} \u00b7 H3 \u00d7${formatNumber(summary.h3Factor, 5)}`;

  const actions = Object.fromEntries(explorerActions(levels).map((action) => [action.rank, action]));
  ui.explorerBody.innerHTML = ownedRanks().slice().reverse().map((rank) => {
    const level = levels[rank.name];
    const stats = itemStats(rank.name, level);
    const action = actions[rank.name];
    const isHighest = rank.name === state.highestRank;
    const parts = [`H1 ${formatStatPercent(stats.h1)}`];
    if (stats.h2) parts.push(`H2 ${formatStatPercent(stats.h2)}`);
    if (stats.h3) parts.push(`H3 ${formatStatPercent(stats.h3)}`);
    return `<tr class="${isHighest ? "equipped-row" : ""}">
      <td><span class="item-name">${rank.name}${isHighest ? '<span class="equipped-pill">highest</span>' : ""}</span></td>
      <td><input class="level-input" data-rank="${rank.name}" type="number" min="1" max="${state.maxLevel}" value="${level}" aria-label="${rank.name} level" /></td>
      <td class="mono ${action ? "" : "muted-cell"}">${action ? formatCost(action.cost) + (isEstimatedLevel(action.toLevel) ? " ~" : "") : level >= state.maxLevel ? "at cap" : "unknown"}</td>
      <td class="mono">${parts.join(" \u00b7 ")}</td>
      <td class="mono ${action ? "" : "muted-cell"}">${action ? `${formatNumber(action.efficiency * 1e6, 5)}% / 1M` : "\u2014"}</td>
    </tr>`;
  }).join("");

  const ranked = explorerActions(levels);
  const best = ranked[0];
  if (!best) {
    ui.bestUpgrade.className = "best-upgrade empty";
    ui.bestUpgrade.innerHTML = "Every owned item is at the current level cap.";
    ui.rankingBody.innerHTML = "";
  } else {
    ui.bestUpgrade.className = "best-upgrade";
    ui.bestUpgrade.innerHTML = `<div class="upgrade-title">Level ${best.rank} from ${best.fromLevel} \u2192 ${best.toLevel}</div><p>Costs <strong>${formatCost(best.cost)}</strong>${isEstimatedLevel(best.toLevel) ? " <em>(estimated)</em>" : ""} and raises total damage by <strong>${formatPercent(best.percentGain)}</strong> \u2014 ${formatNumber(best.efficiency * 1e6, 5)}% per 1M.</p>`;
    ui.rankingBody.innerHTML = ranked.slice(0, 12).map((action) => `<tr><td><strong>${action.rank}</strong></td><td>${action.fromLevel} \u2192 ${action.toLevel}</td><td class="mono">${formatPercent(action.percentGain)}</td><td class="mono">${formatCost(action.cost)}</td><td class="mono">${formatNumber(action.efficiency * 1e6, 5)}%</td></tr>`).join("");
  }
  saveState();
}

/* ------------------------------------------------------------
   EVENTS
   ------------------------------------------------------------ */

function onOwnershipChanged() {
  ensureExplorerLevels();
  renderOwnershipInfo();
  resetChart();
  renderExplorer();
  showPhaseWindow(0, 0);
}

function attachEvents() {
  ui.highestRank.addEventListener("change", () => {
    state.highestRank = ui.highestRank.value;
    state.explorerLevels = {};
    saveState();
    onOwnershipChanged();
  });
  ui.maxLevel.addEventListener("change", () => {
    state.maxLevel = clamp(Math.round(Number(ui.maxLevel.value) || BASE_MAX_LEVEL), BASE_MAX_LEVEL, ABSOLUTE_MAX_LEVEL);
    saveState();
    onOwnershipChanged();
  });
  ui.costGrowth.addEventListener("change", () => {
    const value = Number(ui.costGrowth.value);
    state.costGrowth = Number.isFinite(value) && value > 1 ? value : DEFAULT_COST_GROWTH;
    ui.costGrowth.value = state.costGrowth;
    saveState();
    onOwnershipChanged();
  });

  ui.chartTabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".chart-tab");
    if (!tab) return;
    showPhaseWindow(Number(tab.dataset.phase), 0);
  });
  ui.chartPrevItem.addEventListener("click", () => showPhaseWindow(Math.max(0, chart.activePhase - 1), 0));
  ui.chartNextItem.addEventListener("click", () => showPhaseWindow(Math.min(chart.phases.length - 1, chart.activePhase + 1), 0));
  ui.windowPrev.addEventListener("click", () => showPhaseWindow(chart.activePhase, chart.activeWindow - 1));
  ui.windowNext.addEventListener("click", () => showPhaseWindow(chart.activePhase, chart.activeWindow + 1));
  ui.cancelCompute.addEventListener("click", () => { if (activeRun) activeRun.cancelled = true; setComputing(false); ui.chartStatus.textContent = "Calculation cancelled."; });

  ui.explorerBody.addEventListener("change", (event) => {
    const input = event.target.closest("input[data-rank]");
    if (!input) return;
    state.explorerLevels[input.dataset.rank] = clamp(Math.round(Number(input.value) || 1), 1, state.maxLevel);
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
    const phase = chart && chart.phases[chart.activePhase];
    if (!phase || !phase.rows.length) return;
    const startLevel = phase.startLevel !== null ? phase.startLevel : 1;
    const windowStart = startLevel + chart.activeWindow * WINDOW_SIZE;
    const row = phase.rows.find((entry) => entry.level >= windowStart) || phase.rows[phase.rows.length - 1];
    state.explorerLevels = { ...row.levels };
    renderExplorer();
    ui.explorerBody.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */

function initialize() {
  if (rankIndex(state.highestRank) < 0) state.highestRank = "SS2";
  state.maxLevel = clamp(Math.round(Number(state.maxLevel) || BASE_MAX_LEVEL), BASE_MAX_LEVEL, ABSOLUTE_MAX_LEVEL);
  renderRankOptions();
  renderMaxLevelOptions();
  renderOwnershipInfo();
  ui.showRawStats.checked = state.options.showRawStats;
  ui.useRawHoldingTotals.checked = state.options.useRawHoldingTotals;
  ui.useStagedRounding.checked = state.options.useStagedRounding;
  ensureExplorerLevels();
  attachEvents();
  renderExplorer();
  resetChart();
  showPhaseWindow(0, 0);
}
initialize();
