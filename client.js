window.__ModuleLoader__.load({
  id: 'dsh-pray',
  factory(require) {
    const React = require('react')
    const { useCallback, useEffect, useMemo, useRef, useState } = React
    const h = React.createElement

    const NS = 'dshPray'
    const DICT = {
      zh: {
        title: 'dsh-pray · 期待',
        panelLabel: '期待',
        kicker: '本地单机 · 期待观测器',
        collapse: '收起',
        expand: '展开',
        since: '距 DeepSeek 上次更新',
        anchorNote: '锚点：更新日 00:00 (UTC+8)',
        expectation: '期待',
        perSecond: '每秒',
        level: 'Level',
        highestLevel: '当前 Level',
        nextLevel: '下一 Level',
        wish: '愿力',
        today: '今日',
        detailHint: '侧栏「期待」看详情',
        canRelease: '可释怀',
        readyBoost: '可 Boost',
        readyGalaxy: '可 Galaxy',
        waiting: '等待 Host…',
        loading: '正在读取本地状态…',
        error: '连接失败',
        retry: '重试',
        offline: '更新日志离线（缓存）',
        versionBonus: '版本红利',
        waitBonus: '等待加成',
        tabOverview: '总览',
        tabLevels: 'Level',
        tabWish: '愿力',
        tabRelease: '释怀',
        tabEras: '纪事',
        tabSettings: '设置',
        overview: '总览',
        nextUnlock: '下一次解锁',
        noNextUnlock: '全部 Level 已解锁',
        activity: '档案',
        sessions: '会话',
        turns: '完成轮数',
        active: '活跃时长',
        streak: '连续天数',
        tokens: 'token（只进档案）',
        toolCalls: '工具调用',
        levels: 'Level 递进',
        owned: '拥有',
        bought: '已买',
        produced: '累计产出',
        multiplier: '购买增幅',
        production: '速度',
        cost: '成本',
        buy: '购买',
        buy1: '+1',
        buy10: '+10',
        max: 'MAX',
        locked: '累计期待 {at} 解锁',
        notEnough: '不够',
        runAmps: '本轮增幅器',
        permanentAmps: '永久增幅器',
        levelAmps: '当前 Level 增幅器',
        globalAmp: '全局增幅器',
        boost: 'Boost',
        galaxy: 'Galaxy',
        boostDesc: '全局重置：清空所有 Level 和本轮增幅器，换 ×1.5 全局倍率/层。',
        galaxyDesc: '重置 Boost：清空 Boost、所有 Level 和本轮增幅器，换 ×2 全局倍率/次。',
        boosts: 'Boost 次数',
        galaxies: 'Galaxy 次数',
        boostCost: 'Boost 成本',
        galaxyCost: 'Galaxy 成本',
        galaxyRequires: '需要 {n} 次 Boost',
        boostButton: 'Boost（重置 Level）',
        galaxyButton: 'Galaxy（重置 Boost）',
        resetWarning: '再点一次确认：这会清空本轮的 Level 和增幅器。',
        confirm: '确认',
        cancel: '取消',
        boostDone: 'Boost 完成，获得 ×1.5 全局倍率。',
        galaxyDone: 'Galaxy 完成，获得 ×2 全局倍率。',
        releaseTitle: '释怀',
        releaseDesc: '这一轮不再更多增长期待，主动结束并换成永久倍率。',
        releaseGain: '预计获得',
        releaseThreshold: '门槛',
        releaseButton: '释怀这一轮',
        releaseConfirm: '再点一次确认：期待、Level、Boost、Galaxy、本轮增幅器会重置；愿力、释怀、档案保留。',
        releaseCancel: '取消',
        releaseBalance: '释怀',
        releaseMultiplier: '永久倍率',
        cannotRelease: '本轮累计期待还不够',
        releaseDone: '已释怀，获得 {n} 点释怀。',
        eras: '纪事',
        erasEmpty: '还没有记录到版本更新。',
        privacyTitle: '隐私',
        privacyText: '所有数据在 $DSH_HOME/dsh-pray/，不上传、不读取 prompt/回复/文件路径；除更新日志 GET 外不联网。',
        export: '导出本地数据',
        notation: '记数法',
        notationAuto: '自动',
        notationStandard: '标准',
        notationScientific: '科学',
        notationEngineering: '工程',
        notationLetters: '字母',
        wishSources: '愿力只来自行为：新会话、完成轮数、活跃 10 分钟、连续天数。token 与花费只进档案。',
        dailyCap: '每日上限',
        noData: '还没有数据。',
        versionUpdate: '最近更新',
        releaseCostNote: '释怀会重置期待、Level、Boost、Galaxy 和本轮增幅器；愿力不重置。',
        activeHours: '小时',
        minutes: '分钟',
        seconds: '秒',
        days: '天',
        imagePending: 'Level 5 图片待补：把截图放到 plugin/assets/realm-5.png',
        level5: 'Level 5',
        multiplierShort: '增幅',
        contribution: '本层累计',
        maxRealm: '已达最高 Level',
        previewEffect: '预览释怀特效',
      },
      en: {
        title: 'dsh-pray · Expectation',
        panelLabel: 'Expectation',
        kicker: 'local single-player · expectation observatory',
        collapse: 'Collapse',
        expand: 'Expand',
        since: 'Since DeepSeek last updated',
        anchorNote: 'Anchor: update day 00:00 (UTC+8)',
        expectation: 'Expectation',
        perSecond: 'per second',
        level: 'Level',
        highestLevel: 'Current level',
        nextLevel: 'Next level',
        wish: 'Wish power',
        today: 'today',
        detailHint: 'Open “Expectation” in the sidebar',
        canRelease: 'Ready to let go',
        readyBoost: 'Boost ready',
        readyGalaxy: 'Galaxy ready',
        waiting: 'Waiting for Host…',
        loading: 'Reading local state…',
        error: 'Connection failed',
        retry: 'Retry',
        offline: 'changelog offline (cached)',
        versionBonus: 'Version bonus',
        waitBonus: 'Waiting bonus',
        tabOverview: 'Overview',
        tabLevels: 'Levels',
        tabWish: 'Wish',
        tabRelease: 'Let go',
        tabEras: 'Chronicle',
        tabSettings: 'Settings',
        overview: 'Overview',
        nextUnlock: 'Next unlock',
        noNextUnlock: 'All levels unlocked',
        activity: 'Archive',
        sessions: 'Sessions',
        turns: 'Completed turns',
        active: 'Active time',
        streak: 'Streak',
        tokens: 'tokens (archive only)',
        toolCalls: 'Tool calls',
        levels: 'Level progression',
        owned: 'Owned',
        bought: 'Bought',
        produced: 'Lifetime output',
        multiplier: 'Purchase multiplier',
        production: 'Speed',
        cost: 'Cost',
        buy: 'Buy',
        buy1: '+1',
        buy10: '+10',
        max: 'MAX',
        locked: 'Unlocks at {at} lifetime expectation',
        notEnough: 'not enough',
        runAmps: 'Run amplifiers',
        permanentAmps: 'Permanent amplifiers',
        levelAmps: 'Level amplifiers',
        globalAmp: 'Global amplifier',
        boost: 'Boost',
        galaxy: 'Galaxy',
        boostDesc: 'Global reset: clears all levels and run amplifiers for ×1.5 global per boost.',
        galaxyDesc: 'Reset of Boost: clears boosts, levels, and run amplifiers for ×2 global per galaxy.',
        boosts: 'Boosts',
        galaxies: 'Galaxies',
        boostCost: 'Boost cost',
        galaxyCost: 'Galaxy cost',
        galaxyRequires: 'Requires {n} boosts',
        boostButton: 'Boost (reset levels)',
        galaxyButton: 'Galaxy (reset boosts)',
        resetWarning: 'Click again to confirm: this clears this run’s levels and amplifiers.',
        confirm: 'Confirm',
        cancel: 'Cancel',
        boostDone: 'Boost complete: ×1.5 global.',
        galaxyDone: 'Galaxy complete: ×2 global.',
        releaseTitle: 'Let go',
        releaseDesc: 'Stop growing expectation for this run, end it, and turn it into a permanent multiplier.',
        releaseGain: 'Gain',
        releaseThreshold: 'Threshold',
        releaseButton: 'Let go of this run',
        releaseConfirm: 'Click again to confirm: expectation, levels, boosts, galaxies, and run amplifiers reset; wish power, release, and archive stay.',
        releaseCancel: 'Cancel',
        releaseBalance: 'Release',
        releaseMultiplier: 'Permanent multiplier',
        cannotRelease: 'Not enough lifetime expectation this run',
        releaseDone: 'Released; gained {n}.',
        eras: 'Chronicle',
        erasEmpty: 'No update recorded yet.',
        privacyTitle: 'Privacy',
        privacyText: 'All data stays in $DSH_HOME/dsh-pray/. No upload, no prompt/reply/path reads; the only network request is the changelog GET.',
        export: 'Export local data',
        notation: 'Notation',
        notationAuto: 'Auto',
        notationStandard: 'Standard',
        notationScientific: 'Scientific',
        notationEngineering: 'Engineering',
        notationLetters: 'Letters',
        wishSources: 'Wish power comes from behavior only: new sessions, completed turns, 10 active minutes, and streaks. Tokens and cost are archive-only.',
        dailyCap: 'Daily cap',
        noData: 'No data yet.',
        versionUpdate: 'Latest update',
        releaseCostNote: 'Letting go resets expectation, levels, boosts, galaxies, and run amplifiers; wish power stays.',
        activeHours: 'h',
        minutes: 'm',
        seconds: 's',
        days: 'd',
        imagePending: 'Level 5 image pending: put a screenshot at plugin/assets/realm-5.png',
        level5: 'Level 5',
        multiplierShort: 'mult',
        contribution: 'Lifetime',
        maxRealm: 'Highest level reached',
        previewEffect: 'Preview release effect',
      },
    }

    const CSS = `
      .dsh-pray-root { position: fixed; right: 18px; bottom: 18px; z-index: 40; pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
        font-size: 12px; line-height: 1.4; }
      .dsh-pray-card { pointer-events: auto; box-sizing: border-box; width: 324px; max-width: calc(100vw - 32px);
        padding: 14px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 16px;
        background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
        box-shadow: 0 16px 48px color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent); }
      .dsh-pray-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
      .dsh-pray-brand { display: flex; align-items: center; gap: 9px; min-width: 0; }
      .dsh-pray-title { font-size: 13px; font-weight: 650; letter-spacing: .01em; }
      .dsh-pray-kicker { font-size: 10px; color: var(--dsw-alias-label-secondary); letter-spacing: .06em; }
      .dsh-pray-icon { border: 0; background: transparent; color: var(--dsw-alias-label-secondary);
        font-size: 16px; line-height: 1; padding: 2px 5px; border-radius: 6px; cursor: pointer; }
      .dsh-pray-icon:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
      .dsh-pray-label { font-size: 10px; color: var(--dsw-alias-label-secondary); letter-spacing: .1em; text-transform: uppercase; }
      .dsh-pray-since { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dsh-pray-clock { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 25px; font-weight: 600; letter-spacing: .02em; font-variant-numeric: tabular-nums; margin-top: 2px; }
      .dsh-pray-update { font-size: 11px; color: var(--dsw-alias-label-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dsh-pray-meta { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; margin-top: 4px;
        font-size: 10px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-tag { display: inline-flex; align-items: center; border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px; padding: 0 6px; font-size: 9px; line-height: 16px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
      .dsh-pray-tag.good { color: var(--dsw-alias-state-success-primary); }
      .dsh-pray-tag.warn { color: var(--dsw-alias-state-warn-primary); }
      .dsh-pray-stats { display: flex; justify-content: space-between; gap: 12px; margin-top: 13px; }
      .dsh-pray-big { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 28px; font-weight: 650; line-height: 1.1; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
      .dsh-pray-stat-right { text-align: right; }
      .dsh-pray-rate { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 18px; font-weight: 600; color: var(--dsw-alias-state-success-primary); font-variant-numeric: tabular-nums; }
      .dsh-pray-level-line { margin-top: 11px; }
      .dsh-pray-level-line-inner { display: flex; justify-content: space-between; gap: 8px; align-items: center; font-size: 11px; }
      .dsh-pray-level-name { font-weight: 600; color: var(--dsw-alias-brand-primary); overflow-wrap: anywhere; }
      .dsh-pray-level-next { color: var(--dsw-alias-label-secondary); font-size: 10px; text-align: right; }
      .dsh-pray-level-inline-img { width: 22px; height: 22px; border-radius: 6px; object-fit: cover; vertical-align: middle; margin-right: 6px; }
      .dsh-pray-bar { height: 4px; border-radius: 999px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; margin-top: 6px; }
      .dsh-pray-bar-fill { height: 100%; border-radius: 999px;
        background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); transition: width .5s ease; }
      .dsh-pray-foot { display: flex; justify-content: space-between; gap: 10px; align-items: flex-end;
        margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dsh-pray-wish { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-weight: 650; }
      .dsh-pray-hint { font-size: 9px; color: var(--dsw-alias-label-secondary); text-align: right; }
      .dsh-pray-pill { pointer-events: auto; display: flex; align-items: center; gap: 8px;
        border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-overlay);
        border-radius: 999px; padding: 7px 12px; color: var(--dsw-alias-label-primary); cursor: pointer; font: inherit;
        box-shadow: 0 8px 28px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent); }
      .dsh-pray-pill-points { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-weight: 650; font-size: 13px; }
      .dsh-pray-pill-rate { font-size: 10px; color: var(--dsw-alias-state-success-primary); }
      .dsh-pray-pill-level { font-size: 10px; color: var(--dsw-alias-label-secondary); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dsh-pray-loading { width: 260px; }
      .dsh-pray-flame { flex: 0 0 auto; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 40%, transparent));
        animation: dsh-pray-flicker 2.8s ease-in-out infinite; }
      @keyframes dsh-pray-flicker { 0%,100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.08); opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .dsh-pray-flame { animation: none; } .dsh-pray-bar-fill { transition: none; } }
      @media (max-width: 560px) { .dsh-pray-root { right: 10px; bottom: 10px; } .dsh-pray-card { width: 296px; } }

      .dsh-pray-page { height: 100%; overflow: auto; box-sizing: border-box; padding: 24px 28px 44px;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif; font-size: 13px; }
      .dsh-pray-page-inner { max-width: 1080px; margin: 0 auto; }
      .dsh-pray-page-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .dsh-pray-page-title { font-size: 24px; font-weight: 700; letter-spacing: -.02em; }
      .dsh-pray-page-level { margin-top: 2px; color: var(--dsw-alias-brand-primary); font-size: 14px; font-weight: 600; }
      .dsh-pray-page-sub { margin-top: 4px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .dsh-pray-tabs { display: flex; flex-wrap: wrap; gap: 2px; border-bottom: 1px solid var(--dsw-alias-border-l1); margin: 18px 0 16px; }
      .dsh-pray-tab { border: 0; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer;
        padding: 8px 12px; font: inherit; font-size: 12px; border-bottom: 2px solid transparent; margin-bottom: -1px; }
      .dsh-pray-tab:hover { color: var(--dsw-alias-label-primary); }
      .dsh-pray-tab.active { color: var(--dsw-alias-brand-primary); border-bottom-color: var(--dsw-alias-brand-primary); font-weight: 600; }
      .dsh-pray-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
      .dsh-pray-grid-wide { display: grid; grid-template-columns: 1.4fr 1fr; gap: 12px; }
      .dsh-pray-panelcard { background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 12px; padding: 14px; min-width: 0; }
      .dsh-pray-panelcard.accent { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, var(--dsw-alias-border-l1)); }
      .dsh-pray-cardtitle { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-value { margin-top: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
      .dsh-pray-value.small { font-size: 18px; }
      .dsh-pray-note { color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.6; }
      .dsh-pray-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-top: 8px; font-size: 12px; }
      .dsh-pray-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-variant-numeric: tabular-nums; }
      .dsh-pray-btn { border: 1px solid var(--dsw-alias-border-l1); background: transparent; color: var(--dsw-alias-label-primary);
        border-radius: 8px; padding: 5px 9px; font: inherit; font-size: 11px; cursor: pointer; }
      .dsh-pray-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
      .dsh-pray-btn:disabled { opacity: .42; cursor: default; }
      .dsh-pray-btn.primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base); font-weight: 650; }
      .dsh-pray-btn.warn { background: var(--dsw-alias-state-warn-primary); border-color: var(--dsw-alias-state-warn-primary);
        color: var(--dsw-alias-bg-base); font-weight: 650; }
      .dsh-pray-btn.ghost { border-color: transparent; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
      .dsh-pray-levels { display: flex; flex-direction: column; gap: 8px; }
      .dsh-pray-level-row { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; gap: 12px; align-items: center;
        padding: 11px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1); }
      .dsh-pray-level-row.locked { opacity: .52; }
      .dsh-pray-level-badge { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px;
        border-radius: 10px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-brand-primary); font-weight: 700; font-size: 18px; }
      .dsh-pray-level-img { width: 52px; height: 52px; border-radius: 10px; object-fit: cover; border: 1px solid var(--dsw-alias-border-l1); }
      .dsh-pray-level-main { min-width: 0; }
      .dsh-pray-level-name { font-size: 14px; font-weight: 650; overflow-wrap: anywhere; }
      .dsh-pray-level-stats { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 4px; font-size: 10px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-level-stats b { color: var(--dsw-alias-label-primary); font-weight: 600; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .dsh-pray-level-buy { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
      .dsh-pray-level-cost { font-size: 10px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
      .dsh-pray-level-cost b { color: var(--dsw-alias-label-primary); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .dsh-pray-locked { color: var(--dsw-alias-state-warn-primary); font-size: 11px; text-align: right; }
      .dsh-pray-boost-value { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 22px; font-weight: 700; }
      .dsh-pray-boost-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
      .dsh-pray-progress { height: 6px; border-radius: 999px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; margin-top: 8px; }
      .dsh-pray-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); }
      .dsh-pray-realmimg { display: block; width: auto; max-width: 100%; max-height: 260px; object-fit: contain;
        border-radius: 10px; margin: 10px auto 0; border: 1px solid var(--dsw-alias-border-l1); }
      .dsh-pray-list { display: flex; flex-direction: column; gap: 8px; }
      .dsh-pray-era { border-left: 2px solid var(--dsw-alias-brand-primary); padding: 4px 0 4px 10px; }
      .dsh-pray-era-date { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-error { margin-top: 10px; font-size: 11px; color: var(--dsw-alias-state-error-primary); word-break: break-word; }
      .dsh-pray-select { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 5px 8px; font: inherit; font-size: 12px; }
      .dsh-pray-link { color: var(--dsw-alias-brand-primary); text-decoration: none; }
      .dsh-pray-link:hover { text-decoration: underline; }

      .dsh-pray-celebrate { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;
        display: flex; align-items: center; justify-content: center; overflow: hidden;
        background: radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--dsw-alias-brand-primary) 26%, transparent), transparent 45%); }
      .dsh-pray-celebrate-text { font-size: 64px; font-weight: 800; letter-spacing: .08em;
        color: var(--dsw-alias-brand-primary); text-shadow: 0 0 40px color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);
        animation: dsh-pray-celebrate-pop .6s cubic-bezier(.2,.9,.2,1) both; }
      .dsh-pray-celebrate-gain { position: absolute; top: calc(50% + 54px); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 20px; color: var(--dsw-alias-state-success-primary); animation: dsh-pray-celebrate-fade 2.6s ease both; }
      .dsh-pray-particle { position: absolute; bottom: 34%; width: 7px; height: 7px; border-radius: 50%;
        background: var(--dsw-alias-state-warn-primary); opacity: 0;
        animation: dsh-pray-rise 1.8s ease-out forwards; }
      @keyframes dsh-pray-celebrate-pop { from { transform: scale(.55); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      @keyframes dsh-pray-celebrate-fade { 0% { opacity: 0; transform: translateY(8px); } 15% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; } 100% { opacity: 0; } }
      @keyframes dsh-pray-rise {
        0% { opacity: .9; transform: translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(var(--dsh-pray-dx, 0), -220px) scale(.35); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dsh-pray-celebrate-text { animation: none; }
        .dsh-pray-celebrate-gain { animation: none; }
        .dsh-pray-particle { display: none; }
      }
      @media (max-width: 760px) {
        .dsh-pray-grid-wide { grid-template-columns: 1fr; }
        .dsh-pray-page { padding: 16px 14px 36px; }
        .dsh-pray-level-row { grid-template-columns: 46px minmax(0, 1fr); }
        .dsh-pray-level-badge, .dsh-pray-level-img { width: 44px; height: 44px; }
        .dsh-pray-level-buy { grid-column: 1 / -1; align-items: flex-start; }
        .dsh-pray-level-cost { white-space: normal; }
      }
    `

    function makeT(props) {
      const supplied = typeof props?.t === 'function' ? props.t : null
      return (key) => {
        if (supplied) {
          const value = supplied(key)
          if (value && value !== key) return value
        }
        return DICT.zh[key] || key
      }
    }

    function localize(t, key, values = {}) {
      let text = t(key)
      for (const [name, value] of Object.entries(values)) {
        text = text.replaceAll(`{${name}}`, String(value))
      }
      return text
    }

    function flameIcon(size, color) {
      return h(
        'svg',
        { className: 'dsh-pray-flame', width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true },
        h('path', {
          d: 'M12.2 1.8c.7 3.2 4.6 5.1 4.6 9.4a4.8 4.8 0 1 1-9.6 0c0-2.2 1.2-4 2.6-5.5.2 1.7 1 2.8 1.9 3.5.8-1.8.9-4.1.5-7.4Z',
          fill: color || 'var(--dsw-alias-brand-primary)',
        }),
        h('path', {
          d: 'M12 21.8a5.2 5.2 0 0 0 5.2-5.2c0-2.7-1.9-4.7-3-6.1.1 2.1-1 3.4-2.3 4.1-1.2-.7-1.8-1.8-1.9-3-1.4 1.4-3.2 3.6-3.2 5.1A5.2 5.2 0 0 0 12 21.8Z',
          fill: 'var(--dsw-alias-state-warn-primary)',
          opacity: 0.9,
        }),
      )
    }

    function formatNumber(value, notation = 'auto') {
      const n = Number(value) || 0
      if (!Number.isFinite(n)) return n > 0 ? '∞' : '0'
      const abs = Math.abs(n)
      if (abs < 1e6) {
        return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n)
      }
      const exp = Math.floor(Math.log10(abs))
      if (notation === 'standard') {
        return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n)
      }
      if (notation === 'engineering') {
        const eng = Math.floor(exp / 3) * 3
        return `${(n / 10 ** eng).toFixed(2)}e${eng}`
      }
      if (notation === 'letters') {
        const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc']
        const tier = Math.floor(exp / 3)
        if (tier < suffixes.length) return `${(n / 10 ** (tier * 3)).toFixed(2)}${suffixes[tier]}`
        return `${n.toExponential(2).replace('e+', 'e')}`
      }
      return `${(n / 10 ** exp).toFixed(2)}e${exp}`
    }

    function formatDuration(totalSeconds, t, compact = false) {
      if (totalSeconds == null || !Number.isFinite(totalSeconds)) return '—'
      const seconds = Math.max(0, Math.floor(totalSeconds))
      const days = Math.floor(seconds / 86400)
      const hours = Math.floor((seconds % 86400) / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const rest = seconds % 60
      const pad = (value) => String(value).padStart(2, '0')
      if (days > 0) return compact ? `${days}${t('days')} ${pad(hours)}h` : `${days}${t('days')} ${pad(hours)}:${pad(minutes)}:${pad(rest)}`
      return `${pad(hours)}:${pad(minutes)}:${pad(rest)}`
    }

    function formatActive(seconds, t) {
      const total = Math.max(0, Number(seconds) || 0)
      if (total >= 3600) return `${(total / 3600).toFixed(1)}${t('activeHours')}`
      if (total >= 60) return `${Math.floor(total / 60)}${t('minutes')}`
      return `${Math.floor(total)}${t('seconds')}`
    }

    function useAnimatedNumber(target, rate, intervalMs = 60) {
      const [display, setDisplay] = useState(target)
      const anchor = useRef({ target, at: Date.now(), rate })
      useEffect(() => {
        anchor.current = { target, at: Date.now(), rate }
      }, [target, rate])
      useEffect(() => {
        const id = setInterval(() => {
          const a = anchor.current
          setDisplay(a.target + a.rate * (Date.now() - a.at) / 1000)
        }, intervalMs)
        return () => clearInterval(id)
      }, [intervalMs])
      return display
    }

    function usePrayState(intervalMs = 1000) {
      const [state, setState] = useState(null)
      const [error, setError] = useState(null)
      const [busy, setBusy] = useState(false)

      const load = useCallback(async () => {
        try {
          const response = await fetch('/dsh-pray/state', { cache: 'no-store', headers: { accept: 'application/json' } })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          setState(await response.json())
          setError(null)
        } catch (fetchError) {
          setError(String(fetchError?.message || fetchError))
        }
      }, [])

      useEffect(() => {
        load()
        const id = setInterval(load, intervalMs)
        return () => clearInterval(id)
      }, [load, intervalMs])

      const act = useCallback(async (body) => {
        setBusy(true)
        try {
          const response = await fetch('/dsh-pray/action', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
          })
          const data = await response.json()
          if (data?.state) setState(data.state)
          if (!data?.ok) setError(data?.error || '操作失败')
          else setError(null)
          return data
        } catch (actionError) {
          setError(String(actionError?.message || actionError))
          return { ok: false, error: String(actionError?.message || actionError) }
        } finally {
          setBusy(false)
        }
      }, [])

      return { state, error, busy, act, reload: load }
    }

    function PanelIcon({ size = 20, active = false }) {
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, style: { display: 'block' } },
        h('path', {
          d: 'M12.2 1.8c.7 3.2 4.6 5.1 4.6 9.4a4.8 4.8 0 1 1-9.6 0c0-2.2 1.2-4 2.6-5.5.2 1.7 1 2.8 1.9 3.5.8-1.8.9-4.1.5-7.4Z',
          fill: active ? 'var(--dsw-alias-brand-primary)' : 'currentColor',
          opacity: active ? 1 : 0.72,
        }),
        h('path', {
          d: 'M12 21.8a5.2 5.2 0 0 0 5.2-5.2c0-2.7-1.9-4.7-3-6.1.1 2.1-1 3.4-2.3 4.1-1.2-.7-1.8-1.8-1.9-3-1.4 1.4-3.2 3.6-3.2 5.1A5.2 5.2 0 0 0 12 21.8Z',
          fill: active ? 'var(--dsw-alias-state-warn-primary)' : 'currentColor',
          opacity: active ? 0.9 : 0.42,
        }),
      )
    }

    function PrayCard(props) {
      const t = makeT(props)
      const { state, error } = usePrayState(1000)
      const [collapsed, setCollapsed] = useState(false)
      const [now, setNow] = useState(() => Date.now())
      const animated = useAnimatedNumber(state?.expectation ?? 0, state?.expectationPerSecond ?? 0, 60)

      useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
      }, [])

      const notation = state?.settings?.notation || 'auto'
      const level = state?.highestLevel
      const next = state?.nextLevel
      const seconds = useMemo(() => {
        if (!state?.latestUpdate) return state?.secondsSinceUpdate ?? null
        const anchor = Date.parse(`${state.latestUpdate}T00:00:00+08:00`)
        return Number.isFinite(anchor) ? Math.max(0, Math.floor((now - anchor) / 1000)) : state?.secondsSinceUpdate ?? null
      }, [state?.latestUpdate, state?.secondsSinceUpdate, now])

      if (!state) {
        return h(
          'div',
          { className: 'dsh-pray-root' },
          h('style', null, CSS),
          h(
            'div',
            { className: 'dsh-pray-card dsh-pray-loading' },
            h(
              'div',
              { className: 'dsh-pray-head' },
              h('div', { className: 'dsh-pray-brand' }, flameIcon(18), h('div', { className: 'dsh-pray-title' }, t('title'))),
            ),
            h('div', { className: 'dsh-pray-label', style: { marginTop: 12 } }, error ? t('error') : t('loading')),
            error ? h('div', { className: 'dsh-pray-meta' }, error) : null,
          ),
        )
      }

      if (collapsed) {
        return h(
          'div',
          { className: 'dsh-pray-root' },
          h('style', null, CSS),
          h(
            'button',
            { type: 'button', className: 'dsh-pray-pill', onClick: () => setCollapsed(false), title: t('expand'), 'aria-label': t('expand') },
            flameIcon(15),
            h('span', { className: 'dsh-pray-pill-points' }, formatNumber(animated, notation)),
            h('span', { className: 'dsh-pray-pill-rate' }, `+${formatNumber(state.expectationPerSecond, notation)}/s`),
            h('span', { className: 'dsh-pray-pill-level' }, level ? `L${level.index} · ${level.name}` : ''),
          ),
        )
      }

      const progress = Math.round((next?.progress ?? 1) * 100)
      return h(
        'div',
        { className: 'dsh-pray-root' },
        h('style', null, CSS),
        h(
          'div',
          { className: 'dsh-pray-card' },
          h(
            'div',
            { className: 'dsh-pray-head' },
            h(
              'div',
              { className: 'dsh-pray-brand' },
              flameIcon(18),
              h('div', null, h('div', { className: 'dsh-pray-title' }, t('title')), h('div', { className: 'dsh-pray-kicker' }, t('kicker'))),
            ),
            h('button', { type: 'button', className: 'dsh-pray-icon', onClick: () => setCollapsed(true), title: t('collapse'), 'aria-label': t('collapse') }, '−'),
          ),
          h(
            'div',
            { className: 'dsh-pray-since' },
            h('div', { className: 'dsh-pray-label' }, t('since')),
            h('div', { className: 'dsh-pray-clock' }, formatDuration(seconds, t)),
            h('div', { className: 'dsh-pray-update' }, state.latestUpdate || '—', state.latestHeadings?.length ? ` · ${state.latestHeadings.join(' · ')}` : ''),
            h(
              'div',
              { className: 'dsh-pray-meta' },
              h('span', null, t('anchorNote')),
              state.changelogOk === false ? h('span', { className: 'dsh-pray-tag' }, t('offline')) : null,
              state.versionBonusActive ? h('span', { className: 'dsh-pray-tag good' }, t('versionBonus')) : null,
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-stats' },
            h('div', null, h('div', { className: 'dsh-pray-label' }, t('expectation')), h('div', { className: 'dsh-pray-big' }, formatNumber(animated, notation))),
            h('div', { className: 'dsh-pray-stat-right' }, h('div', { className: 'dsh-pray-label' }, t('perSecond')), h('div', { className: 'dsh-pray-rate' }, `+${formatNumber(state.expectationPerSecond, notation)}`)),
          ),
          h(
            'div',
            { className: 'dsh-pray-level-line' },
            h(
              'div',
              { className: 'dsh-pray-level-line-inner' },
              h(
                'span',
                { className: 'dsh-pray-level-name' },
                level?.image ? h('img', { className: 'dsh-pray-level-inline-img', src: '/dsh-pray/asset/realm-5', alt: level.name }) : null,
                level ? `L${level.index} · ${level.name}` : '—',
              ),
              next ? h('span', { className: 'dsh-pray-level-next' }, `${t('nextLevel')} L${next.index} · ${progress}%`) : h('span', { className: 'dsh-pray-level-next' }, t('maxRealm')),
            ),
            h('div', { className: 'dsh-pray-bar' }, h('div', { className: 'dsh-pray-bar-fill', style: { width: `${Math.max(2, progress)}%` } })),
          ),
          h(
            'div',
            { className: 'dsh-pray-foot' },
            h(
              'div',
              null,
              h('div', { className: 'dsh-pray-label' }, t('wish')),
              h('div', { className: 'dsh-pray-wish' }, formatNumber(state.wish, notation)),
              h('div', { className: 'dsh-pray-meta' }, `${t('today')} ${formatNumber(state.activity?.todayWish || 0, notation)}/${formatNumber(state.dailyCap || 0, notation)}`),
            ),
            h(
              'div',
              { className: 'dsh-pray-hint' },
              state.canRelease ? h('div', { className: 'dsh-pray-tag warn' }, t('canRelease')) : null,
              state.canBoost ? h('div', { className: 'dsh-pray-tag good' }, t('readyBoost')) : null,
              state.canGalaxy ? h('div', { className: 'dsh-pray-tag good' }, t('readyGalaxy')) : null,
              h('div', null, t('detailHint')),
            ),
          ),
          error ? h('div', { className: 'dsh-pray-error' }, `${t('error')}: ${error}`) : null,
        ),
      )
    }

    function StatCard({ label, value, note, accent, small }) {
      return h(
        'div',
        { className: `dsh-pray-panelcard${accent ? ' accent' : ''}` },
        h('div', { className: 'dsh-pray-cardtitle' }, label),
        h('div', { className: `dsh-pray-value${small ? ' small' : ''}` }, value),
        note ? h('div', { className: 'dsh-pray-note' }, note) : null,
      )
    }

    function LevelRow({ level, state, t, notation, busy, run }) {
      const cost10 = Number.isFinite(level.cost10) ? formatNumber(level.cost10, notation) : '∞'
      return h(
        'div',
        { className: `dsh-pray-level-row${level.unlocked ? '' : ' locked'}` },
        h(
          'div',
          { className: 'dsh-pray-level-badge' },
          level.image
            ? h('img', { className: 'dsh-pray-level-img', src: '/dsh-pray/asset/realm-5', alt: level.name })
            : level.index,
        ),
        h(
          'div',
          { className: 'dsh-pray-level-main' },
          h('div', { className: 'dsh-pray-level-name' }, level.name),
          h(
            'div',
            { className: 'dsh-pray-level-stats' },
            h('span', null, `${t('owned')} `, h('b', null, formatNumber(level.owned, notation))),
            h('span', null, `${t('bought')} `, h('b', null, level.bought)),
            h('span', null, `${t('contribution')} `, h('b', null, formatNumber(level.produced, notation))),
            h('span', null, `${t('multiplierShort')} `, h('b', null, `×${formatNumber(level.multiplier, notation)}`)),
            h('span', null, `${t('production')} `, h('b', null, `${formatNumber(level.production, notation)}/s`)),
          ),
        ),
        h(
          'div',
          { className: 'dsh-pray-level-buy' },
          level.unlocked
            ? h(
                React.Fragment,
                null,
                h('div', { className: 'dsh-pray-level-cost' }, `${t('cost')} ×1 `, h('b', null, formatNumber(level.cost1, notation))),
                h('div', { className: 'dsh-pray-level-cost' }, `${t('cost')} ×10 `, h('b', null, cost10)),
                h(
                  'div',
                  { className: 'dsh-pray-actions' },
                  h('button', { className: 'dsh-pray-btn primary', disabled: !level.canBuy1 || busy, onClick: () => run({ type: 'buyLevel', id: level.id, count: 1 }) }, t('buy1')),
                  h('button', { className: 'dsh-pray-btn', disabled: !level.canBuy10 || busy, onClick: () => run({ type: 'buyLevel', id: level.id, count: 10 }) }, t('buy10')),
                  h('button', { className: 'dsh-pray-btn', disabled: busy, onClick: () => run({ type: 'buyLevel', id: level.id, count: 'max' }) }, t('max')),
                ),
              )
            : h('div', { className: 'dsh-pray-locked' }, localize(t, 'locked', { at: formatNumber(level.unlockAt, notation) })),
        ),
      )
    }

    function PrayPage(props) {
      const t = makeT(props)
      const { state, error, busy, act, reload } = usePrayState(1000)
      const [tab, setTab] = useState('overview')
      const [confirmRelease, setConfirmRelease] = useState(false)
      const [confirmReset, setConfirmReset] = useState(null)
      const [notice, setNotice] = useState(null)
      const [celebrate, setCelebrate] = useState(null)
      const animated = useAnimatedNumber(state?.expectation ?? 0, state?.expectationPerSecond ?? 0, 80)

      const notation = state?.settings?.notation || 'auto'
      const now = Date.now()
      const seconds = state?.latestUpdate
        ? Math.max(0, Math.floor((now - Date.parse(`${state.latestUpdate}T00:00:00+08:00`)) / 1000))
        : state?.secondsSinceUpdate ?? null

      const run = async (body) => {
        setNotice(null)
        setConfirmReset(null)
        const result = await act(body)
        if (result?.ok && body.type === 'release') {
          const gain = result.result?.gain ?? 0
          setNotice(localize(t, 'releaseDone', { n: gain }))
          setConfirmRelease(false)
          setCelebrate({ gain })
          setTimeout(() => setCelebrate(null), 2800)
        } else if (result?.ok && body.type === 'boost') {
          setNotice(t('boostDone'))
        } else if (result?.ok && body.type === 'galaxy') {
          setNotice(t('galaxyDone'))
        }
      }

      if (!state) {
        return h(
          'div',
          { className: 'dsh-pray-page' },
          h('style', null, CSS),
          h(
            'div',
            { className: 'dsh-pray-page-inner' },
            h('div', { className: 'dsh-pray-page-title' }, t('panelLabel')),
            h('div', { className: 'dsh-pray-note' }, error || t('loading')),
            error ? h('button', { className: 'dsh-pray-btn', style: { marginTop: 12 }, onClick: reload }, t('retry')) : null,
          ),
        )
      }

      const tabs = ['overview', 'levels', 'wish', 'release', 'eras', 'settings']
      const tabLabels = {
        overview: t('tabOverview'),
        levels: t('tabLevels'),
        wish: t('tabWish'),
        release: t('tabRelease'),
        eras: t('tabEras'),
        settings: t('tabSettings'),
      }
      const highest = state.highestLevel
      const next = state.nextLevel
      const progress = Math.round((next?.progress ?? 1) * 100)
      const levels = state.levels || []
      const runAmps = state.runAmps || []
      const permanentAmps = state.permanentAmps || []
      const level5 = levels[4]
      const canBoost = state.canBoost
      const canGalaxy = state.canGalaxy

      const renderOverview = () => h(
        React.Fragment,
        null,
        h(
          'div',
          { className: 'dsh-pray-grid' },
          h(StatCard, { label: t('expectation'), value: formatNumber(animated, notation), note: `${t('perSecond')} +${formatNumber(state.expectationPerSecond, notation)}`, accent: true }),
          h(StatCard, { label: t('wish'), value: formatNumber(state.wish, notation), note: `${t('today')} ${formatNumber(state.activity.todayWish, notation)}/${formatNumber(state.dailyCap, notation)}` }),
          h(StatCard, { label: t('release'), value: formatNumber(state.release, notation), note: `${t('releaseMultiplier')} ×${state.releaseMultiplier.toFixed(2)}` }),
          h(StatCard, { label: t('highestLevel'), value: `L${highest.index} · ${highest.name}`, note: next ? `${t('nextLevel')} L${next.index} · ${progress}%` : t('noNextUnlock'), small: true }),
        ),
        level5?.unlocked && level5.image
          ? h(
              'div',
              { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
              h('div', { className: 'dsh-pray-cardtitle' }, t('level5')),
              h('img', { className: 'dsh-pray-realmimg', src: '/dsh-pray/asset/realm-5', alt: t('level5') }),
            )
          : null,
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
          h('div', { className: 'dsh-pray-cardtitle' }, t('nextUnlock')),
          h('div', { className: 'dsh-pray-value small' }, next ? `L${next.index} · ${next.name} · ${formatNumber(next.at, notation)}` : t('noNextUnlock')),
          h('div', { className: 'dsh-pray-progress' }, h('div', { className: 'dsh-pray-progress-fill', style: { width: `${Math.max(2, progress)}%` } })),
          h(
            'div',
            { className: 'dsh-pray-row' },
            h('span', { className: 'dsh-pray-note' }, `${t('waitBonus')} ×${state.waitMultiplier.toFixed(2)}`),
            h('span', { className: 'dsh-pray-note' }, `${t('boost')} ×${state.boostMultiplier.toFixed(2)} · ${t('galaxy')} ×${state.galaxyMultiplier.toFixed(2)}`),
          ),
        ),
        h(
          'div',
          { className: 'dsh-pray-grid-wide', style: { marginTop: 12 } },
          h(
            'div',
            { className: 'dsh-pray-panelcard' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('activity')),
            h(
              'div',
              { className: 'dsh-pray-grid', style: { marginTop: 10, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } },
              h('div', null, h('div', { className: 'dsh-pray-note' }, t('sessions')), h('div', { className: 'dsh-pray-mono' }, state.activity.sessions)),
              h('div', null, h('div', { className: 'dsh-pray-note' }, t('turns')), h('div', { className: 'dsh-pray-mono' }, state.activity.turns)),
              h('div', null, h('div', { className: 'dsh-pray-note' }, t('active')), h('div', { className: 'dsh-pray-mono' }, formatActive(state.activity.activeSeconds, t))),
              h('div', null, h('div', { className: 'dsh-pray-note' }, t('streak')), h('div', { className: 'dsh-pray-mono' }, `${state.activity.streak}${t('days')}`)),
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-panelcard' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('versionUpdate')),
            h('div', { className: 'dsh-pray-value small' }, state.latestUpdate || '—'),
            h('div', { className: 'dsh-pray-note' }, state.latestHeadings?.join(' · ') || ''),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, formatDuration(seconds, t)), h('span', { className: 'dsh-pray-tag' }, state.changelogOk ? 'online' : t('offline'))),
            state.lastOffline
              ? h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } },
                  `离线 ${formatDuration(state.lastOffline.actualSeconds, t, true)}，结算 ${formatNumber(state.lastOffline.gained, notation)}${state.lastOffline.capped ? '（已封顶）' : ''}`)
              : null,
          ),
        ),
      )

      const renderLevels = () => h(
        React.Fragment,
        null,
        h(
          'div',
          { className: 'dsh-pray-grid' },
          h(
            'div',
            { className: 'dsh-pray-panelcard accent' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('boost')),
            h('div', { className: 'dsh-pray-boost-value' }, `×${state.boostMultiplier.toFixed(2)}`),
            h('div', { className: 'dsh-pray-note' }, t('boostDesc')),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('boosts')), h('span', { className: 'dsh-pray-mono' }, state.boosts)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('boostCost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.boostCost, notation))),
            h(
              'div',
              { className: 'dsh-pray-boost-actions' },
              confirmReset === 'boost'
                ? h(React.Fragment, null,
                    h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'boost' }) }, t('resetWarning')),
                    h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                  )
                : h('button', { className: 'dsh-pray-btn warn', disabled: !canBoost || busy, onClick: () => setConfirmReset('boost') }, t('boostButton')),
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-panelcard accent' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('galaxy')),
            h('div', { className: 'dsh-pray-boost-value' }, `×${state.galaxyMultiplier.toFixed(2)}`),
            h('div', { className: 'dsh-pray-note' }, t('galaxyDesc')),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('galaxies')), h('span', { className: 'dsh-pray-mono' }, state.galaxies)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, localize(t, 'galaxyRequires', { n: state.galaxyRequiredBoosts })), h('span', { className: 'dsh-pray-mono' }, `${state.boosts}/${state.galaxyRequiredBoosts}`)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('galaxyCost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.galaxyCost, notation))),
            h(
              'div',
              { className: 'dsh-pray-boost-actions' },
              confirmReset === 'galaxy'
                ? h(React.Fragment, null,
                    h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'galaxy' }) }, t('resetWarning')),
                    h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                  )
                : h('button', { className: 'dsh-pray-btn warn', disabled: !canGalaxy || busy, onClick: () => setConfirmReset('galaxy') }, t('galaxyButton')),
            ),
          ),
        ),
        h('div', { className: 'dsh-pray-cardtitle', style: { margin: '18px 0 8px' } }, t('levels')),
        h('div', { className: 'dsh-pray-levels' }, levels.map((level) => h(LevelRow, {
          key: level.id,
          level,
          state,
          t,
          notation,
          busy,
          run,
        }))),
        level5?.image
          ? h(
              'div',
              { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
              h('div', { className: 'dsh-pray-cardtitle' }, t('level5')),
              h('img', { className: 'dsh-pray-realmimg', src: '/dsh-pray/asset/realm-5', alt: t('level5') }),
              !level5.unlocked
                ? h('div', { className: 'dsh-pray-locked', style: { textAlign: 'center', marginTop: 6 } }, localize(t, 'locked', { at: formatNumber(level5.unlockAt, notation) }))
                : null,
            )
          : null,
        h('div', { className: 'dsh-pray-cardtitle', style: { margin: '18px 0 8px' } }, t('runAmps')),
        h(
          'div',
          { className: 'dsh-pray-grid' },
          runAmps.map((amp) => h(
            'div',
            { className: 'dsh-pray-panelcard', key: amp.id },
            h('div', { style: { fontWeight: 600 } }, amp.name),
            h('div', { className: 'dsh-pray-note' }, amp.effect),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('level')), h('span', { className: 'dsh-pray-mono' }, amp.level)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('cost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(amp.cost, notation))),
            h('div', { className: 'dsh-pray-actions' }, h('button', { className: 'dsh-pray-btn primary', disabled: !amp.canBuy || busy, onClick: () => run({ type: 'buyRunAmp', id: amp.id }) }, t('buy'))),
          )),
        ),
      )

      const renderWish = () => h(
        React.Fragment,
        null,
        h(
          'div',
          { className: 'dsh-pray-grid' },
          h(StatCard, { label: t('wish'), value: formatNumber(state.wish, notation), note: `${t('today')} ${formatNumber(state.activity.todayWish, notation)}/${formatNumber(state.dailyCap, notation)}` }),
          h(StatCard, { label: t('dailyCap'), value: formatNumber(state.dailyCap, notation), note: t('wishSources') }),
          h(StatCard, { label: t('sessions'), value: state.activity.sessions, note: `${t('turns')} ${state.activity.turns}` }),
          h(StatCard, { label: t('active'), value: formatActive(state.activity.activeSeconds, t), note: `${t('streak')} ${state.activity.streak}${t('days')}` }),
        ),
        h('div', { className: 'dsh-pray-note', style: { margin: '12px 0' } }, t('wishSources')),
        h('div', { className: 'dsh-pray-cardtitle', style: { marginBottom: 8 } }, t('permanentAmps')),
        h(
          'div',
          { className: 'dsh-pray-grid' },
          permanentAmps.map((amp) => h(
            'div',
            { className: 'dsh-pray-panelcard', key: amp.id },
            h('div', { style: { fontWeight: 600 } }, amp.name),
            h('div', { className: 'dsh-pray-note' }, amp.effect),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('level')), h('span', { className: 'dsh-pray-mono' }, amp.level)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('cost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(amp.cost, notation))),
            h('div', { className: 'dsh-pray-actions' }, h('button', { className: 'dsh-pray-btn primary', disabled: !amp.canBuy || busy, onClick: () => run({ type: 'buyPermanentAmp', id: amp.id }) }, t('buy'))),
          )),
        ),
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
          h('div', { className: 'dsh-pray-cardtitle' }, t('tokens')),
          h('div', { className: 'dsh-pray-value small' }, formatNumber(state.activity.tokens, notation)),
          h('div', { className: 'dsh-pray-note' }, '只进档案，不产生愿力。'),
          h('div', { className: 'dsh-pray-note' }, `${t('toolCalls')} ${state.activity.toolCalls}`),
        ),
      )

      const renderRelease = () => h(
        React.Fragment,
        null,
        h(
          'div',
          { className: 'dsh-pray-grid-wide' },
          h(
            'div',
            { className: 'dsh-pray-panelcard accent' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('releaseTitle')),
            h('div', { className: 'dsh-pray-value' }, formatNumber(state.releaseGain, notation)),
            h('div', { className: 'dsh-pray-note' }, t('releaseDesc')),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('releaseThreshold')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.releaseThreshold, notation))),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('releaseMultiplier')), h('span', { className: 'dsh-pray-mono' }, `×${state.releaseMultiplier.toFixed(2)}`)),
            h('div', { className: 'dsh-pray-note', style: { marginTop: 10 } }, t('releaseCostNote')),
            h(
              'div',
              { className: 'dsh-pray-actions' },
              !state.canRelease
                ? h('button', { className: 'dsh-pray-btn', disabled: true }, t('cannotRelease'))
                : confirmRelease
                  ? h(React.Fragment, null,
                      h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'release' }) }, t('releaseConfirm')),
                      h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmRelease(false) }, t('releaseCancel')),
                    )
                  : h('button', { className: 'dsh-pray-btn warn', onClick: () => setConfirmRelease(true) }, t('releaseButton')),
            ),
            notice ? h('div', { className: 'dsh-pray-note', style: { marginTop: 10, color: 'var(--dsw-alias-state-success-primary)' } }, notice) : null,
          ),
          h(
            'div',
            { className: 'dsh-pray-panelcard' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('releaseBalance')),
            h('div', { className: 'dsh-pray-value' }, formatNumber(state.release, notation)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('releaseMultiplier')), h('span', { className: 'dsh-pray-mono' }, `×${state.releaseMultiplier.toFixed(2)}`)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('expectation')), h('span', { className: 'dsh-pray-mono' }, formatNumber(animated, notation))),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('boost')), h('span', { className: 'dsh-pray-mono' }, state.boosts)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('galaxy')), h('span', { className: 'dsh-pray-mono' }, state.galaxies)),
            h('div', { className: 'dsh-pray-note', style: { marginTop: 10 } }, `${t('wish')} 不重置；${t('activity')} 不重置。`),
          ),
        ),
      )

      const renderEras = () => h(
        'div',
        { className: 'dsh-pray-panelcard' },
        h('div', { className: 'dsh-pray-cardtitle' }, t('eras')),
        state.eras?.length
          ? h('div', { className: 'dsh-pray-list', style: { marginTop: 10 } }, [...state.eras].reverse().map((era) => h(
              'div',
              { className: 'dsh-pray-era', key: `${era.date}-${era.seenAt}` },
              h('div', { className: 'dsh-pray-era-date' }, era.date),
              h('div', { className: 'dsh-pray-note' }, (era.headings || []).join(' · ')),
            )))
          : h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('erasEmpty')),
        h('div', { className: 'dsh-pray-row', style: { marginTop: 12 } }, h('span', { className: 'dsh-pray-note' }, t('versionUpdate')), h('span', { className: 'dsh-pray-mono' }, state.latestUpdate || '—')),
        state.versionBonusActive ? h('div', { className: 'dsh-pray-note', style: { marginTop: 6, color: 'var(--dsw-alias-state-success-primary)' } }, `${t('versionBonus')} ×${state.versionMultiplier.toFixed(2)}`) : null,
      )

      const renderSettings = () => h(
        'div',
        { className: 'dsh-pray-grid' },
        h(
          'div',
          { className: 'dsh-pray-panelcard' },
          h('div', { className: 'dsh-pray-cardtitle' }, t('notation')),
          h('select', {
            className: 'dsh-pray-select',
            value: notation,
            onChange: (event) => run({ type: 'setNotation', notation: event.target.value }),
            style: { marginTop: 8 },
          },
            h('option', { value: 'auto' }, t('notationAuto')),
            h('option', { value: 'standard' }, t('notationStandard')),
            h('option', { value: 'scientific' }, t('notationScientific')),
            h('option', { value: 'engineering' }, t('notationEngineering')),
            h('option', { value: 'letters' }, t('notationLetters')),
          ),
        ),
        h(
          'div',
          { className: 'dsh-pray-panelcard' },
          h('div', { className: 'dsh-pray-cardtitle' }, t('privacyTitle')),
          h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('privacyText')),
          h('div', { className: 'dsh-pray-actions' },
            h('a', { className: 'dsh-pray-link', href: '/dsh-pray/export' }, t('export')),
            h('button', {
              type: 'button',
              className: 'dsh-pray-btn',
              onClick: () => {
                setCelebrate({ gain: 1 })
                setTimeout(() => setCelebrate(null), 2800)
              },
            }, t('previewEffect')),
          ),
        ),
      )

      const particles = celebrate
        ? Array.from({ length: 18 }, (_, index) => h('span', {
            key: index,
            className: 'dsh-pray-particle',
            style: {
              left: `${8 + ((index * 37) % 84)}%`,
              animationDelay: `${(index % 6) * 0.07}s`,
              '--dsh-pray-dx': `${(index % 2 ? 1 : -1) * (8 + (index % 5) * 24)}px`,
            },
          }))
        : null

      return h(
        'div',
        { className: 'dsh-pray-page' },
        h('style', null, CSS),
        celebrate
          ? h(
              'div',
              { className: 'dsh-pray-celebrate' },
              h('div', { className: 'dsh-pray-celebrate-text' }, '释怀'),
              h('div', { className: 'dsh-pray-celebrate-gain' }, `+${formatNumber(celebrate.gain, notation)}`),
              particles,
            )
          : null,
        h(
          'div',
          { className: 'dsh-pray-page-inner' },
          h(
            'div',
            { className: 'dsh-pray-page-head' },
            h(
              'div',
              null,
              h('div', { className: 'dsh-pray-page-title' }, t('panelLabel')),
              h('div', { className: 'dsh-pray-page-level' }, `Level ${highest.index} · ${highest.name}`),
              h('div', { className: 'dsh-pray-page-sub' }, `${t('expectation')} ${formatNumber(animated, notation)} · ${t('perSecond')} +${formatNumber(state.expectationPerSecond, notation)} · ${t('wish')} ${formatNumber(state.wish, notation)}`),
            ),
            h('div', { className: 'dsh-pray-note', style: { textAlign: 'right' } },
              h('div', null, state.latestUpdate || '—'),
              h('div', null, formatDuration(seconds, t)),
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-tabs' },
            tabs.map((key) => h(
              'button',
              {
                key,
                type: 'button',
                className: `dsh-pray-tab${tab === key ? ' active' : ''}`,
                onClick: () => { setTab(key); setConfirmRelease(false); setConfirmReset(null) },
              },
              tabLabels[key] || key,
            )),
          ),
          error ? h('div', { className: 'dsh-pray-error' }, `${t('error')}: ${error}`) : null,
          tab === 'overview' ? renderOverview() : null,
          tab === 'levels' ? renderLevels() : null,
          tab === 'wish' ? renderWish() : null,
          tab === 'release' ? renderRelease() : null,
          tab === 'eras' ? renderEras() : null,
          tab === 'settings' ? renderSettings() : null,
        ),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => {
          const disposers = Object.entries(DICT).map(([locale, dict]) => ctx.locale.register(NS, locale, dict))
          return () => { for (const dispose of disposers) dispose() }
        })

        ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'dsh-pray',
          order: 30,
          label: '期待',
        }, PanelIcon)))

        ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: 'dsh-pray',
          locale: NS,
        }, PrayPage)))

        ctx.effect(() => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'dsh-pray',
          order: 900,
          locale: NS,
        }, PrayCard)))
      },
    }
  },
})
