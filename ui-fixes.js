"use strict";
(function () {
  const STORAGE_KEY = "upgrade-pathfinder-v1";
  const MIGRATION_KEY = "upgrade-pathfinder-migrated-away-from-sss-v1";

  function savedState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; }
    catch { return {}; }
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  // The previous UI work could leave an old test selection of SSS in localStorage.
  // Migrate that one stale selection back to the site's normal SS2 starting point.
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

  function combineNoPrep() {
    const out = document.querySelector("#planner-output");
    if (!out) return;
    const rows = [...out.querySelectorAll(".route-row")];
    if (!rows.length) return;

    const merged = [];
    for (const row of rows) {
      const text = row.textContent.replace(/\s+/g, " ").trim();
      const match = text.match(/^(?:Before )?([A-Za-z0-9]+)\s+(\d+)\s*→\s*(\d+)\s+—?\s*(.*)$/);
      if (!match) { merged.push(row.cloneNode(true)); continue; }

      const rank = match[1];
      const from = Number(match[2]);
      const to = Number(match[3]);
      const noPrep = /no preparatory lower upgrades/i.test(match[4]);
      const last = merged[merged.length - 1];

      if (noPrep && last?.dataset?.noPrep === "1" && last.dataset.rank === rank && Number(last.dataset.to) === from) {
        last.dataset.to = String(to);
        const main = last.querySelector(".route-main");
        if (main) main.textContent = `${rank} ${last.dataset.from} → ${to}`;
        continue;
      }

      const div = document.createElement("div");
      div.className = "route-row";
      div.dataset.rank = rank;
      div.dataset.from = String(from);
      div.dataset.to = String(to);
      div.dataset.noPrep = noPrep ? "1" : "0";
      div.innerHTML = noPrep
        ? `<strong class="route-main">${rank} ${from} → ${to}</strong> <span>no preparatory lower upgrades <b>(0 prep upgrades, 0)</b></span>`
        : `<span>${text}</span>`;
      merged.push(div);
    }

    const list = document.createElement("div");
    list.className = "route-list";
    merged.forEach((node) => list.appendChild(node));
    out.querySelector(".route-list")?.replaceWith(list);
  }

  function install() {
    migrateStaleSSSSelection();
    moveEquippedStat();

    const body = document.querySelector("#items-body");
    if (body) {
      new MutationObserver(() => moveEquippedStat()).observe(body, { childList: true, subtree: true });
    }

    document.querySelector("#equipped-rank")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#equipped-level")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#use-raw-holding-totals")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#refresh-results")?.addEventListener("click", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#build-equipped-route")?.addEventListener("click", () => setTimeout(combineNoPrep, 0));
    document.querySelector("#plan-holding-route")?.addEventListener("click", () => setTimeout(combineNoPrep, 0));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
