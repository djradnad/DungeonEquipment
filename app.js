"use strict";

// Costs are the price to reach the level in the left column.
// Levels 2-150: hardcoded original values
// Levels 151-253: commented out for comparison (original values)
// Levels 254-500: generated using Cost = 0.1(Level-1)^3 + Level + 49.4 with staged rounding
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
# Levels 151-253 (commented out for comparison with generated values)
# 151,337700
# 152,344500
# 153,351380
# 154,358360
# 155,365430
# 156,372590
# 157,379850
# 158,387200
# 159,394640
# 160,402180
# 161,409810
# 162,417540
# 163,425360
# 164,433290
# 165,441310
# 166,449430
# 167,457650
# 168,465960
# 169,474380
# 170,482900
# 171,491520
# 172,500240
# 173,509070
# 174,518000
# 175,527030
# 176,536160
# 177,545400
# 178,554750
# 179,564200
# 180,573760
# 181,583430
# 182,593210
# 183,603090
# 184,613080
# 185,623180
# 186,633400
# 187,643720
# 188,654160
# 189,664710
# 190,675370
# 191,686140
# 192,697030
# 193,708030
# 194,719150
# 195,730380
# 196,741730
# 197,753200
# 198,764780
# 199,776490
# 200,788310
# 201,800250
# 202,812310
# 203,824490
# 204,836800
# 205,849220
# 206,861770
# 207,874440
# 208,887230
# 209,900150
# 210,913190
# 211,926360
# 212,939660
# 213,953080
# 214,966620
# 215,980300
# 216,994100
# 217,1010000
# 218,1020000
# 219,1040000
# 220,1050000
# 221,1060000
# 222,1080000
# 223,1090000
# 224,1110000
# 225,1120000
# 226,1140000
# 227,1150000
# 228,1170000
# 229,1180000
# 230,1200000
# 231,1220000
# 232,1230000
# 233,1250000
# 234,1260000
# 235,1280000
# 236,1300000
# 237,1310000
# 238,1330000
# 239,1350000
# 240,1360000
# 241,1380000
# 242,1400000
# 243,1420000
# 244,1440000
# 245,1450000
# 246,1470000
# 247,1490000
# 248,1510000
# 249,1520000
# 250,1540000
# 251,1560000
# 252,1580000
# 253,1600000
# Generated values for levels 151-500 using: Cost = 0.1(Level-1)^3 + Level + 49.4
# with staged rounding applied
151,337700
152,344503
153,351381
154,358360
155,365443
156,372627
157,379914
158,387304
159,394797
160,402395
161,410098
162,417908
163,425823
164,433845
165,441975
166,450212
167,458558
168,467011
169,475574
170,484247
171,493031
172,501925
173,510931
174,520048
175,529277
176,538618
177,548072
178,557639
179,567319
180,577113
181,587021
182,597043
183,607179
184,617429
185,627795
186,638275
187,648871
188,659582
189,670409
190,681351
191,692410
192,703586
193,714878
194,726287
195,737813
196,749456
197,761216
198,773094
199,785089
200,797202
201,809432
202,821779
203,834245
204,846828
205,859529
206,872348
207,885285
208,898340
209,911513
210,924805
211,938215
212,951743
213,965390
214,979155
215,993039
216,1007041
217,1021162
218,1035401
219,1049759
220,1064235
221,1078830
222,1093543
223,1108375
224,1123325
225,1138394
226,1153581
227,1168888
228,1184313
229,1199857
230,1215520
231,1231301
232,1247202
233,1263221
234,1279359
235,1295616
236,1311992
237,1328488
238,1345102
239,1361835
240,1378688
241,1395660
242,1412750
243,1429960
244,1447289
245,1464737
246,1482304
247,1499990
248,1517795
249,1535719
250,1553762
251,1571923
252,1590204
253,1608603
254,1627121
255,1645758
256,1664514
257,1683389
258,1702382
259,1721494
260,1740725
261,1760074
262,1779541
263,1799127
264,1818832
265,1838655
266,1858596
267,1878656
268,1898834
269,1919131
270,1939546
271,1960079
272,1980731
273,2001501
274,2022389
275,2043395
276,2064520
277,2085762
278,2107122
279,2128600
280,2150195
281,2171908
282,2193739
283,2215687
284,2237753
285,2259936
286,2282236
287,2304654
288,2327189
289,2349841
290,2372610
291,2395496
292,2418499
293,2441619
294,2464855
295,2488208
296,2511678
297,2535264
298,2558966
299,2582785
300,2606720
301,2630771
302,2654938
303,2679221
304,2703620
305,2728135
306,2752766
307,2777513
308,2802375
309,2827353
310,2852447
311,2877656
312,2902980
313,2928420
314,2953975
315,2979646
316,3005431
317,3031331
318,3057347
319,3083477
320,3109722
321,3136082
322,3162557
323,3189147
324,3215851
325,3242670
326,3269603
327,3296651
328,3323813
329,3351089
330,3378479
331,3405984
332,3433603
333,3461335
334,3489182
335,3517141
336,3545215
337,3573402
338,3601702
339,3630116
340,3658643
341,3687283
342,3716036
343,3744901
344,3773880
345,3802971
346,3832175
347,3861492
348,3890921
349,3920463
350,3950117
351,3979883
352,4009762
353,4039753
354,4069856
355,4100071
356,4130399
357,4160838
358,4191390
359,4222053
360,4252829
361,4283716
362,4314715
363,4345826
364,4377048
365,4408382
366,4439827
367,4471384
368,4503052
369,4534831
370,4566722
371,4598724
372,4630838
373,4663062
374,4695397
375,4727844
376,4760401
377,4793069
378,4825848
379,4858738
380,4891738
381,4924849
382,4958070
383,4991401
384,5024843
385,5058394
386,5092056
387,5125827
388,5159708
389,5193699
390,5227799
391,5262009
392,5296328
393,5330756
394,5365294
395,5399940
396,5434696
397,5469560
398,5504533
399,5539615
400,5574805
401,5610103
402,5645510
403,5681025
404,5716648
405,5752379
406,5788218
407,5824165
408,5860219
409,5896381
410,5932650
411,5969027
412,6005511
413,6042102
414,6078800
415,6115605
416,6152517
417,6189535
418,6226660
419,6263891
420,6301228
421,6338672
422,6376221
423,6413876
424,6451637
425,6489504
426,6527477
427,6565555
428,6603738
429,6642027
430,6680422
431,6718921
432,6757526
433,6796236
434,6835050
435,6873970
436,6912995
437,6952125
438,6991359
439,7030698
440,7070141
441,7109688
442,7149340
443,7189096
444,7228956
445,7268919
446,7308987
447,7349158
448,7389433
449,7429811
450,7470292
451,7510877
452,7551565
453,7592357
454,7633251
455,7674248
456,7715348
457,7756551
458,7797857
459,7839265
460,7880776
461,7922390
462,7964106
463,8005925
464,8047845
465,8089868
466,8131993
467,8174220
468,8216549
469,8258980
470,8301512
471,8344146
472,8386881
473,8429718
474,8472656
475,8515695
476,8558835
477,8602077
478,8645419
479,8688862
480,8732406
481,8776050
482,8819796
483,8863642
484,8907589
485,8951635
486,8995782
487,9040029
488,9084376
489,9128823
490,9173370
491,9218017
492,9262763
493,9307609
494,9352554
495,9397598
496,9442742
497,9487985
498,9533327
499,9578769
500,9624309
`;

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
    ui.plannerOutput.innerHTML = `<div class="plan-summary"><h3>Set the equipped item to level 500 first</h3><p>This mode keeps the equipped item capped and uses the next-highest owned item as the target for leveling.</p></div>`;
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
    ui.costStatus.textContent = "Restored the supplied costs through level 500.";
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
