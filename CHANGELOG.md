# Changelog

## 0.6.1

- Fix the flame pushing the whole DSH page up: remove the `document.body` portal and render the fixed card/flame back through `shell.overlay`.
- Restore `×` close on the full card; after closing, reopen from the sidebar header or Settings.
- Keep `−` to collapse into the flame and hover for the brief panel.

## 0.6.0

- Remove the hard expectation cap; add per-level **throughput ceilings** so speed saturates naturally without a hard stop.
- Cut level purchase multiplier to ×1.2/10; raise cost growth to 1e4 / 1e5 / 1e6 / 1e7 / 1e8 per 10.
- Attention auto-buy is now 1 action/tick; simulated first-release time ≈ 17.8 h (no manual resets).
- Move layer notes out of Level rows into the Story page; Level rows link there.
- Portal the card/flame to `document.body` so the flame is frame-wide, not only on the detail page.
- Keep the flaming hover panel and “首先” first-run notice.

## 0.5.0

- Remove per-level run amplifiers entirely; each level now has a **layer note**: story + one technical term + how to use it (SemVer, AGI/MoE, latency/throughput, training/inference, scaling laws/emergence).
- Add a hard **1e12 expectation cap** per run; release threshold is 1e12.
- Replace multiplicative permanent/temporary bonuses with **additive** bonuses: soft release curve, achievements, launches, focus habits, version bonus, waiting bonus.
- Level purchase growth is now ×1.5 per 10 (gentler than the AD ×2).
- Rename permanent amplifiers to **long-term habits**; no UI string “amplifier”.
- Bottom-right uses a burning flame: hover for a brief panel, move away to hide, click to expand; no full hide.
- First-run notice title is now **“首先”**.
- Attention mode buys levels only, at most 2 actions/tick, and pauses at the release cap.

## 0.4.1

- Rebalance level cost growth to 1e3 / 1e4 / 1e5 / 1e6 / 1e7 per 10; the old Level 1 growth (×100) let attention-mode auto-buy run away.
- Attention mode now pauses buying when the run can 释怀 and caps auto actions per tick.
- Add **Start a fresh run** (keeps wish power, release, achievements, archive) and an out-of-range warning for old runaway saves.
- Add **Repair save** for the rare v0.4.0 save whose release multiplier was inflated by one huge release; it resets the release layer but keeps wish power/achievements.

## 0.4.0

- Rename **Boost** → **催更** and **Galaxy** → **发版**; remove the image level and name Level 5 “我们的deepseek···会变成什么样子”.
- Merge the overview and Level tabs into one Level page.
- Raise 释怀 threshold to **1e12** (after Level 5 unlocks at 1e9).
- Add **attention protection** vs **play** modes; attention mode auto-buys levels/run amplifiers but never auto-resets.
- Add a one-time first-run notice, a fully hideable card, and a settings toggle to restore it.
- Add achievements (permanent small multipliers) and a five-chapter story tab.
- Level rows show lifetime output, purchase multiplier, speed, and buy controls on the right.
- Keep the first-release celebration and add a settings preview.

## 0.3.0

- Five named **Levels** replace the three abstract dimensions; all levels are always listed.
- Level rows show owned/bought/lifetime output/purchase multiplier/speed, with buy buttons on the right.
- Add **Boost** (global reset) and **Galaxy** (reset of Boost), each with increasing costs and global multipliers.
- Run amplifier costs increased; Boost/Galaxy/释怀 reset them.
- Higher-frequency animated expectation number.
- First-release celebration overlay (with a settings preview button).
- Level 5 image slot; PNG/JPG/JPEG/WebP are served.
- v0.2 state migration: dimensions A/B/C → Level 1/2/3, dim amps → level amps.

## 0.2.0

- Rename the currencies to **期待 / 愿力 / 释怀**.
- Three expectation dimensions, run amplifiers, permanent amplifiers, and one release layer.
- Five realm milestones, including the user-provided realm 5 image slot.
- Core DSH activity collection: sessions, completed turns, active time, streaks.
- Sidebar panel + main page; the card remains a HUD.
- Local-only data; remove the total-repository push protocol.
- Migrate v0.1 points into `expectation` / `lifetimeExpectation`.

## 0.1.0

- First installable prototype: DeepSeek changelog countdown, time-based wish power, shell overlay card, optional local report mock.
