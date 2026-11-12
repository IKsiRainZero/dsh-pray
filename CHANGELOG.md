# Changelog

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
