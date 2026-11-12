# dsh-pray · 期待

> 一个本地单机的 DeepSeek Harness 增量小游戏：**期待**会自己长，**愿力**来自你真实用 DSH 的行为，**释怀**是你主动结束一轮后留下的永久倍率。
>
> 无账号、无排行榜、无总仓库、无遥测；所有数据都在本机 `$DSH_HOME/dsh-pray/`。

## 它是什么

- **期待**：被动资源。时间、等待 DeepSeek 更新、以及三层期待维度都会让它增长；用它买维度和本轮增幅器。
- **愿力**：真实行为元货币。新会话、完成轮、活跃时长、连续天数会产出愿力；愿力买永久增幅，**不随释怀重置**。
- **释怀**：主动结束这一轮。重置期待、维度和本轮增幅器，换永久倍率；愿力、释怀、档案保留。
- **更新驱动**：等待越久，期待基础产出越高；DeepSeek 更新日志日期变化时给版本红利，并把官方标题写进「纪事」。
- **侧栏详情页**：右下角卡片只做 HUD；点侧栏的「期待」图标进入完整面板（总览 / 期待 / 愿力 / 释怀 / 纪事 / 设置）。

## 玩法

1. 等期待涨到 1，买第一个 **维度 A**；每买 10 个，该层产出翻倍。
2. 期待到 100 解锁 **维度 B**，到 10,000 解锁 **维度 C**；B 产 A，C 产 B。
3. 用期待买 **本轮增幅器**（A/B/C 层 +50%，全局 +25%）。
4. 用真实行为攒 **愿力**：新会话 +1、每日首个会话 +3、完成一轮 +1、每活跃 10 分钟 +1、连续天数 +1~5/天；每日上限 30（永久增幅可加）。
5. 愿力买 **永久增幅器**：专注（期待产出）、回声（愿力获取/上限）、挂机（离线上限）。
6. 本轮累计期待到 **1,000,000** 后可以 **释怀**：获得 `floor(sqrt(本轮期待 / 1e6))` 点释怀；每点释怀永久 +10% 全局产出。
7. 中后期数字会到 `1e138`；设置里可切换自动 / 标准 / 科学 / 工程 / 字母记数法。

## 境界

| # | 境界 | 累计期待门槛 |
|---|---|---|
| 1 | 期待下次更新 | 0 |
| 2 | 别打扰梁叔叔搞AGI | 1,000 |
| 3 | 谁给ds报名的憋气大赛？ | 100,000 |
| 4 | Pro来✋🏻😡🤚🏻 | 10,000,000 |
| 5 | （用户提供图片） | 1,000,000,000 |

**境界 5 的图片**：把截图放到 `plugin/assets/realm-5.png`。没有图片时会显示 `assets/realm-5.svg` 占位；路由优先读 PNG，其次 SVG。图片由你提供，请确认你有权分享它。

## 安装

### 当前原型（本地目录）

在 DSH 的插件页用「添加插件 → 本地目录」，或让 agent 调用 `plugin_manager` 的 `install_bundle`，目标填本目录的绝对路径。安装后：

- 右下角出现「dsh-pray · 期待」卡片；
- 侧栏出现「期待」图标，点开是详情面板；
- 可选：`GET http://127.0.0.1:<port>/dsh-pray/state` 看本地状态。

### 从 GitHub 安装（当前推荐）

仓库：<https://github.com/IKsiRainZero/dsh-pray>

\sh
dsh plugin --profile <profile> add github:IKsiRainZero/dsh-pray
\\n
这条命令拉的是仓库源码；本插件没有构建脚本，装完重启 profile 即可。

### 发布后（npm）

```sh
dsh plugin --profile <profile> add dsh-pray
```

`--profile` 必填；把 `<profile>` 换成实际 profile（例如 `web` / `desktop`）。安装后重启 profile 以加载客户端模块。

## 数据与隐私

| 文件 | 内容 |
|---|---|
| `$DSH_HOME/dsh-pray/state.json` | 期待、愿力、释怀、维度、增幅、档案、更新日志缓存、纪事 |
| `$DSH_HOME/dsh-pray/aggregate.json` | **v0.1 遗留**，v0.2 不再读写；可手动删除 |

- 只监听 DSH 核心事件：`session/created`、`session/event`、`session/disposed`。
- 只存数字聚合：会话数、完成轮数、活跃秒数、连续天数、工具调用数、token 数；**不存 prompt、回复、文件路径、账号或密钥**。
- token 只进档案，不产生愿力；成本不参与任何货币。
- 除抓取官方更新日志（`api-docs.deepseek.com`）外，不联网、不上传、不读 `dsh-context` 的数据库。
- 设置页提供「导出本地数据」；需要删除时删掉 `$DSH_HOME/dsh-pray/` 即可。

## 记数法

- 内部用 JS `number`，1e308 以内；`1e138` 完全够用，不引入大数库。
- `auto`：<1e6 用千分位，≥1e6 自动科学；
- `scientific`：`1.23e138`；
- `engineering`：指数取 3 的倍数；
- `letters`：K/M/B/T/Qa/Qi/Sx/Sp/Oc/No/Dc…；
- `standard`：完整千分位（大数会很长，慎用）。

## 开发

- 纯 JS，无构建步骤；Host 只用 Node 内置模块，Client 只用 `window.__ModuleLoader__` + React。
- 数值表：`game/balance.js`；纯函数引擎：`game/engine.js`；行为采集：`game/activity.js`。
- 测试：`node test-engine.mjs`、`node test-host.mjs`。
- 语法检查：`node --check index.js`、`node --check client.js`。

## 已知限制

- **v0.1 → v0.2 迁移**：旧 `points` 会变成 `expectation` / `lifetimeExpectation`；旧 `aggregate` / `lastPushAt` 忽略，不主动删除。
- **档案是自安装以来**：`sessions.list()` 只有 live 会话，v0.2 不做历史日志全量回填。
- **没有反作弊**：本地 JSON 可改，开源即接受；没有加密或联网校验。
- **境界 5 图片待补**：没有图片时显示占位 SVG。
- **数值仍在调**：第一次释怀的节奏、每日愿力上限、增幅器成本都可能随体验调整。

## 兼容性

- 当前验证环境：DSH Desktop `0.2.1-rc.3`，profile `desktop`，Web GUI。
- `engines.dsh`: `>=0.2.1-rc.1 <0.3.0-0`。
- 上游每发一个新的 `0.x.y` 元组，需要重新核对 semver range。

## License

MIT。见 [LICENSE](./LICENSE)。
