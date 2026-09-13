"use strict";

// Costs are the price to reach the level in the left column.
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

// 151,337700
// 152,344500
// 153,351380
// 154,358360
// 155,365430
// 156,372590
// 157,379850
// 158,387200
// 159,394640
// 160,402180
// 161,409810
// 162,417540
// 163,425360
// 164,433290
// 165,441310
// 166,449430
// 167,457650
// 168,465960
// 169,474380
// 170,482900
// 171,491520
// 172,500240
// 173,509070
// 174,518000
// 175,527030
// 176,536160
// 177,545400
// 178,554750
// 179,564200
// 180,573760
// 181,583430
// 182,593210
// 183,603090
// 184,613080
// 185,623180
// 186,633400
// 187,643720
// 188,654160
// 189,664710
// 190,675370
// 191,686140
// 192,697030
// 193,708030
// 194,719150
// 195,730380
// 196,741730
// 197,753200
// 198,764780
// 199,776490
// 200,788310
// 201,800250
// 202,812310
// 203,824490
// 204,836800
// 205,849220
// 206,861770
// 207,874440
// 208,887230
// 209,900150
// 210,913190
// 211,926360
// 212,939660
// 213,953080
// 214,966620
// 215,980300
// 216,994100
// 217,1010000
// 218,1020000
// 219,1040000
// 220,1050000
// 221,1060000
// 222,1080000
// 223,1090000
// 224,1110000
// 225,1120000
// 226,1140000
// 227,1150000
// 228,1170000
// 229,1180000
// 230,1200000
// 231,1220000
// 232,1230000
// 233,1250000
// 234,1260000
// 235,1280000
// 236,1300000
// 237,1310000
// 238,1330000
// 239,1350000
// 240,1360000
// 241,1380000
// 242,1400000
// 243,1420000
// 244,1440000
// 245,1450000
// 246,1470000
// 247,1490000
// 248,1510000
// 249,1520000
// 250,1540000
// 251,1560000
// 252,1580000
// 253,1600000

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
163,425370
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
212,939650
213,953080
214,966620
215,980300
216,994100
217,1010000
218,1020000
219,1040000
220,1050000
221,1070000
222,1080000
223,1090000
224,1110000
225,1120000
226,1140000
227,1150000
228,1170000
229,1190000
230,1200000
231,1220000
232,1230000
233,1250000
234,1270000
235,1280000
236,1300000
237,1310000
238,1330000
239,1350000
240,1370000
241,1380000
242,1400000
243,1420000
244,1440000
245,1450000
246,1470000
247,1490000
248,1510000
249,1530000
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
269,1930000
270,1950000
271,1970000
272,1990000
273,2010000
274,2030000
275,2060000
276,2080000
277,2100000
278,2130000
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
307,2870000
308,2890000
309,2920000
310,2950000
311,2980000
312,3010000
313,3040000
314,3070000
315,3100000
316,3130000
317,3160000
318,3190000
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
342,3970000
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
371,5070000
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
404,6550000
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
428,7790000
429,7840000
430,7900000
431,7950000
432,8010000
433,8060000
434,8120000
435,8180000
436,8230000
437,8290000
438,8350000
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
500,12430000`;

const STORAGE_KEY = "upgrade-pathfinder-v1";
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

const ui = {
  equippedRank: document.querySelector("#equipped-rank"),
  equippedLevel: document.querySelector("#equipped-level"),
  currentDamage: document.querySelector("#current-damage"),
  equippedStat: document.querySelector("#equipped-stat"),
  currentBreakdown: document.querySelector("#current-breakdown"),
  showRawStats: document.querySelector("#show-raw-stats"),
  useRawHoldingTotals: document.querySelector("#use-raw-holding-totals"),
  useStagedRounding: document.querySelector("#use-staged-rounding"),
  itemCount: document.querySelector("#item-count"),
  itemsBody: document.querySelector("#items-body"),
  bestUpgrade: document.querySelector("#best-upgrade"),
  rankingBody: document.querySelector("#ranking-body"),
  plannerOutput: document.querySelector("#planner-output"),
  costData: document.querySelector("#cost-data"),
  costStatus: document.querySelector("#cost-status"),
  formulaStatus: document.querySelector("#formula-status"),
  baseEquip: document.querySelector("#base-equip"),
  baseH1: document.querySelector("#base-h1"),
  baseH2: document.querySelector("#base-h2"),
  baseH3: document.querySelector("#base-h3"),
  equipGrowth: document.querySelector("#equip-growth"),
  holdingGrowth: document.querySelector("#holding-growth"),
};

function rankIndex(rankName) {
  return RANKS.findIndex((rank) => rank.name === rankName);
}

function ownedRanks() {
  return RANKS.slice(0, rankIndex(state.equippedRank) + 1);
}

function parseNumberWithSuffix(value) {
  const raw = String(value).trim().replaceAll(",", "");
  const match = raw.match(/^([0-9]*\.?[0-9]+)\s*([kmb])?$/i);
  if (!match) return Number.NaN;
  const amount = Number(match[1]);
  const unit = (match[2] || "").toLowerCase();
  const multiplier = unit === "k" ? 1e3 : unit === "m" ? 1e6 : unit === "b" ? 1e9 : 1;
  return amount * multiplier;
}

function parseCostData(text) {
  const costs = {};
  const problems = [];
  text.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const match = trimmed.match(/^(\d+)\s*(?:,|\t|\s+)\s*(.+)$/);
    if (!match) {
      problems.push(`line ${index + 1}`);
      return;
    }
    const level = Number(match[1]);
    const cost = parseNumberWithSuffix(match[2]);
    if (!Number.isInteger(level) || level < 2 || !Number.isFinite(cost) || cost <= 0) {
      problems.push(`line ${index + 1}`);
      return;
    }
    costs[level] = cost;
  });
  return { costs, problems };
}

function mapToCostText(costs) {
  return Object.entries(costs)
    .map(([level, cost]) => [Number(level), Number(cost)])
    .sort((a, b) => a[0] - b[0])
    .map(([level, cost]) => `${level},${Math.round(cost)}`)
    .join("\n");
}

function loadState() {
  const defaultCosts = parseCostData(DEFAULT_COST_DATA).costs;
  const initial = {
    equippedRank: "SS2",
    levels: {},
    costs: defaultCosts,
    formulas: { ...DEFAULT_FORMULAS },
    options: { showRawStats: false, useRawHoldingTotals: false, useStagedRounding: false },
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return initial;
    const savedFormulas = { ...(saved.formulas || {}) };
    // Upgrade the previous default (10.02%) to the now-confirmed 10.2%, while
    // leaving any other user-entered formula value alone.
    if (savedFormulas.baseEquip === 10.02) savedFormulas.baseEquip = 10.2;
    return {
      ...initial,
      ...saved,
      levels: { ...initial.levels, ...(saved.levels || {}) },
      costs: { ...initial.costs, ...(saved.costs || {}) },
      formulas: { ...initial.formulas, ...savedFormulas },
      options: { ...initial.options, ...(saved.options || {}) },
    };
  } catch {
    return initial;
  }
}

let state = loadState();
let pendingPlan = null;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureLevels() {
  ownedRanks().forEach((rank) => {
    const current = Number(state.levels[rank.name]);
    state.levels[rank.name] = Number.isInteger(current) ? clamp(current, 1, 500) : 1;
  });
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function rankFactor(rank) {
  if (rank.tier === "SSS") return 625 * 2 ** 3 * 2.5 * 2.5 ** 3 * 12.5;
  if (["D", "C", "B", "A"].includes(rank.tier)) {
    return 5 ** TIER_ORDER.indexOf(rank.tier) * 1.5 ** (rank.rank - 1);
  }
  if (rank.tier === "S") return 625 * 2 ** (rank.rank - 1);
  // SS1 is S4 × 2.5, with 2.5× for each later SS rank.
  return 625 * 2 ** 3 * 2.5 ** rank.rank;
}

function isAtLeast(rankName, cutoffName) {
  return rankIndex(rankName) >= rankIndex(cutoffName);
}

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

// Round using half-down rule: 0.5 exactly rounds down, anything above rounds up.
// Epsilon guards against floating point errors.
function roundHalfDown(value, decimals = 2) {
  const factor = 10 ** decimals;
  const absolute = Math.abs(value) * factor;
  const whole = Math.floor(absolute);
  const fraction = absolute - whole;
  const epsilon = 1e-10;
  const rounded = fraction > 0.5 + epsilon ? whole + 1 : whole;
  return Math.sign(value) * rounded / factor;
}

// Staged rounding: rounds at intermediate precision levels before final display.
// Mimics game behavior: truncate ten-thousandths, round ten-thousandths (affecting thousands),
// then round hundredths for display.
function stagedRoundHalfDown(value, decimals = 2) {
  const sign = Math.sign(value);
  const absolute = Math.abs(value);
  
  // Stage 1: Truncate to ten-thousandths (4 decimals), then round to that precision.
  let stage1 = roundHalfDown(absolute, 4);
  
  // Stage 2: Round the result to thousandths (3 decimals).
  let stage2 = roundHalfDown(stage1, 3);
  
  // Stage 3: Round to the final display precision (usually 2 decimals).
  let final = roundHalfDown(stage2, decimals);
  
  return sign * final;
}

function gameStatValue(value) {
  const units = [
    { threshold: 1e12, divisor: 1e12, suffix: "T" },
    { threshold: 1e9, divisor: 1e9, suffix: "B" },
    { threshold: 1e6, divisor: 1e6, suffix: "M" },
    { threshold: 1e3, divisor: 1e3, suffix: "k" },
    { threshold: 0, divisor: 1, suffix: "" },
  ];
  let unitIndex = units.findIndex((unit) => Math.abs(value) >= unit.threshold);
  let unit = units[unitIndex];
  const roundingFn = state.options.useStagedRounding ? stagedRoundHalfDown : roundHalfDown;
  let display = roundingFn(value / unit.divisor);
  // A value such as 999.999k is displayed in the next suffix after rounding.
  if (Math.abs(display) >= 1000 && unitIndex > 0) {
    unitIndex -= 1;
    unit = units[unitIndex];
    display = roundingFn(value / unit.divisor);
  }
  return { display, numeric: display * unit.divisor, suffix: unit.suffix };
}

function formatGameStatPercent(value) {
  const gameValue = gameStatValue(value);
  const display = gameValue.display.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1");
  return `${display}${gameValue.suffix}%`;
}

function formatRawStatPercent(value) {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}%`;
}

function formatStatPercent(value) {
  return state.options.showRawStats ? formatRawStatPercent(value) : formatGameStatPercent(value);
}

function holdingValueForTotal(value) {
  if (state.options.useRawHoldingTotals) return value;
  const gameVal = gameStatValue(value);
  // If using staged rounding, return the pre-rounded numeric value for summation
  return state.options.useStagedRounding ? gameVal.numeric : gameVal.numeric;
}

function damageSummary(levels) {
  const detail = { h1: 0, h2: 0, h3: 0 };
  ownedRanks().forEach((rank) => {
    const stats = itemStats(rank.name, levels[rank.name]);
    detail.h1 += holdingValueForTotal(stats.h1);
    detail.h2 += holdingValueForTotal(stats.h2);
    detail.h3 += holdingValueForTotal(stats.h3);
  });
  const equipped = itemStats(state.equippedRank, levels[state.equippedRank]).equip;
  const equipFactor = 1 + equipped / 100;
  const h1Factor = 1 + detail.h1 / 100;
  const h2Factor = 1 + detail.h2 / 100;
  const h3Factor = 1 + detail.h3 / 100;
  return {
    total: equipFactor * h1Factor * h2Factor * h3Factor,
    equipFactor,
    h1Factor,
    h2Factor,
    h3Factor,
    equipped,
    detail,
  };
}

function nextCost(level) {
  const cost = Number(state.costs[level]);
  return Number.isFinite(cost) && cost > 0 ? cost : null;
}

function getUpgradeAction(rankName, levels) {
  const fromLevel = levels[rankName];
  const toLevel = fromLevel + 1;
  const cost = toLevel <= 500 ? nextCost(toLevel) : null;
  if (!cost) return null;
  const before = damageSummary(levels).total;
  const afterLevels = { ...levels, [rankName]: toLevel };
  const after = damageSummary(afterLevels).total;
  const gain = after - before;
  const percentGain = (gain / before) * 100;
  return {
    rank: rankName,
    fromLevel,
    toLevel,
    cost,
    gain,
    percentGain,
    efficiency: percentGain / cost,
  };
}

function availableActions(levels, predicate = () => true) {
  return ownedRanks()
    .filter((rank) => predicate(rank.name))
    .map((rank) => getUpgradeAction(rank.name, levels))
    .filter(Boolean)
    .sort((a, b) => b.efficiency - a.efficiency || rankIndex(b.rank) - rankIndex(a.rank));
}

function formatNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return "—";
  const absolute = Math.abs(value);
  if (absolute === 0) return "0";
  const suffixes = [[1e15, "Q"], [1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]];
  const found = suffixes.find(([threshold]) => absolute >= threshold);
  if (found) {
    const [threshold, suffix] = found;
    return `${(value / threshold).toLocaleString(undefined, { maximumSignificantDigits: digits })}${suffix}`;
  }
  return value.toLocaleString(undefined, { maximumSignificantDigits: digits, maximumFractionDigits: 3 });
}

function formatCost(value) {
  return formatNumber(value, 4);
}

function formatPercent(value, decimals = 5) {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) < 0.00001) return `${value.toExponential(2)}%`;
  return `${value.toLocaleString(undefined, { maximumFractionDigits: decimals })}%`;
}

function renderRankOptions() {
  ui.equippedRank.innerHTML = RANKS.map((rank) => `<option value="${rank.name}">${rank.name}</option>`).join("");
  ui.equippedRank.value = state.equippedRank;
}

function renderFormulaInputs() {
  ui.baseEquip.value = state.formulas.baseEquip;
  ui.baseH1.value = state.formulas.baseH1;
  ui.baseH2.value = state.formulas.baseH2;
  ui.baseH3.value = state.formulas.baseH3;
  ui.equipGrowth.value = state.formulas.equipGrowth;
  ui.holdingGrowth.value = state.formulas.holdingGrowth;
}

function renderOptions() {
  ui.showRawStats.checked = state.options.showRawStats;
  ui.useRawHoldingTotals.checked = state.options.useRawHoldingTotals;
  ui.useStagedRounding.checked = state.options.useStagedRounding;
}

function renderSummary() {
  const summary = damageSummary(state.levels);
  ui.currentDamage.textContent = `×${formatNumber(summary.total, 5)}`;
  ui.equippedStat.textContent = `Equipped stat: +${formatStatPercent(summary.equipped)}`;
  ui.currentBreakdown.textContent = `equip ×${formatNumber(summary.equipFactor, 5)} · H1 ×${formatNumber(summary.h1Factor, 5)} · H2 ×${formatNumber(summary.h2Factor, 5)} · H3 ×${formatNumber(summary.h3Factor, 5)}`;
  ui.equippedLevel.value = state.levels[state.equippedRank];
  ui.itemCount.textContent = `${ownedRanks().length} item${ownedRanks().length === 1 ? "" : "s"} owned`;
}

function holdingDisplay(stats) {
  const parts = [`H1 ${formatStatPercent(stats.h1)}`];
  if (stats.h2) parts.push(`H2 ${formatStatPercent(stats.h2)}`);
  if (stats.h3) parts.push(`H3 ${formatStatPercent(stats.h3)}`);
  return parts.join(" · ");
}

function renderItems() {
  const actions = Object.fromEntries(availableActions(state.levels).map((action) => [action.rank, action]));
  ui.itemsBody.innerHTML = ownedRanks().map((rank) => {
    const level = state.levels[rank.name];
    const stats = itemStats(rank.name, level);
    const action = actions[rank.name];
    const isEquipped = rank.name === state.equippedRank;
    return `<tr class="${isEquipped ? "equipped-row" : ""}">
      <td><span class="item-name">${rank.name}${isEquipped ? '<span class="equipped-pill">equipped</span>' : ""}</span></td>
      <td><input class="level-input" data-rank="${rank.name}" type="number" min="1" max="500" value="${level}" aria-label="${rank.name} level" /></td>
      <td class="mono ${action ? "" : "muted-cell"}">${action ? formatCost(action.cost) : level >= 500 ? "Level cap" : "Unknown"}</td>
      <td class="mono">${holdingDisplay(stats)}</td>
      <td class="mono ${action ? "" : "muted-cell"}">${action ? `${formatNumber(action.efficiency * 1e6, 5)}% / 1M` : "—"}</td>
    </tr>`;
  }).join("");
}

function renderResults() {
  const actions = availableActions(state.levels);
  const best = actions[0];
  if (!best) {
    ui.bestUpgrade.className = "best-upgrade empty";
    ui.bestUpgrade.innerHTML = "No next upgrade can be compared. Add the cost for the next level, or lower an item below level 500.";
    ui.rankingBody.innerHTML = "";
    return;
  }
  ui.bestUpgrade.className = "best-upgrade";
  ui.bestUpgrade.innerHTML = `<div class="upgrade-title">Level ${best.rank} from ${best.fromLevel} → ${best.toLevel}</div>
    <p>Costs <strong>${formatCost(best.cost)}</strong> and increases total damage by <strong>${formatPercent(best.percentGain)}</strong> (${formatNumber(best.efficiency * 1e6, 5)}% per 1M cost).</p>`;
  ui.rankingBody.innerHTML = actions.slice(0, 10).map((action) => `<tr>
    <td><strong>${action.rank}</strong>${action.rank === state.equippedRank ? " <span class=\"equipped-pill\">equipped</span>" : ""}</td>
    <td>${action.fromLevel} → ${action.toLevel}</td>
    <td class="mono">${formatPercent(action.percentGain)}</td>
    <td class="mono">${formatCost(action.cost)}</td>
    <td class="mono">${formatNumber(action.efficiency * 1e6, 5)}%</td>
  </tr>`).join("");
}

function renderAll() {
  ensureLevels();
  renderSummary();
  renderItems();
  renderResults();
  saveState();
}

function copyLevels(levels) {
  return { ...levels };
}

function planBeforeTarget(startLevels, targetRank, excludedRanks = []) {
  const levels = copyLevels(startLevels);
  const exclude = new Set(excludedRanks);
  const upgrades = [];
  let target = getUpgradeAction(targetRank, levels);
  if (!target) {
    return { ok: false, reason: `The cost to take ${targetRank} from level ${levels[targetRank]} to ${levels[targetRank] + 1} is not known yet.`, levels };
  }
  for (let safety = 0; safety < 15000; safety += 1) {
    const candidates = availableActions(levels, (rank) => rank !== targetRank && !exclude.has(rank));
    const best = candidates[0];
    target = getUpgradeAction(targetRank, levels);
    if (!target || !best || best.efficiency <= target.efficiency * (1 + 1e-12)) break;
    levels[best.rank] += 1;
    upgrades.push(best);
  }
  const refreshedTarget = getUpgradeAction(targetRank, levels);
  const totalCost = upgrades.reduce((total, action) => total + action.cost, 0);
  const changes = ownedRanks()
    .filter((rank) => levels[rank.name] !== startLevels[rank.name])
    .map((rank) => ({ rank: rank.name, from: startLevels[rank.name], to: levels[rank.name] }));
  return { ok: true, levels, upgrades, changes, totalCost, target: refreshedTarget };
}

function planCard(plan, targetRank, targetLabel) {
  if (!plan.ok) return `<div class="plan-summary"><h3>Cannot plan this step yet</h3><p>${plan.reason}</p></div>`;
  if (!plan.changes.length) {
    return `<div class="plan-summary"><h3>${targetLabel} is already the best next buy</h3><p>No other owned item beats its next-upgrade damage-per-cost at the current levels. Upgrade ${targetRank} directly.</p></div>`;
  }
  const changes = plan.changes.map((change) => `<li><strong>${change.rank}</strong> · level ${change.from} → ${change.to}</li>`).join("");
  return `<div class="plan-summary"><h3>Before ${targetRank} goes ${plan.target.fromLevel} → ${plan.target.toLevel}</h3>
    <p>Buy the following ${plan.upgrades.length} lower-item upgrade${plan.upgrades.length === 1 ? "" : "s"} first. They cost ${formatCost(plan.totalCost)} total and each was more efficient than ${targetRank}.</p>
    <ul class="plan-list">${changes}</ul>
    <div class="inline-actions"><button type="button" class="button" id="apply-prep-plan">Apply these preparatory levels</button></div>
  </div>`;
}

function showPlanBeforeEquipped() {
  pendingPlan = planBeforeTarget(state.levels, state.equippedRank);
  ui.plannerOutput.innerHTML = planCard(pendingPlan, state.equippedRank, "the equipped item");
  const applyButton = document.querySelector("#apply-prep-plan");
  if (applyButton) {
    applyButton.addEventListener("click", () => {
      state.levels = pendingPlan.levels;
      renderAll();
      ui.plannerOutput.innerHTML = `<div class="plan-summary"><h3>Preparatory levels applied</h3><p>The build now reflects the recommended stopping levels. Recalculate or plan again when you are ready.</p></div>`;
    });
  }
}

function buildRoute(targetRank, excludedRanks = [], mode = "equipped") {
  let levels = copyLevels(state.levels);
  const route = [];
  let stopReason = "Reached level 500.";
  for (let safety = 0; safety < 15000; safety += 1) {
    const plan = planBeforeTarget(levels, targetRank, excludedRanks);
    if (!plan.ok) {
      stopReason = plan.reason;
      break;
    }
    levels = plan.levels;
    route.push({ from: plan.target.fromLevel, to: plan.target.toLevel, changes: plan.changes, actionCount: plan.upgrades.length, cost: plan.totalCost });
    levels[targetRank] += 1;
    if (levels[targetRank] >= 500) break;
  }
  const title = mode === "equipped" ? `Equipped ${targetRank} route` : `Holding-only route for ${targetRank}`;
  if (!route.length) {
    ui.plannerOutput.innerHTML = `<div class="plan-summary"><h3>${title}</h3><p>${stopReason}</p></div>`;
    return;
  }
  const list = route.map((step) => {
    const changes = step.changes.length ? step.changes.map((change) => `${change.rank} ${change.from}→${change.to}`).join(", ") : "no preparatory lower upgrades";
    return `<div class="route-row"><strong>Before ${targetRank} ${step.from} → ${step.to}</strong> — ${changes} <span class="quiet">(${step.actionCount} prep upgrade${step.actionCount === 1 ? "" : "s"}, ${formatCost(step.cost)})</span></div>`;
  }).join("");
  ui.plannerOutput.innerHTML = `<div class="plan-summary"><h3>${title}</h3><p>Calculated ${route.length} target upgrades from the current build. The route stops because: ${stopReason}</p><div class="route-list">${list}</div></div>`;
}

function buildHoldingRoute() {
  if (state.levels[state.equippedRank] !== 500) {
    ui.plannerOutput.innerHTML = `<div class="plan-summary"><h3>Set the equipped item to level 500 first</h3><p>This mode keeps the equipped item capped and uses the next-highest owned item as the target.</p></div>`;
    return;
  }
  const targetIndex = rankIndex(state.equippedRank) - 1;
  if (targetIndex < 0) {
    ui.plannerOutput.innerHTML = `<div class="plan-summary"><h3>No unequipped item exists</h3><p>D1 is the only owned item in this build.</p></div>`;
    return;
  }
  const targetRank = RANKS[targetIndex].name;
  buildRoute(targetRank, [state.equippedRank], "holding");
}

function readFormulaInputs() {
  const formulas = {
    baseEquip: Number(ui.baseEquip.value),
    baseH1: Number(ui.baseH1.value),
    baseH2: Number(ui.baseH2.value),
    baseH3: Number(ui.baseH3.value),
    equipGrowth: Number(ui.equipGrowth.value),
    holdingGrowth: Number(ui.holdingGrowth.value),
  };
  const valid = Object.values(formulas).every((value) => Number.isFinite(value) && value >= 0)
    && formulas.equipGrowth >= 1 && formulas.holdingGrowth >= 1;
  return valid ? formulas : null;
}

function attachEvents() {
  ui.equippedRank.addEventListener("change", () => {
    state.equippedRank = ui.equippedRank.value;
    ensureLevels();
    pendingPlan = null;
    renderAll();
  });
  ui.equippedLevel.addEventListener("change", () => {
    state.levels[state.equippedRank] = clamp(Math.round(Number(ui.equippedLevel.value) || 1), 1, 500);
    pendingPlan = null;
    renderAll();
  });
  ui.showRawStats.addEventListener("change", () => {
    state.options.showRawStats = ui.showRawStats.checked;
    renderAll();
  });
  ui.useRawHoldingTotals.addEventListener("change", () => {
    state.options.useRawHoldingTotals = ui.useRawHoldingTotals.checked;
    pendingPlan = null;
    renderAll();
  });
  ui.useStagedRounding.addEventListener("change", () => {
    state.options.useStagedRounding = ui.useStagedRounding.checked;
    pendingPlan = null;
    renderAll();
  });
  ui.itemsBody.addEventListener("change", (event) => {
    const input = event.target.closest("input[data-rank]");
    if (!input) return;
    state.levels[input.dataset.rank] = clamp(Math.round(Number(input.value) || 1), 1, 500);
    pendingPlan = null;
    renderAll();
  });
  document.querySelector("#reset-levels").addEventListener("click", () => {
    ownedRanks().forEach((rank) => { state.levels[rank.name] = 1; });
    pendingPlan = null;
    renderAll();
  });
  document.querySelector("#refresh-results").addEventListener("click", renderAll);
  document.querySelector("#apply-best").addEventListener("click", () => {
    const best = availableActions(state.levels)[0];
    if (!best) return;
    state.levels[best.rank] = best.toLevel;
    pendingPlan = null;
    renderAll();
  });
  document.querySelector("#plan-before-equipped").addEventListener("click", showPlanBeforeEquipped);
  document.querySelector("#build-equipped-route").addEventListener("click", () => buildRoute(state.equippedRank));
  document.querySelector("#plan-holding-route").addEventListener("click", buildHoldingRoute);
  document.querySelector("#apply-costs").addEventListener("click", () => {
    const parsed = parseCostData(ui.costData.value);
    if (!Object.keys(parsed.costs).length || parsed.problems.length) {
      ui.costStatus.textContent = `Nothing changed — fix ${parsed.problems.length || "the"} invalid line${parsed.problems.length === 1 ? "" : "s"}.`;
      return;
    }
    state.costs = parsed.costs;
    ui.costData.value = mapToCostText(state.costs);
    ui.costStatus.textContent = `Saved ${Object.keys(state.costs).length} known upgrade costs.`;
    pendingPlan = null;
    renderAll();
  });
  document.querySelector("#restore-costs").addEventListener("click", () => {
    state.costs = parseCostData(DEFAULT_COST_DATA).costs;
    ui.costData.value = mapToCostText(state.costs);
    ui.costStatus.textContent = "Restored the supplied costs through level 253.";
    pendingPlan = null;
    renderAll();
  });
  document.querySelector("#apply-formulas").addEventListener("click", () => {
    const formulas = readFormulaInputs();
    if (!formulas) {
      ui.formulaStatus.textContent = "Use non-negative bases and multipliers of at least 1.";
      return;
    }
    state.formulas = formulas;
    ui.formulaStatus.textContent = "Formula settings applied.";
    pendingPlan = null;
    renderAll();
  });
}

function initialize() {
  if (rankIndex(state.equippedRank) < 0) state.equippedRank = "SS2";
  ensureLevels();
  renderRankOptions();
  renderFormulaInputs();
  renderOptions();
  ui.costData.value = mapToCostText(state.costs);
  attachEvents();
  renderAll();
}

initialize();
