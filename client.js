window.__ModuleLoader__.load({
  id: 'dsh-pray',
  factory(require) {
    const React = require('react')
    const { useCallback, useEffect, useMemo, useState } = React
    const h = React.createElement

    const NS = 'dshPray'
    const DICT = {
      zh: {
        title: 'dsh-pray · 期待',
        panelLabel: '期待',
        kicker: '本地单机 · 愿力观测器',
        collapse: '收起',
        expand: '展开',
        since: '距 DeepSeek 上次更新',
        anchorNote: '锚点：更新日 00:00 (UTC+8)',
        expectation: '期待',
        perSecond: '每秒',
        realm: '境界',
        next: '下一境',
        maxRealm: '已达顶境',
        wish: '愿力',
        today: '今日',
        detailHint: '侧栏「期待」看详情',
        canRelease: '可释怀',
        waiting: '等待 Host…',
        loading: '正在读取本地状态…',
        error: '连接失败',
        retry: '重试',
        offline: '更新日志离线（缓存）',
        versionBonus: '版本红利',
        waitBonus: '等待加成',
        tabOverview: '总览',
        tabExpectation: '期待',
        tabWish: '愿力',
        tabRelease: '释怀',
        tabEras: '纪事',
        tabSettings: '设置',
        overview: '总览',
        nextUnlock: '下一次解锁',
        noNextUnlock: '暂时没有新的解锁',
        activity: '档案',
        sessions: '会话',
        turns: '完成轮数',
        active: '活跃时长',
        streak: '连续天数',
        tokens: 'token（只进档案）',
        toolCalls: '工具调用',
        runAmps: '本轮增幅器',
        permanentAmps: '永久增幅器',
        dimensions: '期待维度',
        buy: '购买',
        buy1: '+1',
        buy10: '+10',
        max: 'MAX',
        level: '等级',
        cost: '成本',
        owned: '拥有',
        bought: '已买',
        production: '产出',
        locked: '累计期待 {at} 解锁',
        notEnough: '不够',
        releaseTitle: '释怀',
        releaseDesc: '这一轮不再更多增长期待，主动结束并换成永久倍率。',
        releaseGain: '预计获得',
        releaseThreshold: '门槛',
        releaseButton: '释怀这一轮',
        releaseConfirm: '再点一次确认：期待、维度、本轮增幅器会重置；愿力、释怀、档案保留。',
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
        releaseCostNote: '释怀会重置期待、维度和本轮增幅器；愿力不重置。',
        activeHours: '小时',
        minutes: '分钟',
        seconds: '秒',
        days: '天',
        realmImagePending: '境界 5 的图片待补：把截图放到 plugin/assets/realm-5.png',
      },
      en: {
        title: 'dsh-pray · Expectation',
        panelLabel: 'Expectation',
        kicker: 'local single-player · wish observatory',
        collapse: 'Collapse',
        expand: 'Expand',
        since: 'Since DeepSeek last updated',
        anchorNote: 'Anchor: update day 00:00 (UTC+8)',
        expectation: 'Expectation',
        perSecond: 'per second',
        realm: 'Realm',
        next: 'Next',
        maxRealm: 'Final realm',
        wish: 'Wish power',
        today: 'today',
        detailHint: 'Open “Expectation” in the sidebar',
        canRelease: 'Ready to let go',
        waiting: 'Waiting for Host…',
        loading: 'Reading local state…',
        error: 'Connection failed',
        retry: 'Retry',
        offline: 'changelog offline (cached)',
        versionBonus: 'Version bonus',
        waitBonus: 'Waiting bonus',
        tabOverview: 'Overview',
        tabExpectation: 'Expectation',
        tabWish: 'Wish',
        tabRelease: 'Let go',
        tabEras: 'Chronicle',
        tabSettings: 'Settings',
        overview: 'Overview',
        nextUnlock: 'Next unlock',
        noNextUnlock: 'No further unlocks yet',
        activity: 'Archive',
        sessions: 'Sessions',
        turns: 'Completed turns',
        active: 'Active time',
        streak: 'Streak',
        tokens: 'tokens (archive only)',
        toolCalls: 'Tool calls',
        runAmps: 'Run amplifiers',
        permanentAmps: 'Permanent amplifiers',
        dimensions: 'Expectation dimensions',
        buy: 'Buy',
        buy1: '+1',
        buy10: '+10',
        max: 'MAX',
        level: 'Level',
        cost: 'Cost',
        owned: 'Owned',
        bought: 'Bought',
        production: 'Production',
        locked: 'Unlocks at {at} lifetime expectation',
        notEnough: 'not enough',
        releaseTitle: 'Let go',
        releaseDesc: 'Stop growing expectation for this run, end it, and turn it into a permanent multiplier.',
        releaseGain: 'Gain',
        releaseThreshold: 'Threshold',
        releaseButton: 'Let go of this run',
        releaseConfirm: 'Click again to confirm: expectation, dimensions, and run amplifiers reset; wish power, release, and archive stay.',
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
        releaseCostNote: 'Letting go resets expectation, dimensions, and run amplifiers; wish power stays.',
        activeHours: 'h',
        minutes: 'm',
        seconds: 's',
        days: 'd',
        realmImagePending: 'Realm 5 image pending: put a screenshot at plugin/assets/realm-5.png',
      },
    }

    const CSS = `
      .dsh-pray-root { position: fixed; right: 18px; bottom: 18px; z-index: 40; pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
        font-size: 12px; line-height: 1.4; }
      .dsh-pray-card { pointer-events: auto; box-sizing: border-box; width: 320px; max-width: calc(100vw - 32px);
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
      .dsh-pray-stats { display: flex; justify-content: space-between; gap: 12px; margin-top: 13px; }
      .dsh-pray-big { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 28px; font-weight: 650; line-height: 1.1; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
      .dsh-pray-stat-right { text-align: right; }
      .dsh-pray-rate { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 18px; font-weight: 600; color: var(--dsw-alias-state-success-primary); font-variant-numeric: tabular-nums; }
      .dsh-pray-realm { margin-top: 11px; }
      .dsh-pray-realm-line { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; font-size: 11px; }
      .dsh-pray-realm-name { font-weight: 600; color: var(--dsw-alias-brand-primary); overflow-wrap: anywhere; }
      .dsh-pray-realm-next { color: var(--dsw-alias-label-secondary); font-size: 10px; text-align: right; }
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
      .dsh-pray-pill-realm { font-size: 10px; color: var(--dsw-alias-label-secondary); max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dsh-pray-loading { width: 260px; }
      .dsh-pray-flame { flex: 0 0 auto; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 40%, transparent));
        animation: dsh-pray-flicker 2.8s ease-in-out infinite; }
      @keyframes dsh-pray-flicker { 0%,100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.08); opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .dsh-pray-flame { animation: none; } .dsh-pray-bar-fill { transition: none; } }
      @media (max-width: 560px) { .dsh-pray-root { right: 10px; bottom: 10px; } .dsh-pray-card { width: 292px; } }

      .dsh-pray-page { height: 100%; overflow: auto; box-sizing: border-box; padding: 24px 28px 44px;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif; font-size: 13px; }
      .dsh-pray-page-inner { max-width: 1040px; margin: 0 auto; }
      .dsh-pray-page-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .dsh-pray-page-title { font-size: 24px; font-weight: 700; letter-spacing: -.02em; }
      .dsh-pray-page-realm { margin-top: 2px; color: var(--dsw-alias-brand-primary); font-size: 14px; font-weight: 600; }
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
      .dsh-pray-dim { display: flex; flex-direction: column; gap: 5px; }
      .dsh-pray-dimbadge { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px;
        border-radius: 7px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-brand-primary); font-weight: 700; font-size: 11px; }
      .dsh-pray-locked { color: var(--dsw-alias-state-warn-primary); font-size: 11px; }
      .dsh-pray-progress { height: 6px; border-radius: 999px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; margin-top: 8px; }
      .dsh-pray-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); }
      .dsh-pray-realmimg { display: block; width: 100%; max-height: 220px; object-fit: cover; border-radius: 10px; margin-top: 10px;
        border: 1px solid var(--dsw-alias-border-l1); }
      .dsh-pray-list { display: flex; flex-direction: column; gap: 8px; }
      .dsh-pray-era { border-left: 2px solid var(--dsw-alias-brand-primary); padding: 4px 0 4px 10px; }
      .dsh-pray-era-date { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; color: var(--dsw-alias-label-secondary); }
      .dsh-pray-error { margin-top: 10px; font-size: 11px; color: var(--dsw-alias-state-error-primary); word-break: break-word; }
      .dsh-pray-select { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 5px 8px; font: inherit; font-size: 12px; }
      .dsh-pray-link { color: var(--dsw-alias-brand-primary); text-decoration: none; }
      .dsh-pray-link:hover { text-decoration: underline; }
      @media (max-width: 760px) { .dsh-pray-grid-wide { grid-template-columns: 1fr; } .dsh-pray-page { padding: 16px 14px 36px; } }
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
        {
          className: 'dsh-pray-flame',
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          'aria-hidden': true,
        },
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

    function formatSigned(value, notation) {
      return `+${formatNumber(value, notation)}`
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

      useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
      }, [])

      const notation = state?.settings?.notation || 'auto'
      const realm = state?.realm
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
            {
              type: 'button',
              className: 'dsh-pray-pill',
              onClick: () => setCollapsed(false),
              title: t('expand'),
              'aria-label': t('expand'),
            },
            flameIcon(15),
            h('span', { className: 'dsh-pray-pill-points' }, formatNumber(state.expectation, notation)),
            h('span', { className: 'dsh-pray-pill-rate' }, `+${formatNumber(state.expectationPerSecond, notation)}/s`),
            h('span', { className: 'dsh-pray-pill-realm' }, realm?.name || ''),
          ),
        )
      }

      const next = realm?.next
      const progress = Math.round((realm?.progress ?? 0) * 100)
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
              h(
                'div',
                null,
                h('div', { className: 'dsh-pray-title' }, t('title')),
                h('div', { className: 'dsh-pray-kicker' }, t('kicker')),
              ),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-pray-icon',
                onClick: () => setCollapsed(true),
                title: t('collapse'),
                'aria-label': t('collapse'),
              },
              '−',
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-since' },
            h('div', { className: 'dsh-pray-label' }, t('since')),
            h('div', { className: 'dsh-pray-clock' }, formatDuration(seconds, t)),
            h(
              'div',
              { className: 'dsh-pray-update' },
              state.latestUpdate || '—',
              state.latestHeadings?.length ? ` · ${state.latestHeadings.join(' · ')}` : '',
            ),
            h(
              'div',
              { className: 'dsh-pray-meta' },
              h('span', null, t('anchorNote')),
              state.changelogOk === false ? h('span', { className: 'dsh-pray-tag' }, t('offline')) : null,
              state.versionBonusActive ? h('span', { className: 'dsh-pray-tag' }, t('versionBonus')) : null,
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-stats' },
            h(
              'div',
              { className: 'dsh-pray-stat' },
              h('div', { className: 'dsh-pray-label' }, t('expectation')),
              h('div', { className: 'dsh-pray-big' }, formatNumber(state.expectation, notation)),
            ),
            h(
              'div',
              { className: 'dsh-pray-stat dsh-pray-stat-right' },
              h('div', { className: 'dsh-pray-label' }, t('perSecond')),
              h('div', { className: 'dsh-pray-rate' }, `+${formatNumber(state.expectationPerSecond, notation)}`),
            ),
          ),
          h(
            'div',
            { className: 'dsh-pray-realm' },
            h(
              'div',
              { className: 'dsh-pray-realm-line' },
              h('span', { className: 'dsh-pray-realm-name' }, realm?.name || '—'),
              next
                ? h('span', { className: 'dsh-pray-realm-next' }, `${t('next')} ${next.name} · ${progress}%`)
                : h('span', { className: 'dsh-pray-realm-next' }, t('maxRealm')),
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
              h(
                'div',
                { className: 'dsh-pray-meta' },
                `${t('today')} ${formatNumber(state.activity?.todayWish || 0, notation)}/${formatNumber(state.dailyCap || 0, notation)}`,
              ),
            ),
            h('div', { className: 'dsh-pray-hint' }, state.canRelease ? t('canRelease') : t('detailHint')),
          ),
          error ? h('div', { className: 'dsh-pray-error' }, `${t('error')}: ${error}`) : null,
        ),
      )
    }

    function StatCard({ label, value, note, accent }) {
      return h(
        'div',
        { className: `dsh-pray-panelcard${accent ? ' accent' : ''}` },
        h('div', { className: 'dsh-pray-cardtitle' }, label),
        h('div', { className: 'dsh-pray-value' }, value),
        note ? h('div', { className: 'dsh-pray-note' }, note) : null,
      )
    }

    function PrayPage(props) {
      const t = makeT(props)
      const { state, error, busy, act, reload } = usePrayState(1000)
      const [tab, setTab] = useState('overview')
      const [confirmRelease, setConfirmRelease] = useState(false)
      const [notice, setNotice] = useState(null)

      const notation = state?.settings?.notation || 'auto'
      const now = Date.now()
      const seconds = state?.latestUpdate
        ? Math.max(0, Math.floor((now - Date.parse(`${state.latestUpdate}T00:00:00+08:00`)) / 1000))
        : state?.secondsSinceUpdate ?? null

      const run = async (body) => {
        setNotice(null)
        const result = await act(body)
        if (result?.ok && body.type === 'release') {
          setNotice(localize(t, 'releaseDone', { n: result.result?.gain ?? 0 }))
          setConfirmRelease(false)
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

      const tabs = ['overview', 'expectation', 'wish', 'release', 'eras', 'settings']
      const tabLabels = {
        overview: t('tabOverview'),
        expectation: t('tabExpectation'),
        wish: t('tabWish'),
        release: t('tabRelease'),
        eras: t('tabEras'),
        settings: t('tabSettings'),
      }
      const realm = state.realm
      const next = realm.next
      const progress = Math.round((realm.progress ?? 0) * 100)
      const dims = state.dimensions || []
      const runAmps = state.runAmps || []
      const permanentAmps = state.permanentAmps || []

      const renderOverview = () => h(
        React.Fragment,
        null,
        h(
          'div',
          { className: 'dsh-pray-grid' },
          h(StatCard, { label: t('expectation'), value: formatNumber(state.expectation, notation), note: `${t('perSecond')} +${formatNumber(state.expectationPerSecond, notation)}`, accent: true }),
          h(StatCard, { label: t('wish'), value: formatNumber(state.wish, notation), note: `${t('today')} ${formatNumber(state.activity.todayWish, notation)}/${formatNumber(state.dailyCap, notation)}` }),
          h(StatCard, { label: t('release'), value: formatNumber(state.release, notation), note: `${t('releaseMultiplier')} ×${state.releaseMultiplier.toFixed(2)}` }),
          h(StatCard, { label: t('realm'), value: realm.name, note: next ? `${t('next')} ${next.name} · ${progress}%` : t('maxRealm') }),
        ),
        state.realm.image
          ? h(
              'div',
              { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
              h('div', { className: 'dsh-pray-cardtitle' }, t('realm')),
              h('img', {
                className: 'dsh-pray-realmimg',
                src: '/dsh-pray/asset/realm-5',
                alt: realm.name,
                onError: (event) => { event.currentTarget.style.display = 'none' },
              }),
            )
          : null,
        h(
          'div',
          { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
          h('div', { className: 'dsh-pray-cardtitle' }, t('nextUnlock')),
          h('div', { className: 'dsh-pray-value small' }, state.nextUnlock ? `${state.nextUnlock.name} · ${formatNumber(state.nextUnlock.at, notation)}` : t('noNextUnlock')),
          h('div', { className: 'dsh-pray-progress' }, h('div', { className: 'dsh-pray-progress-fill', style: { width: `${Math.max(2, progress)}%` } })),
          h(
            'div',
            { className: 'dsh-pray-row' },
            h('span', { className: 'dsh-pray-note' }, `${t('waitBonus')} ×${state.waitMultiplier.toFixed(2)}`),
            h('span', { className: 'dsh-pray-note' }, state.versionBonusActive ? `${t('versionBonus')} ×${state.versionMultiplier.toFixed(2)}` : ''),
          ),
        ),
        h(
          'div',
          { className: 'dsh-pray-grid-wide', style: { marginTop: 12 } },
          h(
            'div',
            { className: 'dsh-pray-panelcard' },
            h('div', { className: 'dsh-pray-cardtitle' }, t('activity')),
            h('div', { className: 'dsh-pray-grid', style: { marginTop: 10, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } },
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
            state.lastOffline ? h('div', { className: 'dsh-pray-note', style: { marginTop: 8 } },
              `离线 ${formatDuration(state.lastOffline.actualSeconds, t, true)}，结算 ${formatNumber(state.lastOffline.gained, notation)}${state.lastOffline.capped ? '（已封顶）' : ''}`,
            ) : null,
          ),
        ),
      )

      const renderExpectation = () => h(
        React.Fragment,
        null,
        h('div', { className: 'dsh-pray-cardtitle', style: { marginBottom: 8 } }, t('dimensions')),
        h('div', { className: 'dsh-pray-grid' }, dims.map((dim) => h(
          'div',
          { className: 'dsh-pray-panelcard dsh-pray-dim' },
          h('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
            h('span', { className: 'dsh-pray-dimbadge' }, dim.short),
            h('span', { style: { fontWeight: 600 } }, dim.name),
          ),
          h('div', { className: 'dsh-pray-note' }, dim.description),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('owned')), h('span', { className: 'dsh-pray-mono' }, formatNumber(dim.owned, notation))),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('production')), h('span', { className: 'dsh-pray-mono' }, `${formatNumber(dim.production, notation)}/s`)),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, `${t('cost')} ×1`), h('span', { className: 'dsh-pray-mono' }, formatNumber(dim.cost1, notation))),
          dim.unlocked
            ? h('div', { className: 'dsh-pray-actions' },
                h('button', { className: 'dsh-pray-btn primary', disabled: !dim.canBuy1 || busy, onClick: () => run({ type: 'buyDimension', tier: dim.id, count: 1 }) }, t('buy1')),
                h('button', { className: 'dsh-pray-btn', disabled: (dim.cost10 > state.expectation) || busy, onClick: () => run({ type: 'buyDimension', tier: dim.id, count: 10 }) }, `${t('buy10')} · ${formatNumber(dim.cost10, notation)}`),
                h('button', { className: 'dsh-pray-btn', disabled: busy, onClick: () => run({ type: 'buyDimension', tier: dim.id, count: 'max' }) }, t('max')),
              )
            : h('div', { className: 'dsh-pray-locked' }, localize(t, 'locked', { at: formatNumber(dim.unlockAt, notation) })),
        ))),
        h('div', { className: 'dsh-pray-cardtitle', style: { margin: '18px 0 8px' } }, t('runAmps')),
        h('div', { className: 'dsh-pray-grid' }, runAmps.map((amp) => h(
          'div',
          { className: 'dsh-pray-panelcard' },
          h('div', { style: { fontWeight: 600 } }, amp.name),
          h('div', { className: 'dsh-pray-note' }, amp.effect),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('level')), h('span', { className: 'dsh-pray-mono' }, amp.level)),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('cost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(amp.cost, notation))),
          h('div', { className: 'dsh-pray-actions' },
            h('button', { className: 'dsh-pray-btn primary', disabled: !amp.canBuy || busy, onClick: () => run({ type: 'buyRunAmp', id: amp.id }) }, t('buy')),
          ),
        ))),
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
        h('div', { className: 'dsh-pray-grid' }, permanentAmps.map((amp) => h(
          'div',
          { className: 'dsh-pray-panelcard' },
          h('div', { style: { fontWeight: 600 } }, amp.name),
          h('div', { className: 'dsh-pray-note' }, amp.effect),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('level')), h('span', { className: 'dsh-pray-mono' }, amp.level)),
          h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('cost')), h('span', { className: 'dsh-pray-mono' }, formatNumber(amp.cost, notation))),
          h('div', { className: 'dsh-pray-actions' },
            h('button', { className: 'dsh-pray-btn primary', disabled: !amp.canBuy || busy, onClick: () => run({ type: 'buyPermanentAmp', id: amp.id }) }, t('buy')),
          ),
        ))),
        h('div', { className: 'dsh-pray-panelcard', style: { marginTop: 12 } },
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
            h('div', { className: 'dsh-pray-actions' },
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
            h('div', { className: 'dsh-pray-row' }, h('span', { className: 'dsh-pray-note' }, t('expectation')), h('span', { className: 'dsh-pray-mono' }, formatNumber(state.expectation, notation))),
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
          h('div', { className: 'dsh-pray-actions' }, h('a', { className: 'dsh-pray-link', href: '/dsh-pray/export' }, t('export'))),
        ),
      )

      return h(
        'div',
        { className: 'dsh-pray-page' },
        h('style', null, CSS),
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
              h('div', { className: 'dsh-pray-page-realm' }, realm.name),
              h('div', { className: 'dsh-pray-page-sub' }, `${t('expectation')} ${formatNumber(state.expectation, notation)} · ${t('perSecond')} +${formatNumber(state.expectationPerSecond, notation)} · ${t('wish')} ${formatNumber(state.wish, notation)}`),
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
                onClick: () => { setTab(key); setConfirmRelease(false) },
              },
              tabLabels[key] || key,
            )),
          ),
          error ? h('div', { className: 'dsh-pray-error' }, `${t('error')}: ${error}`) : null,
          tab === 'overview' ? renderOverview() : null,
          tab === 'expectation' ? renderExpectation() : null,
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
