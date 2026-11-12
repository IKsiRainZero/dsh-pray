# dsh-pray · 期待

> 一个本地单机的 DeepSeek Harness 增量小游戏：五层 **Level**、**愿力**、**Boost**、**Galaxy** 和 **释怀**。
>
> 无账号、无排行榜、无总仓库、无遥测；所有数据都在本机 `$DSH_HOME/dsh-pray/`。

## 五层 Level

| Level | 名字 | 解锁（累计期待） | 基础成本 | 每 10 个成本倍率 | 产出 |
|---|---|---|---|---|---|
| 1 | 期待下次更新 | 0 | 1 | ×100 | 期待 |
| 2 | 别打扰梁叔叔搞AGI | 1,000 | 10 | ×1e3 | Level 1 |
| 3 | 谁给ds报名的憋气大赛？ | 100,000 | 1,000 | ×1e4 | Level 2 |
| 4 | Pro来✋🏻😡🤚🏻 | 10,000,000 | 1e5 | ×1e5 | Level 3 |
| 5 | 图片 | 1,000,000,000 | 1e7 | ×1e6 | Level 4 |

所有 Level 始终列在详情页里：左边的编号/图片是递进，中间是拥有量、已买数、本层累计产出、购买增幅和速度，右边是 +1 / +10 / MAX 购买按钮。锁定的 Level 也会显示，只是变暗。

**Level 5 图片**：把截图放到 `assets/realm-5.jpg`（也支持 `.png` / `.jpeg` / `.webp`）。没有图片时显示 `assets/realm-5.svg` 占位；路由优先读图片，其次 SVG。图片由你提供，请确认你有权分享它。

## 三层重置

| 层 | 动作 | 代价 | 重置什么 | 留下什么 |
|---|---|---|---|---|
| 1 | **Boost** | 期待（首价 10,000，×100/次） | 所有 Level、本轮增幅器 | Boost 次数（×1.5 全局/次）、本轮累计、愿力 |
| 2 | **Galaxy** | 3 + 已有 Galaxy 次 Boost，外加期待（首价 1e6，×100/次） | Boost、所有 Level、本轮增幅器 | Galaxy 次数（×2 全局/次）、本轮累计、愿力 |
| 3 | **释怀** | 本轮累计期待 ≥ 1e6 | 期待、所有 Level、Boost、Galaxy、本轮增幅器 | 愿力、释怀、永久增幅、档案、Level 5 图片进度 |

- 释怀获得 `floor(sqrt(本轮期待 / 1e6))` 点释怀；每点释怀永久 +10% 全局产出。
- 第一次释怀会有一个全屏「释怀」特效；`prefers-reduced-motion` 下只保留文字。
- 本层累计产出不会因为 Boost/Galaxy/释怀清零，方便回看「这一层一共产了多少」。

## 愿力

愿力是行为元货币，不随重置清零；来源只有行为：

- 新开一个用户根会话 +1；每日首个会话额外 +3；
- 完成一轮 +1；
- 每活跃 10 分钟 +1；
- 连续天数 +1~5/天；
- 子 agent 只统计「分身」，不给愿力；
- token 与成本**只进档案**，不做货币。

每日上限 30（永久增幅可加）；不惩罚断签；不弹焦虑通知。

永久增幅器（愿力购买）：

- **专注**：期待产出 +10%/级；
- **回声**：愿力获取 +5%/级、每日上限 +5/级；
- **挂机**：离线上限 +2 小时/级。

## 数字与记数法

- 主数字用 `requestAnimationFrame` 风格的高频刷新，数字越大跳得越快；服务端仍每秒同步一次。
- 记数法：自动 / 标准 / 科学 / 工程 / 字母；`1e138` 在科学记数法下直接显示。
- 内部用 JS `number`（1e308 以内），不引入大数库。

## 安装

### 从 GitHub 安装（当前推荐）

仓库：<https://github.com/IKsiRainZero/dsh-pray>

```sh
dsh plugin --profile <profile> add github:IKsiRainZero/dsh-pray
```

本插件没有构建脚本；装完重启 profile 即可。把 `<profile>` 换成实际 profile（如 `desktop` / `web`）。

### 发布后（npm）

```sh
dsh plugin --profile <profile> add dsh-pray
```

## 数据与隐私

| 文件 | 内容 |
|---|---|
| `$DSH_HOME/dsh-pray/state.json` | 期待、Level、Boost、Galaxy、愿力、释怀、档案、更新日志缓存、纪事 |
| `$DSH_HOME/dsh-pray/aggregate.json` | **v0.1 遗留**，v0.3 不再读写；可手动删除 |

- 只监听 DSH 核心事件：`session/created`、`session/event`、`session/disposed`。
- 只存数字聚合：会话数、完成轮数、活跃秒数、连续天数、工具调用数、token 数；不存 prompt、回复、文件路径、账号或密钥。
- token 只进档案，不产生愿力；成本不参与任何货币。
- 除抓取官方更新日志外，不联网、不上传、不读 `dsh-context` 的数据库。
- 设置页提供「导出本地数据」；删除 `$DSH_HOME/dsh-pray/` 即可清空本地数据。

## 开发

- 纯 JS，无构建步骤；Host 只用 Node 内置模块，Client 只用 `window.__ModuleLoader__` + React。
- 数值表：`game/balance.js`；纯函数引擎：`game/engine.js`；行为采集：`game/activity.js`。
- 测试：`node test-engine.mjs`、`node test-host.mjs`。
- 语法检查：`node --check index.js`、`node --check client.js`。

## 已知限制

- **v0.2 → v0.3 迁移**：旧三维度 A/B/C 会映射到 Level 1/2/3，旧 `dimA/B/C` 增幅器映射到 `level1/2/3`；`produced` 从 0 开始累计。
- **v0.1 → v0.3**：旧 `points` 变成 `expectation` / `lifetimeExpectation`；旧 `aggregate` / `lastPushAt` 忽略。
- **档案是自安装以来**：`sessions.list()` 只有 live 会话，不做历史日志全量回填。
- **没有反作弊**：本地 JSON 可改，开源即接受。
- **Level 5 图片版权**：由用户提供，公开分享前请确认授权。
- **数值仍在调**：Boost/Galaxy 门槛、释怀阈值、每日愿力上限都可能随体验调整。

## 兼容性

- 当前验证环境：DSH Desktop `0.2.1-rc.3`，profile `desktop`，Web GUI。
- `engines.dsh`: `>=0.2.1-rc.1 <0.3.0-0`。
- 上游每发一个新的 `0.x.y` 元组，需要重新核对 semver range。

## License

MIT。见 [LICENSE](./LICENSE)。
