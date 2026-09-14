"use strict";
(function () {
  const STORAGE_KEY = "upgrade-pathfinder-v1";
  const MIGRATION_KEY = "upgrade-pathfinder-migrated-away-from-sss-v1";
  const TIER_ORDER = ["D", "C", "B", "A", "S", "SS"];
  const RANKS = [
    ...["D", "C", "B", "A", "S", "SS"].flatMap((tier) => [1, 2, 3, 4].map((rank) => ({ name: `${tier}${rank}`, tier, rank }))),
    { name: "SSS", tier: "SSS", rank: 1 },
  ];
  const DEFAULT_FORMULAS = { baseEquip: 10.2, baseH1: 1.01, baseH2: 15.78125, baseH3: 6.3125, equipGrowth: 1.02, holdingGrowth: 1.01 };

  function savedState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; }
    catch { return {}; }
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  function rankIndex(rankName) { return RANKS.findIndex((rank) => rank.name === rankName); }
  function ownedRanks(equippedRank) { return RANKS.slice(0, rankIndex(equippedRank) + 1); }

  function migrateStaleSSSSelection() {
    if (localStorage.getItem(MIGRATION_KEY)) return;
    const state = savedState();
    if (state.equippedRank === "SSS") {
      state.equippedRank = "SS2";
      saveState(state);
      const select = document.querySelector("#equipped-rank");
      if (select) {
        select.value = "SS2";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    try { localStorage.setItem(MIGRATION_KEY, "1"); } catch {}
  }

  function moveEquippedStat() {
    const summary = document.querySelector("#equipped-stat");
    const body = document.querySelector("#items-body");
    const select = document.querySelector("#equipped-rank");
    if (!summary || !body || !select) return;

    summary.style.display = "none";
    const text = summary.textContent.replace(/^Equipped stat:\s*/i, "").trim();
    if (!text || text === "—") return;

    const equippedRank = select.value;
    const row = [...body.querySelectorAll("tr")].find((tr) => tr.querySelector(`input[data-rank="${equippedRank}"]`));
    if (!row) return;

    const cell = row.querySelector("td:first-child");
    if (!cell) return;
    const existing = cell.querySelector(".equipped-stat-inline");
    if (existing && existing.textContent === text) return;
    cell.querySelector(".equipped-stat-inline")?.remove();
    cell.querySelector(".equipped-pill")?.remove();
    const stat = document.createElement("span");
    stat.className = "equipped-stat-inline";
    stat.textContent = text;
    cell.appendChild(stat);
  }

  function rankFactor(rank) {
    if (rank.tier === "SSS") return 625 * 2 ** 3 * 2.5 ** 4 * 12.5;
    if (["D", "C", "B", "A"].includes(rank.tier)) return 5 ** TIER_ORDER.indexOf(rank.tier) * 1.5 ** (rank.rank - 1);
    if (rank.tier === "S") return 625 * 2 ** (rank.rank - 1);
    return 625 * 2 ** 3 * 2.5 ** rank.rank;
  }

  function itemStats(rankName, level, formulas) {
    const rank = RANKS[rankIndex(rankName)];
    const multiplier = rankFactor(rank);
    const holdingLevel = formulas.holdingGrowth ** (level - 1);
    return {
      equip: formulas.baseEquip * multiplier * formulas.equipGrowth ** (level - 1),
      h1: formulas.baseH1 * multiplier * holdingLevel,
      h2: rankIndex(rankName) >= rankIndex("S1") ? formulas.baseH2 * (multiplier / rankFactor(RANKS[rankIndex("S1")])) * holdingLevel : 0,
      h3: rankIndex(rankName) >= rankIndex("SS1") ? formulas.baseH3 * (multiplier / rankFactor(RANKS[rankIndex("SS1")])) * holdingLevel : 0,
    };
  }

  function roundHalfDown(value, decimals = 2) {
    const factor = 10 ** decimals;
    const absolute = Math.abs(value) * factor;
    const whole = Math.floor(absolute);
    const fraction = absolute - whole;
    return Math.sign(value) * (fraction > 0.5 + 1e-10 ? whole + 1 : whole) / factor;
  }

  function gameStatValue(value) {
    const absolute = Math.abs(value);
    if (absolute === 0) return { numeric: 0 };
    let divisor;
    if (absolute >= 1e15) divisor = 10 ** ((Math.floor(Math.log10(absolute) / 3) - 5 + 5) * 3);
    else if (absolute >= 1e12) divisor = 1e12;
    else if (absolute >= 1e9) divisor = 1e9;
    else if (absolute >= 1e6) divisor = 1e6;
    else if (absolute >= 1e3) divisor = 1e3;
    else divisor = 1;
    let display = roundHalfDown(value / divisor);
    if (Math.abs(display) >= 1000 && divisor > 1) { divisor *= 1000; display = roundHalfDown(value / divisor); }
    return { numeric: display * divisor };
  }

  function holdingValueForTotal(value, useRawHoldingTotals) { return useRawHoldingTotals ? value : gameStatValue(value).numeric; }

  function damageTotal(levels, equippedRank, formulas, useRawHoldingTotals) {
    let h1 = 0, h2 = 0, h3 = 0;
    ownedRanks(equippedRank).forEach((rank) => {
      const stats = itemStats(rank.name, Number(levels[rank.name] || 1), formulas);
      h1 += holdingValueForTotal(stats.h1, useRawHoldingTotals);
      h2 += holdingValueForTotal(stats.h2, useRawHoldingTotals);
      h3 += holdingValueForTotal(stats.h3, useRawHoldingTotals);
    });
    const equipped = itemStats(equippedRank, Number(levels[equippedRank] || 1), formulas).equip;
    return (1 + equipped / 100) * (1 + h1 / 100) * (1 + h2 / 100) * (1 + h3 / 100);
  }

  function costAt(costs, level) {
    const cost = Number(costs[level]);
    return Number.isFinite(cost) && cost > 0 ? cost : null;
  }

  function readCostTable() {
    const state = savedState();
    const costs = { ...(state.costs || {}) };
    const textarea = document.querySelector("#cost-data");
    if (textarea?.value?.trim()) {
      textarea.value.split(/\r?\n/).forEach((line) => {
        const m = line.trim().match(/^(\d+)\s*(?:,|\t|\s+)\s*([0-9.]+)\s*([kKmMbB]?)$/);
        if (!m) return;
        const amount = Number(m[2]);
        const suffix = m[3].toLowerCase();
        const multiplier = suffix === "k" ? 1e3 : suffix === "m" ? 1e6 : suffix === "b" ? 1e9 : 1;
        const value = amount * multiplier;
        if (Number.isFinite(value) && value > 0) costs[Number(m[1])] = value;
      });
    }
    return costs;
  }

  function currentBuildFromPage(equippedRank) {
    const levels = {};
    const body = document.querySelector("#items-body");
    body?.querySelectorAll("input[data-rank]").forEach((input) => {
      levels[input.dataset.rank] = Math.max(1, Math.min(500, Math.round(Number(input.value) || 1)));
    });
    const equippedInput = document.querySelector("#equipped-level");
    if (equippedInput) levels[equippedRank] = Math.max(1, Math.min(500, Math.round(Number(equippedInput.value) || 1)));
    return levels;
  }

  function upgradeAction(rankName, levels, equippedRank, costs, formulas, useRawHoldingTotals) {
    const fromLevel = Number(levels[rankName] || 1);
    const toLevel = fromLevel + 1;
    const cost = toLevel <= 500 ? costAt(costs, toLevel) : null;
    if (!cost) return null;
    const before = damageTotal(levels, equippedRank, formulas, useRawHoldingTotals);
    const after = damageTotal({ ...levels, [rankName]: toLevel }, equippedRank, formulas, useRawHoldingTotals);
    const percentGain = ((after - before) / before) * 100;
    return { rank: rankName, fromLevel, toLevel, cost, percentGain, efficiency: percentGain / cost };
  }

  function optimizeTarget(targetRank, targetLevel, equippedRank, costs, formulas, useRawHoldingTotals) {
    const levels = Object.fromEntries(ownedRanks(equippedRank).map((rank) => [rank.name, 1]));
    levels[targetRank] = targetLevel;
    const lowerRanks = ownedRanks(equippedRank).filter((rank) => rank.name !== targetRank);
    const upgrades = [];
    for (let safety = 0; safety < 5000; safety += 1) {
      const target = upgradeAction(targetRank, levels, equippedRank, costs, formulas, useRawHoldingTotals);
      if (!target) return null;
      const best = lowerRanks.map((rank) => upgradeAction(rank.name, levels, equippedRank, costs, formulas, useRawHoldingTotals)).filter(Boolean).sort((a, b) => b.efficiency - a.efficiency || rankIndex(b.rank) - rankIndex(a.rank))[0];
      if (!best || best.efficiency <= target.efficiency * (1 + 1e-12)) break;
      levels[best.rank] += 1;
      upgrades.push(best);
    }
    return { levels, upgrades };
  }

  function formatNumber(value, digits = 4) {
    if (!Number.isFinite(value)) return "—";
    if (value === 0) return "0";
    const absolute = Math.abs(value);
    const suffixes = [[1e15, "Q"], [1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]];
    const found = suffixes.find(([threshold]) => absolute >= threshold);
    if (found) {
      const [threshold, suffix] = found;
      return `${(value / threshold).toLocaleString(undefined, { maximumSignificantDigits: digits })}${suffix}`;
    }
    return value.toLocaleString(undefined, { maximumSignificantDigits: digits, maximumFractionDigits: 3 });
  }

  function buildIndependentRoute() {
    // Read the CURRENT controls directly from the page. This avoids routing with
    // stale localStorage values when the user has just changed rank/level.
    const select = document.querySelector("#equipped-rank");
    const equippedRank = select?.value || savedState().equippedRank || "SS2";
    const currentLevels = currentBuildFromPage(equippedRank);
    const startLevel = Number(currentLevels[equippedRank] || 1);

    const output = document.querySelector("#planner-output");
    if (!output) return;
    if (startLevel >= 500) {
      output.innerHTML = `<div class="plan-summary"><h3>${equippedRank} is already at level 500</h3><p>There are no equipped levels left to route.</p></div>`;
      return;
    }

    const saved = savedState();
    const costs = readCostTable();
    const formulas = { ...DEFAULT_FORMULAS, ...(saved.formulas || {}) };
    const rawToggle = document.querySelector("#use-raw-holding-totals");
    const useRawHoldingTotals = rawToggle ? rawToggle.checked : Boolean(saved.options?.useRawHoldingTotals);
    const rows = [];

    for (let targetLevel = startLevel; targetLevel < 500; targetLevel += 1) {
      const plan = optimizeTarget(equippedRank, targetLevel, equippedRank, costs, formulas, useRawHoldingTotals);
      if (!plan) break;

      const changes = [];
      let prepCount = 0;
      let prepCost = 0;
      for (const rank of ownedRanks(equippedRank)) {
        if (rank.name === equippedRank) continue;
        const optimal = Number(plan.levels[rank.name] || 1);
        if (optimal <= 1) continue;
        changes.push(`${rank.name} 1→${optimal}`);
        for (let level = 2; level <= optimal; level += 1) {
          const cost = costAt(costs, level);
          if (cost) prepCost += cost;
        }
        prepCount += optimal - 1;
      }

      const changeText = changes.length ? changes.join(", ") : "no preparatory lower upgrades";
      rows.push(`<div class="route-row"><strong>Before ${equippedRank} ${targetLevel} → ${targetLevel + 1}</strong> — ${changeText} <span class="quiet">(${prepCount} prep upgrade${prepCount === 1 ? "" : "s"}, ${formatNumber(prepCost)})</span></div>`);
    }

    if (!rows.length) {
      output.innerHTML = `<div class="plan-summary"><h3>No route could be calculated</h3><p>The next equipped-item cost is not known yet.</p></div>`;
      return;
    }
    output.innerHTML = `<div class="plan-summary"><h3>Independent ${equippedRank} route</h3><p>Each equipped level is recalculated independently from level 1 on the lower items, so a later target can legitimately call for lower holding-item levels than an earlier target.</p><div class="route-list">${rows.join("")}</div></div>`;
  }

  function install() {
    migrateStaleSSSSelection();
    moveEquippedStat();

    const body = document.querySelector("#items-body");
    if (body) new MutationObserver(() => moveEquippedStat()).observe(body, { childList: true, subtree: true });

    document.querySelector("#equipped-rank")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#equipped-level")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#use-raw-holding-totals")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#refresh-results")?.addEventListener("click", () => setTimeout(moveEquippedStat, 0));

    const routeButton = document.querySelector("#build-equipped-route");
    if (routeButton) {
      routeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        buildIndependentRoute();
      }, true);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
