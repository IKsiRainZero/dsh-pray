window.__ModuleLoader__.load({
  id: 'dsh-pray',
  factory(require) {
    const React = require('react')
    const { useCallback, useEffect, useMemo, useRef, useState } = React
    const h = React.createElement

    const NS = 'dshPray'
    const CARD_VIEW_KEY = 'dsh-pray-card-view-v2'
    const NOTICE_KEY = 'dsh-pray-notice-v1'
    const DICT = {
      zh: {
        title: 'dsh-pray · 期待',
        panelLabel: '期待',
        kicker: '本地单机 · 注意力保护',
        collapse: '收成小火苗',
        hide: '关闭（侧栏可恢复）',
        closeCard: '关闭',
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
        readyUrge: '可催更',
        readyLaunch: '可发版',
        waiting: '等待 Host…',
        loading: '正在读取本地状态…',
        error: '连接失败',
        retry: '重试',
        offline: '更新日志离线（缓存）',
        versionBonus: '版本红利',
        waitBonus: '等待加成',
        modeAutoTag: '自动',
        modePlayTag: '手动',
        tabLevel: 'Level',
        tabWish: '愿力',
        tabRelease: '释怀',
        tabStory: '故事',
        tabSettings: '设置',
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
        multiplierShort: '增幅',
        production: '速度',
        cost: '成本',
        buy: '购买',
        buy1: '+1',
        buy10: '+10',
        max: 'MAX',
        locked: '累计期待 {at} 解锁',
        notEnough: '不够',
        habits: '长期习惯',
        term: '层内注脚',
        openCodex: '读注脚',
        closeCodex: '收起注脚',
        termUse: '怎么用',
        softcap: '吞吐上限',
        softcapNote: '每层产出有吞吐上限，速度会自然饱和；期待本身没有硬上限。释怀门槛仍是 1e12。',
        permanentBonus: '永久加成',
        temporaryBonus: '临时加成',
        totalMultiplier: '总倍率',
        urge: '催更',
        launch: '发版',
        urgeDesc: '全局重置：清空所有 Level，换每层 +2% 永久加法加成（发版时清空催更层）。',
        launchDesc: '重置催更：清空催更和所有 Level，换每层 +5% 永久加法加成。',
        urges: '催更次数',
        launches: '发版次数',
        urgeCost: '催更成本',
        launchCost: '发版成本',
        launchRequires: '需要 {n} 次催更',
        urgeButton: '催更（重置 Level）',
        launchButton: '发版（重置催更）',
        resetWarning: '再点一次确认：这会清空本轮的 Level。',
        confirm: '确认',
        cancel: '取消',
        urgeDone: '催更完成，获得 ×1.5 全局倍率。',
        launchDone: '发版完成，获得 ×2 全局倍率。',
        releaseTitle: '释怀',
        releaseDesc: '这一轮不再更多增长期待，主动结束并换成永久倍率。',
        releaseGain: '预计获得',
        releaseThreshold: '门槛',
        releaseButton: '释怀这一轮',
        releaseConfirm: '再点一次确认：期待、Level、催更、发版会重置；愿力、释怀、档案保留。',
        releaseCancel: '取消',
        releaseBalance: '释怀',
        releaseMultiplier: '永久倍率',
        cannotRelease: '本轮累计期待还不够',
        releaseDone: '已释怀，获得 {n} 点释怀。',
        releaseCostNote: '释怀会重置期待、Level、催更和发版；愿力不重置。',
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
        versionUpdate: '最近更新',
        activeHours: '小时',
        minutes: '分钟',
        seconds: '秒',
        days: '天',
        previewEffect: '预览释怀特效',
        mode: '模式',
        modeAttention: '注意力保护',
        modePlay: '游玩模式',
        modeAttentionDesc: '自动买 Level；不自动催更/发版/释怀，到可释怀时会暂停购买。右下角只留一簇小火苗，鼠标停留才展开简要面板。',
        modePlayDesc: '手动购买；适合想认真玩一会儿的时候。',
        autoBuying: '自动购买中 · 不自动重置',
        autoPaused: '自动购买已暂停：本轮已可释怀，先把决定留给你。',
        resetRun: '重开本轮',
        resetRunNote: '保留愿力、释怀、成就、档案；清空本轮期待、Level、催更/发版。',
        resetRunConfirm: '再点一次确认：本轮进度会清空，愿力/释怀/成就保留。',
        resetRunDone: '本轮已重开。',
        repairState: '修复存档',
        repairStateNote: '重置释怀倍率和本轮进度；保留愿力、成就、档案。',
        repairStateConfirm: '再点一次确认：释怀倍率会归零，成就/愿力保留。',
        repairStateDone: '存档已修复。',
        anomalyTitle: '数值异常',
        anomalyDesc: '检测到本轮数值已经失衡（旧版自动购买跑飞）。建议重开本轮；愿力、释怀、成就保留。',
        switchToPlay: '切到游玩模式',
        switchToAttention: '切到注意力保护',
        cardVisible: '右下角',
        cardShow: '展开完整卡片',
        cardHide: '收成小火苗',
        flameHint: '点一下展开',
        cardViewNote: '完整卡片、一簇小火苗，或者关闭；关闭后可在侧栏页头/设置重新打开。',
        noticeTitle: '首先',
        noticeBody: 'dsh-pray 是一个本地单机小游戏，想做的只是把「等待 DeepSeek 更新」和「你真实用 DSH 的时间」变成一点可见的积累。',
        noticeAttention: '我们无意占据你的注意力，但它仍然可能让你想多看一眼数字——这是它的风险。默认的注意力保护模式会自动买 Level；右下角是完整卡片，可点 − 收成小火苗，或点 × 关闭，之后从侧栏页头/设置重新打开。',
        noticePrivacy: '它只读会话数、完成轮数、活跃时长这些数字，不读聊天内容；所有数据只在本机。',
        noticeChooseAttention: '用注意力保护模式',
        noticeChoosePlay: '我想手动玩',
        noticeLater: '先隐藏卡片，之后再选',
        storyTitle: '故事',
        storyLocked: '解锁 Level {n} 后展开',
        storyChapter: '第 {n} 章',
        achievements: '成就',
        achievementReward: '永久 +{n}% 全局产出',
        achievementLocked: '未解锁',
        achievementUnlocked: '已解锁',
        noAchievements: '还没有成就，慢慢来。',
        autoOn: '自动购买',
        autoOff: '手动购买',
      },
      en: {
        title: 'dsh-pray · Expectation',
        panelLabel: 'Expectation',
        kicker: 'local single-player · attention protection',
        collapse: 'Collapse to flame',
        hide: 'Close (restore in sidebar)',
        closeCard: 'Close',
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
        readyUrge: 'Urge ready',
        readyLaunch: 'Launch ready',
        waiting: 'Waiting for Host…',
        loading: 'Reading local state…',
        error: 'Connection failed',
        retry: 'Retry',
        offline: 'changelog offline (cached)',
        versionBonus: 'Version bonus',
        waitBonus: 'Waiting bonus',
        modeAutoTag: 'auto',
        modePlayTag: 'manual',
        tabLevel: 'Level',
        tabWish: 'Wish',
        tabRelease: 'Let go',
        tabStory: 'Story',
        tabSettings: 'Settings',
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
        multiplierShort: 'mult',
        production: 'Speed',
        cost: 'Cost',
        buy: 'Buy',
        buy1: '+1',
        buy10: '+10',
        max: 'MAX',
        locked: 'Unlocks at {at} lifetime expectation',
        notEnough: 'not enough',
        habits: 'Permanent habits',
        term: 'Level note',
        openCodex: 'Read note',
        closeCodex: 'Hide note',
        termUse: 'How to use it',
        softcap: 'Throughput ceiling',
        softcapNote: 'Each level has a throughput ceiling, so speed naturally saturates; expectation itself has no hard cap. The release threshold stays 1e12.',
        permanentBonus: 'Permanent bonus',
        temporaryBonus: 'Temporary bonus',
        totalMultiplier: 'Total multiplier',
        urge: 'Urge',
        launch: 'Launch',
        urgeDesc: 'Global reset: clears all levels for +2% permanent additive per urge (the urge layer clears on launch).',
        launchDesc: 'Reset of urges: clears urges and all levels for +5% permanent additive per launch.',
        urges: 'Urges',
        launches: 'Launches',
        urgeCost: 'Urge cost',
        launchCost: 'Launch cost',
        launchRequires: 'Requires {n} urges',
        urgeButton: 'Urge (reset levels)',
        launchButton: 'Launch (reset urges)',
        resetWarning: 'Click again to confirm: this clears this run’s levels.',
        confirm: 'Confirm',
        cancel: 'Cancel',
        urgeDone: 'Urge complete: ×1.5 global.',
        launchDone: 'Launch complete: ×2 global.',
        releaseTitle: 'Let go',
        releaseDesc: 'Stop growing expectation for this run, end it, and turn it into a permanent multiplier.',
        releaseGain: 'Gain',
        releaseThreshold: 'Threshold',
        releaseButton: 'Let go of this run',
        releaseConfirm: 'Click again to confirm: expectation, levels, urges, and launches reset; wish power, release, and archive stay.',
        releaseCancel: 'Cancel',
        releaseBalance: 'Release',
        releaseMultiplier: 'Permanent multiplier',
        cannotRelease: 'Not enough lifetime expectation this run',
        releaseDone: 'Released; gained {n}.',
        releaseCostNote: 'Letting go resets expectation, levels, urges, and launches; wish power stays.',
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
        versionUpdate: 'Latest update',
        activeHours: 'h',
        minutes: 'm',
        seconds: 's',
        days: 'd',
        previewEffect: 'Preview release effect',
        mode: 'Mode',
        modeAttention: 'Attention protection',
        modePlay: 'Play mode',
        modeAttentionDesc: 'Automatically buys levels; never auto-resets. It pauses buying when this run can let go. The bottom-right stays as a small flame; hover for a brief panel.',
        modePlayDesc: 'Manual purchases; for when you want to play for a bit.',
        autoBuying: 'Auto-buying · no auto-reset',
        autoPaused: 'Auto-buy paused: this run can already let go; the decision is yours.',
        resetRun: 'Start a fresh run',
        resetRunNote: 'Keeps wish power, release, achievements, and archive; clears this run’s expectation, levels, urges, and launches.',
        resetRunConfirm: 'Click again: this run’s progress clears; wish power, release, and achievements stay.',
        resetRunDone: 'Fresh run started.',
        repairState: 'Repair save',
        repairStateNote: 'Resets the release multiplier and this run; keeps wish power, achievements, and archive.',
        repairStateConfirm: 'Click again: the release multiplier goes to zero; achievements and wish power stay.',
        repairStateDone: 'Save repaired.',
        anomalyTitle: 'Numbers out of range',
        anomalyDesc: 'This run’s numbers are out of balance (the old auto-buy ran away). Start a fresh run; wish power, release, and achievements stay.',
        switchToPlay: 'Switch to play mode',
        switchToAttention: 'Switch to attention protection',
        cardVisible: 'Bottom-right',
        cardShow: 'Expand full card',
        cardHide: 'Collapse to flame',
        flameHint: 'Click to expand',
        cardViewNote: 'Full card, small flame, or closed; reopen from the sidebar header/settings.',
        noticeTitle: 'First',
        noticeBody: 'dsh-pray is a local single-player game. It only turns “waiting for a DeepSeek update” and “time you actually spend in DSH” into a small visible accumulation.',
        noticeAttention: 'We do not intend to take your attention, but it can still make you want one more look at the numbers — that is the risk. The default attention-protection mode buys levels automatically; the bottom-right starts as the full card. Use − for the flame, × to close, and reopen from the sidebar header/settings.',
        noticePrivacy: 'It only reads session counts, completed turns, and active time, never your chats; all data stays local.',
        noticeChooseAttention: 'Use attention protection',
        noticeChoosePlay: 'I want to play manually',
        noticeLater: 'Hide the card for now',
        storyTitle: 'Story',
        storyLocked: 'Unlocks after Level {n}',
        storyChapter: 'Chapter {n}',
        achievements: 'Achievements',
        achievementReward: 'Permanent +{n}% global output',
        achievementLocked: 'Locked',
        achievementUnlocked: 'Unlocked',
        noAchievements: 'No achievements yet. Take your time.',
        autoOn: 'Auto-buy',
        autoOff: 'Manual',
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
      .dsh-pray-head-actions { display: flex; gap: 2px; }
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
      .dsh-pray-flame-root { position: fixed; right: 18px; bottom: 18px; z-index: 2147482000; pointer-events: auto; }
      .dsh-pray-flame-btn { position: relative; width: 46px; height: 46px; border: 0; border-radius: 50%;
        background: color-mix(in srgb, var(--dsw-alias-bg-overlay) 82%, transparent); cursor: pointer;
        display: grid; place-items: center; color: var(--dsw-alias-brand-primary);
        box-shadow: 0 8px 30px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 26%, transparent); }
      .dsh-pray-flame-btn:hover { background: var(--dsw-alias-bg-overlay); }
      .dsh-pray-flame-dot { position: absolute; right: 10px; bottom: 9px; width: 5px; height: 5px; border-radius: 50%;
        background: var(--dsw-alias-state-success-primary); box-shadow: 0 0 8px var(--dsw-alias-state-success-primary); }
      .dsh-pray-flame-panel { position: absolute; right: 0; bottom: 54px; width: 226px; box-sizing: border-box;
        background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; padding: 10px;
        box-shadow: 0 16px 44px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent); }
      .dsh-pray-flame-panel-head { display: flex; justify-content: space-between; gap: 8px; align-items: baseline;
        font-size: 16px; font-weight: 650; }
      .dsh-pray-flame-panel-row { display: flex; justify-content: space-between; gap: 8px; margin-top: 5px; font-size: 11px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-flame-hint { margin-top: 8px; font-size: 10px; color: var(--dsw-alias-brand-primary); text-align: right; }
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
      .dsh-pray-page-level { margin-top: 2px; color: var(--dsw-alias-brand-primary); font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }
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
      .dsh-pray-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
      .dsh-pray-levels { display: flex; flex-direction: column; gap: 8px; }
      .dsh-pray-level-row { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; gap: 12px; align-items: center;
        padding: 11px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1); }
      .dsh-pray-level-row.locked { opacity: .52; }
      .dsh-pray-level-badge { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px;
        border-radius: 10px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-brand-primary); font-weight: 700; font-size: 18px; }
      .dsh-pray-level-main { min-width: 0; }
      .dsh-pray-level-name { font-size: 14px; font-weight: 650; overflow-wrap: anywhere; }
      .dsh-pray-level-stats { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 4px; font-size: 10px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-level-stats b { color: var(--dsw-alias-label-primary); font-weight: 600; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .dsh-pray-level-buy { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
      .dsh-pray-level-cost { font-size: 10px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
      .dsh-pray-level-cost b { color: var(--dsw-alias-label-primary); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .dsh-pray-level-term { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
      .dsh-pray-term-badge { display: inline-flex; align-items: center; border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px; padding: 1px 8px; font-size: 9px; color: var(--dsw-alias-brand-primary); }
      .dsh-pray-codex { margin-top: 8px; padding: 10px; border-left: 2px solid var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-bg-layer-2); border-radius: 0 8px 8px 0; }
      .dsh-pray-codex-title { font-weight: 650; font-size: 12px; margin-bottom: 4px; }
      .dsh-pray-codex-use { color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.6; margin-top: 6px; }
      .dsh-pray-locked { color: var(--dsw-alias-state-warn-primary); font-size: 11px; text-align: right; }
      .dsh-pray-reset-value { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 22px; font-weight: 700; }
      .dsh-pray-reset-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
      .dsh-pray-progress { height: 6px; border-radius: 999px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; margin-top: 8px; }
      .dsh-pray-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); }
      .dsh-pray-list { display: flex; flex-direction: column; gap: 8px; }
      .dsh-pray-era { border-left: 2px solid var(--dsw-alias-brand-primary); padding: 4px 0 4px 10px; }
      .dsh-pray-era-date { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-error { margin-top: 10px; font-size: 11px; color: var(--dsw-alias-state-error-primary); word-break: break-word; }
      .dsh-pray-select { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 5px 8px; font: inherit; font-size: 12px; }
      .dsh-pray-link { color: var(--dsw-alias-brand-primary); text-decoration: none; }
      .dsh-pray-link:hover { text-decoration: underline; }
      .dsh-pray-modebar { display: flex; align-items: center; justify-content: space-between; gap: 12px;
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 10px 12px; margin-bottom: 12px;
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 7%, var(--dsw-alias-bg-layer-1)); }
      .dsh-pray-modebar strong { color: var(--dsw-alias-brand-primary); }
      .dsh-pray-chapter { border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; padding: 14px; background: var(--dsw-alias-bg-layer-1); }
      .dsh-pray-chapter.locked { opacity: .55; }
      .dsh-pray-chapter-title { font-size: 15px; font-weight: 650; margin-bottom: 4px; }
      .dsh-pray-achievements { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 8px; }
      .dsh-pray-achievement { border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 10px; background: var(--dsw-alias-bg-layer-1); }
      .dsh-pray-achievement.locked { opacity: .55; }
      .dsh-pray-achievement-name { font-weight: 600; }
      .dsh-pray-achievement-reward { color: var(--dsw-alias-state-success-primary); font-size: 10px; }

      .dsh-pray-notice { position: fixed; inset: 0; z-index: 2147483000; display: flex; align-items: center; justify-content: center;
        background: color-mix(in srgb, var(--dsw-alias-bg-base) 60%, transparent); padding: 18px; }
      .dsh-pray-notice-card { width: min(560px, 100%); max-height: 86vh; overflow: auto; box-sizing: border-box;
        background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 16px; padding: 20px;
        box-shadow: 0 24px 80px color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent); }
      .dsh-pray-notice-title { font-size: 18px; font-weight: 700; }
      .dsh-pray-notice-body { margin-top: 10px; color: var(--dsw-alias-label-secondary); line-height: 1.7; font-size: 12px; }
      .dsh-pray-notice-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

      .dsh-pray-celebrate { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;
        display: flex; align-items: center; justify-content: center; overflow: hidden;
        background: radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--dsw-alias-brand-primary) 26%, transparent), transparent 45%); }
      .dsh-pray-celebrate-text { font-size: 64px; font-weight: 800; letter-spacing: .08em;
        color: var(--dsw-alias-brand-primary); text-shadow: 0 0 40px color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);
        animation: dsh-pray-celebrate-pop .6s cubic-bezier(.2,.9,.2,1) both; }
      .dsh-pray-celebrate-gain { position: absolute; top: calc(50% + 54px); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 20px; color: var(--dsw-alias-state-success-primary); animation: dsh-pray-celebrate-fade 2.6s ease both; }
      .dsh-pray-particle { position: absolute; bottom: 34%; width: 7px; height: 7px; border-radius: 50%;
        background: var(--dsw-alias-state-warn-primary); opacity: 0; animation: dsh-pray-rise 1.8s ease-out forwards; }
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
        .dsh-pray-level-badge { width: 44px; height: 44px; }
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

    function getStoredBool(key, fallback) {
      try {
        const value = localStorage.getItem(key)
        return value == null ? fallback : value !== '0'
      } catch {
        return fallback
      }
    }

    function setStoredBool(key, value) {
      try { localStorage.setItem(key, value ? '1' : '0') } catch { /* ignore */ }
    }

    function getCardView() {
      try {
        const current = localStorage.getItem(CARD_VIEW_KEY)
        if (current === 'flame' || current === 'full' || current === 'hidden') return current
        return 'full'
      } catch {
        return 'full'
      }
    }

    function setCardView(view) {
      const next = view === 'flame' ? 'flame' : view === 'hidden' ? 'hidden' : 'full'
      try { localStorage.setItem(CARD_VIEW_KEY, next) } catch { /* ignore */ }
      try { window.dispatchEvent(new CustomEvent('dsh-pray-card-view', { detail: next })) } catch { /* ignore */ }
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
      if (abs < 1e6) return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n)
      const exp = Math.floor(Math.log10(abs))
      if (notation === 'standard') return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n)
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

    function FirstRunNotice(props) {
      const t = makeT(props)
      const [open, setOpen] = useState(() => !getStoredBool(NOTICE_KEY, false))
      const choose = async (mode) => {
        try {
          await fetch('/dsh-pray/action', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ type: 'setMode', mode }),
          })
        } catch { /* ignore */ }
        setStoredBool(NOTICE_KEY, true)
        setCardView('full')
        setOpen(false)
      }
      if (!open) return null
      return h(
        'div',
        { className: 'dsh-pray-notice' },
        h('style', null, CSS),
        h(
          'div',
          { className: 'dsh-pray-notice-card' },
          h('div', { className: 'dsh-pray-notice-title' }, t('noticeTitle')),
          h('div', { className: 'dsh-pray-notice-body' }, t('noticeBody')),
          h('div', { className: 'dsh-pray-notice-body' }, t('noticeAttention')),
          h('div', { className: 'dsh-pray-notice-body' }, t('noticePrivacy')),
          h(
            'div',
            { className: 'dsh-pray-notice-actions' },
            h('button', { type: 'button', className: 'dsh-pray-btn primary', onClick: () => choose('attention') }, t('noticeChooseAttention')),
            h('button', { type: 'button', className: 'dsh-pray-btn', onClick: () => choose('play') }, t('noticeChoosePlay')),
            h('button', { type: 'button', className: 'dsh-pray-btn ghost', onClick: () => choose('attention') }, t('noticeLater')),
          ),
        ),
      )
    }

    function PrayCard(props) {
      const t = makeT(props)
      const { state, error } = usePrayState(1000)
      const [now, setNow] = useState(() => Date.now())
      const animated = useAnimatedNumber(state?.expectation ?? 0, state?.expectationPerSecond ?? 0, 60)

      useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
      }, [])

      const notation = state?.settings?.notation || 'auto'
      const level = state?.highestLevel
      const next = state?.nextLevel
      const auto = state?.mode === 'attention'
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
            h('div', { className: 'dsh-pray-head' }, h('div', { className: 'dsh-pray-brand' }, flameIcon(18), h('div', { className: 'dsh-pray-title' }, t('title')))),
            h('div', { className: 'dsh-pray-label', style: { marginTop: 12 } }, error ? t('error') : t('loading')),
            error ? h('div', { className: 'dsh-pray-meta' }, error) : null,
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
            h('div', { className: 'dsh-pray-brand' }, flameIcon(18), h('div', null, h('div', { className: 'dsh-pray-title' }, t('title')), h('div', { className: 'dsh-pray-kicker' }, t('kicker')))),
            h(
              'div',
              { className: 'dsh-pray-head-actions' },
              h('button', { type: 'button', className: 'dsh-pray-icon', onClick: () => props.onCollapse?.(), title: t('collapse'), 'aria-label': t('collapse') }, '−'),
              h('button', { type: 'button', className: 'dsh-pray-icon', onClick: () => props.onClose?.(), title: t('hide'), 'aria-label': t('hide') }, '×'),
            ),
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
              h('span', { className: 'dsh-pray-tag' }, auto ? t('modeAutoTag') : t('modePlayTag')),
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
              h('span', { className: 'dsh-pray-level-name' }, level ? `L${level.index} · ${level.name}` : '—'),
              next ? h('span', { className: 'dsh-pray-level-next' }, `${t('nextLevel')} L${next.index} · ${progress}%`) : h('span', { className: 'dsh-pray-level-next' }, t('noNextUnlock')),
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
              state.canUrge ? h('div', { className: 'dsh-pray-tag good' }, t('readyUrge')) : null,
              state.canLaunch ? h('div', { className: 'dsh-pray-tag good' }, t('readyLaunch')) : null,
              h('div', null, t('detailHint')),
            ),
          ),
          error ? h('div', { className: 'dsh-pray-error' }, `${t('error')}: ${error}`) : null,
        ),
      )
    }

    function FlameCard(props) {
      const t = makeT(props)
      const { state } = usePrayState(1000)
      const [hover, setHover] = useState(false)
      const notation = state?.settings?.notation || 'auto'
      return h(
        'div',
        {
          className: 'dsh-pray-flame-root',
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        },
        hover && state
          ? h(
              'div',
              { className: 'dsh-pray-flame-panel' },
              h('div', { className: 'dsh-pray-flame-panel-head' }, h('span', { className: 'dsh-pray-label' }, t('expectation')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.expectation, notation))),
              h('div', { className: 'dsh-pray-flame-panel-row' }, h('span', null, t('perSecond')), h('span', { className: 'dsh-pray-mono' }, `+${formatNumber(state.expectationPerSecond, notation)}/s`)),
              h('div', { className: 'dsh-pray-flame-panel-row' }, h('span', null, t('level')), h('span', { className: 'dsh-pray-mono' }, state.highestLevel ? `L${state.highestLevel.index}` : '—')),
              h('div', { className: 'dsh-pray-flame-panel-row' }, h('span', null, t('wish')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.wish, notation))),
              h('div', { className: 'dsh-pray-flame-panel-row' }, h('span', null, t('mode')), h('span', { className: 'dsh-pray-tag' }, state.mode === 'attention' ? t('modeAutoTag') : t('modePlayTag'))),
              h('div', { className: 'dsh-pray-flame-hint' }, t('flameHint')),
            )
          : null,
        h(
          'button',
          { type: 'button', className: 'dsh-pray-flame-btn', onClick: () => props.onExpand?.(), title: t('flameHint'), 'aria-label': t('flameHint') },
          flameIcon(24),
          h('span', { className: 'dsh-pray-flame-dot' }),
        ),
      )
    }

    function PrayCardHost(props) {
      const [view, setView] = useState(() => getCardView())
      useEffect(() => {
        const onChange = (event) => {
          setView(event.detail === 'flame' ? 'flame' : event.detail === 'full' ? 'full' : getCardView())
        }
        window.addEventListener('dsh-pray-card-view', onChange)
        return () => window.removeEventListener('dsh-pray-card-view', onChange)
      }, [])
      if (view === 'hidden') return null
      if (view === 'flame') return h(FlameCard, { ...props, onExpand: () => setCardView('full') })
      return h(PrayCard, { ...props, onCollapse: () => setCardView('flame'), onClose: () => setCardView('hidden') })
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

    function LevelRow({ level, t, notation, busy, auto, run, onOpenStory }) {
      const cost10 = Number.isFinite(level.cost10) ? formatNumber(level.cost10, notation) : '∞'
      return h(
        'div',
        { className: `dsh-pray-level-row${level.unlocked ? '' : ' locked'}` },
        h('div', { className: 'dsh-pray-level-badge' }, level.index),
        h(
          'div',
          { className: 'dsh-pray-level-main' },
          h('div', { className: 'dsh-pray-level-name' }, level.name),
          h(
            'div',
            { className: 'dsh-pray-level-stats' },
            h('span', null, `${t('owned')} `, h('b', null, formatNumber(level.owned, notation))),
            h('span', null, `${t('bought')} `, h('b', null, level.bought)),
            h('span', null, `${t('produced')} `, h('b', null, formatNumber(level.produced, notation))),
            h('span', null, `${t('multiplierShort')} `, h('b', null, `×${formatNumber(level.multiplier, notation)}`)),
            h('span', null, `${t('production')} `, h('b', null, `${formatNumber(level.production, notation)}/s`)),
          ),
          h(
            'div',
            { className: 'dsh-pray-level-term' },
            h('span', { className: 'dsh-pray-term-badge' }, level.term || t('term')),
            h('button', { type: 'button', className: 'dsh-pray-btn ghost', onClick: () => onOpenStory?.() }, t('openCodex')),
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
                  h('button', { className: 'dsh-pray-btn primary', disabled: auto || !level.canBuy1 || busy, onClick: () => run({ type: 'buyLevel', id: level.id, count: 1 }) }, t('buy1')),
                  h('button', { className: 'dsh-pray-btn', disabled: auto || !level.canBuy10 || busy, onClick: () => run({ type: 'buyLevel', id: level.id, count: 10 }) }, t('buy10')),
                  h('button', { className: 'dsh-pray-btn', disabled: auto || busy, onClick: () => run({ type: 'buyLevel', id: level.id, count: 'max' }) }, t('max')),
                ),
              )
            : h('div', { className: 'dsh-pray-locked' }, localize(t, 'locked', { at: formatNumber(level.unlockAt, notation) })),
        ),
      )
    }

    const STORY = [
      { level: 1, title: '期待下次更新', text: '你第一次打开它。更新日志停在 2026-10-17，等待开始有了形状。' },
      { level: 2, title: '别打扰梁叔叔搞AGI', text: '你开始认真等。听说梁叔叔在搞 AGI，你决定不催，只把期待攒起来。' },
      { level: 3, title: '谁给ds报名的憋气大赛？', text: 'DeepSeek 迟迟不出声，群里开始比谁憋得久。你发现等待也能变成一种战绩。' },
      { level: 4, title: 'Pro来✋🏻😡🤚🏻', text: 'Pro 来了。你拍桌，但桌子是本地 JSON，没人受伤。' },
      { level: 5, title: '我们的deepseek···会变成什么样子', text: '你攒到最后一层。更新还没来，但你已经开始想象它来的时候。' },
    ]

    function PrayPage(props) {
      const t = makeT(props)
      const { state, error, busy, act, reload } = usePrayState(1000)
      const [tab, setTab] = useState('level')
      const [confirmRelease, setConfirmRelease] = useState(false)
      const [confirmReset, setConfirmReset] = useState(null)
      const [notice, setNotice] = useState(null)
      const [celebrate, setCelebrate] = useState(null)
      const [cardView, setCardViewState] = useState(() => getCardView())
      const animated = useAnimatedNumber(state?.expectation ?? 0, state?.expectationPerSecond ?? 0, 80)

      useEffect(() => {
        const onChange = (event) => {
          setCardViewState(event.detail === 'flame' ? 'flame' : event.detail === 'full' ? 'full' : getCardView())
        }
        window.addEventListener('dsh-pray-card-view', onChange)
        return () => window.removeEventListener('dsh-pray-card-view', onChange)
      }, [])

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
        } else if (result?.ok && body.type === 'urge') {
          setNotice(t('urgeDone'))
        } else if (result?.ok && body.type === 'launch') {
          setNotice(t('launchDone'))
        } else if (result?.ok && body.type === 'resetRun') {
          setNotice(t('resetRunDone'))
        } else if (result?.ok && body.type === 'repairState') {
          setNotice(t('repairStateDone'))
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

      const tabs = ['level', 'wish', 'release', 'story', 'settings']
      const tabLabels = {
        level: t('tabLevel'),
        wish: t('tabWish'),
        release: t('tabRelease'),
        story: t('tabStory'),
        settings: t('tabSettings'),
      }
      const highest = state.highestLevel
      const next = state.nextLevel
      const progress = Math.round((next?.progress ?? 1) * 100)
      const levels = state.levels || []
      const habits = state.habits || []
      const auto = state.mode === 'attention'
      const achievements = state.achievements || []
      const anomaly = state.lifetimeExpectation > 1e18 || state.expectationPerSecond > 1e12

      const renderLevel = () => h(
        React.Fragment,
        null,
        anomaly
          ? h(
              'div',
              { className: 'dsh-pray-panelcard', style: { marginBottom: 12, borderColor: 'var(--dsw-alias-state-warn-primary)' } },
              h('div', { className: 'dsh-pray-cardtitle', style: { color: 'var(--dsw-alias-state-warn-primary)' } }, t('anomalyTitle')),
              h('div', { className: 'dsh-pray-note', style: { marginTop: 6 } }, t('anomalyDesc')),
              h(
                'div',
                { className: 'dsh-pray-actions' },
                confirmReset === 'resetRun'
                  ? h(React.Fragment, null,
                      h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'resetRun' }) }, t('resetRunConfirm')),
                      h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                    )
                  : confirmReset === 'repairState'
                    ? h(React.Fragment, null,
                        h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'repairState' }) }, t('repairStateConfirm')),
                        h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                      )
                    : h(React.Fragment, null,
                        h('button', { className: 'dsh-pray-btn warn', onClick: () => setConfirmReset('resetRun') }, t('resetRun')),
                        h('button', { className: 'dsh-pray-btn warn', onClick: () => setConfirmReset('repairState') }, t('repairState')),
                      ),
              ),
            )
          : null,
        h(
          'div',
          { className: 'dsh-pray-modebar' },
          h(
            'div',
            null,
            h('div', { className: 'dsh-pray-note' }, h('strong', null, auto ? t('modeAttention') : t('modePlay'))),
            h('div', { className: 'dsh-pray-note' }, auto ? (state.canRelease ? t('autoPaused') : t('autoBuying')) : t('modePlayDesc')),
          ),
          h('button', { className: 'dsh-pray-btn', onClick: () => run({ type: 'setMode', mode: auto ? 'play' : 'attention' }) }, auto ? t('switchToPlay') : t('switchToAttention')),
        ),
        h(
          'div',
          { className: 'dsh-pray-grid' },
          h(StatCard, { label: t('expectation'), value: formatNumber(animated, notation), note: `${t('perSecond')} +${formatNumber(state.expectationPerSecond, notation)}`, accent: true }),
          h(StatCard, { label: t('wish'), value: formatNumber(state.wish, notation), note: `${t('today')} ${formatNumber(state.activity.todayWish, notation)}/${formatNumber(state.dailyCap, notation)}` }),
          h(StatCard, { label: t('release'), value: formatNumber(state.release, notation), note: `${t('releaseMultiplier')} ×${state.releaseMultiplier.toFixed(2)}` }),
          h(StatCard, { label: t('highestLevel'), value: `L${highest.index} · ${highest.name}`, note: next ? `${t('nextLevel')} L${next.index} · ${progress}%` : t('noNextUnlock'), small: true }),
        ),
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
          h('div', { className: 'dsh-pray-cardtitle' }, t('nextUnlock')),
          h('div', { className: 'dsh-pray-value small' }, next ? `L${next.index} · ${next.name} · ${formatNumber(next.at, notation)}` : t('noNextUnlock')),
          h('div', { className: 'dsh-pray-progress' }, h('div', { className: 'dsh-pray-progress-fill', style: { width: `${Math.max(2, progress)}%` } })),
          h(
            'div',
            { className: 'dsh-pray-row' },
            h('span', { className: 'dsh-pray-note' }, `${t('waitBonus')} +${Math.round((state.waitMultiplier - 1) * 100)}%`),
            h('span', { className: 'dsh-pray-note' }, `${t('urge')} +${Math.round((state.urgeMultiplier - 1) * 100)}% · ${t('launch')} +${Math.round((state.launchMultiplier - 1) * 100)}% · ${t('achievements')} +${Math.round((state.achievementMultiplier - 1) * 100)}%`),
          ),
          h('div', { className: 'dsh-pray-row' },
            h('span', { className: 'dsh-pray-note' }, t('permanentBonus')),
            h('span', { className: 'dsh-pray-mono' }, `+${Math.round(state.permanentBonus * 100)}%`),
          ),
          h('div', { className: 'dsh-pray-row' },
            h('span', { className: 'dsh-pray-note' }, t('temporaryBonus')),
            h('span', { className: 'dsh-pray-mono' }, `+${Math.round(state.temporaryBonus * 100)}%`),
          ),
          h('div', { className: 'dsh-pray-row' },
            h('span', { className: 'dsh-pray-note' }, t('totalMultiplier')),
            h('span', { className: 'dsh-pray-mono' }, `×${state.totalMultiplier.toFixed(2)}`),
          ),
          h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('softcapNote')),
        ),
        h(
          'div',
          { className: 'dsh-pray-grid', style: { marginTop: 12 } },
          h(
            'div',
            { className: 'dsh-pray-panelcard accent' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('urge')),
            h('div', { className: 'dsh-pray-reset-value' }, `+${Math.round((state.urgeMultiplier - 1) * 100)}%`),
            h('div', { className: 'dsh-pray-note' }, t('urgeDesc')),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('urges')), h('span', { className: 'dsh-pray-mono' }, state.urges)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('urgeCost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.urgeCost, notation))),
            h(
              'div',
              { className: 'dsh-pray-reset-actions' },
              confirmReset === 'urge'
                ? h(React.Fragment, null,
                    h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'urge' }) }, t('resetWarning')),
                    h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                  )
                : h('button', { className: 'dsh-pray-btn warn', disabled: !state.canUrge || busy, onClick: () => setConfirmReset('urge') }, t('urgeButton')),
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-panelcard accent' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('launch')),
            h('div', { className: 'dsh-pray-reset-value' }, `+${Math.round((state.launchMultiplier - 1) * 100)}%`),
            h('div', { className: 'dsh-pray-note' }, t('launchDesc')),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('launches')), h('span', { className: 'dsh-pray-mono' }, state.launches)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, localize(t, 'launchRequires', { n: state.launchRequiredUrges })), h('span', { className: 'dsh-pray-mono' }, `${state.urges}/${state.launchRequiredUrges}`)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('launchCost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.launchCost, notation))),
            h(
              'div',
              { className: 'dsh-pray-reset-actions' },
              confirmReset === 'launch'
                ? h(React.Fragment, null,
                    h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'launch' }) }, t('resetWarning')),
                    h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                  )
                : h('button', { className: 'dsh-pray-btn warn', disabled: !state.canLaunch || busy, onClick: () => setConfirmReset('launch') }, t('launchButton')),
            ),
          ),
        ),
        h('div', { className: 'dsh-pray-cardtitle', style: { margin: '18px 0 8px' } }, t('levels')),
        h('div', { className: 'dsh-pray-levels' }, levels.map((level) => h(LevelRow, {
          key: level.id,
          level,
          t,
          notation,
          busy,
          auto,
          run,
          onOpenStory: () => setTab('story'),
        }))),
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
          ),
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
        h('div', { className: 'dsh-pray-cardtitle', style: { marginBottom: 8 } }, t('habits')),
        h(
          'div',
          { className: 'dsh-pray-grid' },
          habits.map((habit) => h(
            'div',
            { className: 'dsh-pray-panelcard', key: habit.id },
            h('div', { style: { fontWeight: 600 } }, habit.name),
            h('div', { className: 'dsh-pray-note' }, habit.effect),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('level')), h('span', { className: 'dsh-pray-mono' }, habit.level)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('cost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(habit.cost, notation))),
            h('div', { className: 'dsh-pray-actions' }, h('button', { className: 'dsh-pray-btn primary', disabled: !habit.canBuy || busy, onClick: () => run({ type: 'buyPermanentAmp', id: habit.id }) }, t('buy'))),
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
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('urge')), h('span', { className: 'dsh-pray-mono' }, state.urges)),
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('launch')), h('span', { className: 'dsh-pray-mono' }, state.launches)),
            h('div', { className: 'dsh-pray-note', style: { marginTop: 10 } }, `${t('wish')} 不重置；${t('activity')} 不重置。`),
          ),
        ),
      )

      const renderStory = () => h(
        React.Fragment,
        null,
        h('div', { className: 'dsh-pray-cardtitle', style: { marginBottom: 8 } }, t('storyTitle')),
        h('div', { className: 'dsh-pray-list' }, STORY.map((chapter) => {
          const unlocked = Boolean(levels[chapter.level - 1]?.unlocked)
          return h(
            'div',
            { className: `dsh-pray-chapter${unlocked ? '' : ' locked'}`, key: chapter.level },
            h('div', { className: 'dsh-pray-chapter-title' }, `${localize(t, 'storyChapter', { n: chapter.level })} · ${chapter.title}`),
            h('div', { className: 'dsh-pray-note' }, unlocked ? chapter.text : localize(t, 'storyLocked', { n: chapter.level })),
            unlocked && levels[chapter.level - 1]?.term
              ? h('div', { className: 'dsh-pray-codex', style: { marginTop: 8 } },
                  h('div', { className: 'dsh-pray-codex-title' }, levels[chapter.level - 1].term),
                  h('div', { className: 'dsh-pray-note' }, levels[chapter.level - 1].termText),
                  h('div', { className: 'dsh-pray-codex-use' }, h('strong', null, t('termUse')), '：', levels[chapter.level - 1].termUse),
                )
              : null,
          )
        })),
        h('div', { className: 'dsh-pray-cardtitle', style: { margin: '18px 0 8px' } }, t('achievements')),
        achievements.length
          ? h('div', { className: 'dsh-pray-achievements' }, achievements.map((achievement) => h(
              'div',
              { className: `dsh-pray-achievement${achievement.unlocked ? '' : ' locked'}`, key: achievement.id },
              h('div', { className: 'dsh-pray-achievement-name' }, achievement.name),
              h('div', { className: 'dsh-pray-note' }, achievement.desc),
              h('div', { className: 'dsh-pray-achievement-reward' }, localize(t, 'achievementReward', { n: Math.round(achievement.reward * 100) })),
              h('div', { className: 'dsh-pray-note' }, achievement.unlocked ? t('achievementUnlocked') : t('achievementLocked')),
            )))
          : h('div', { className: 'dsh-pray-note' }, t('noAchievements')),
        h('div', { className: 'dsh-pray-cardtitle', style: { margin: '18px 0 8px' } }, t('eras')),
        state.eras?.length
          ? h('div', { className: 'dsh-pray-list' }, [...state.eras].reverse().map((era) => h(
              'div',
              { className: 'dsh-pray-era', key: `${era.date}-${era.seenAt}` },
              h('div', { className: 'dsh-pray-era-date' }, era.date),
              h('div', { className: 'dsh-pray-note' }, (era.headings || []).join(' · ')),
            )))
          : h('div', { className: 'dsh-pray-note' }, t('erasEmpty')),
        state.versionBonusActive ? h('div', { className: 'dsh-pray-note', style: { marginTop: 6, color: 'var(--dsw-alias-state-success-primary)' } }, `${t('versionBonus')} ×${state.versionMultiplier.toFixed(2)}`) : null,
      )

      const renderSettings = () => h(
        React.Fragment,
        null,
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginBottom: 12 } },
          h('div', { className: 'dsh-pray-cardtitle' }, t('mode')),
          h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('modeAttentionDesc')),
          h('div', { className: 'dsh-pray-actions' },
            h('button', { className: `dsh-pray-btn${auto ? ' primary' : ''}`, onClick: () => run({ type: 'setMode', mode: 'attention' }) }, t('modeAttention')),
            h('button', { className: `dsh-pray-btn${!auto ? ' primary' : ''}`, onClick: () => run({ type: 'setMode', mode: 'play' }) }, t('modePlay')),
          ),
          h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('modePlayDesc')),
        ),
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginBottom: 12 } },
          h('div', { className: 'dsh-pray-cardtitle' }, t('resetRun')),
          h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('resetRunNote')),
          h(
            'div',
            { className: 'dsh-pray-actions' },
            confirmReset === 'resetRun'
              ? h(React.Fragment, null,
                  h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'resetRun' }) }, t('resetRunConfirm')),
                  h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                )
              : h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset('resetRun') }, t('resetRun')),
          ),
          h('div', { className: 'dsh-pray-note', style: { marginTop: 10 } }, t('repairStateNote')),
          h(
            'div',
            { className: 'dsh-pray-actions' },
            confirmReset === 'repairState'
              ? h(React.Fragment, null,
                  h('button', { className: 'dsh-pray-btn warn', disabled: busy, onClick: () => run({ type: 'repairState' }) }, t('repairStateConfirm')),
                  h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset(null) }, t('cancel')),
                )
              : h('button', { className: 'dsh-pray-btn', onClick: () => setConfirmReset('repairState') }, t('repairState')),
          ),
        ),
        h(
          'div',
          { className: 'dsh-pray-grid' },
          h(
            'div',
            { className: 'dsh-pray-panelcard' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('cardVisible')),
            h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } }, t('cardViewNote')),
            h('div', { className: 'dsh-pray-actions' },
              h('button', {
                className: `dsh-pray-btn${cardView === 'full' ? ' primary' : ''}`,
                onClick: () => { setCardView('full'); setCardViewState('full') },
              }, t('cardShow')),
              h('button', {
                className: `dsh-pray-btn${cardView === 'flame' ? ' primary' : ''}`,
                onClick: () => { setCardView('flame'); setCardViewState('flame') },
              }, t('cardHide')),
              h('button', {
                className: `dsh-pray-btn${cardView === 'hidden' ? ' primary' : ''}`,
                onClick: () => { setCardView('hidden'); setCardViewState('hidden') },
              }, t('closeCard')),
            ),
          ),
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
        ),
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
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
              h('div', null, auto ? t('modeAutoTag') : t('modePlayTag')),
              cardView === 'hidden'
                ? h('button', { className: 'dsh-pray-btn', style: { marginTop: 6 }, onClick: () => { setCardView('full'); setCardViewState('full') } }, t('cardShow'))
                : null,
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
          tab === 'level' ? renderLevel() : null,
          tab === 'wish' ? renderWish() : null,
          tab === 'release' ? renderRelease() : null,
          tab === 'story' ? renderStory() : null,
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
        }, PrayCardHost)))

        ctx.effect(() => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'dsh-pray-notice',
          order: 899,
          locale: NS,
        }, FirstRunNotice)))
      },
    }
  },
})
