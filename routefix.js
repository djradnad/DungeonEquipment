"use strict";
(function () {
  const STORAGE_KEY = "upgrade-pathfinder-v1";
  function savedState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch { return {}; }
  }

  function moveEquippedStat() {
    const summary = document.querySelector("#equipped-stat");
    const body = document.querySelector("#items-body");
    if (!summary || !body) return;

    summary.style.display = "none";
    const text = summary.textContent.replace(/^Equipped stat:\s*/i, "").trim();
    if (!text || text === "—") return;

    const state = savedState();
    const equippedRank = state.equippedRank || document.querySelector("#equipped-rank")?.value;
    if (!equippedRank) return;

    const row = [...body.querySelectorAll("tr")].find((tr) => {
      const input = tr.querySelector("input[data-rank]");
      return input?.dataset.rank === equippedRank;
    });
    if (!row) return;

    const cell = row.querySelector("td:first-child");
    if (!cell) return;
    cell.innerHTML = `<span class="item-name">${equippedRank}</span><span class="equipped-stat-inline">${text}</span>`;
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
      const tail = match[4];
      const noPrep = /no preparatory lower upgrades/i.test(tail);
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
      if (noPrep) {
        div.innerHTML = `<strong class="route-main">${rank} ${from} → ${to}</strong> <span>no preparatory lower upgrades <b>(0 prep upgrades, 0)</b></span>`;
      } else {
        div.innerHTML = `<span>${text}</span>`;
      }
      merged.push(div);
    }

    const list = document.createElement("div");
    list.className = "route-list";
    merged.forEach((node) => list.appendChild(node));
    const oldList = out.querySelector(".route-list");
    if (oldList) oldList.replaceWith(list);
    else out.appendChild(list);
  }

  function install() {
    moveEquippedStat();

    document.querySelector("#refresh-results")?.addEventListener("click", () => {
      // app.js already owns this button and calls renderAll(). We only repair
      // the moved stat after that render completes.
      setTimeout(moveEquippedStat, 0);
    });
    document.querySelector("#equipped-rank")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#equipped-level")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#use-raw-holding-totals")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));
    document.querySelector("#items-body")?.addEventListener("change", () => setTimeout(moveEquippedStat, 0));

    document.querySelector("#build-equipped-route")?.addEventListener("click", () => setTimeout(combineNoPrep, 0));
    document.querySelector("#plan-holding-route")?.addEventListener("click", () => setTimeout(combineNoPrep, 0));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
