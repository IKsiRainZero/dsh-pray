/**
 * dsh-pray knowledge map — research placeholder.
 *
 * v0.6.4 deliberately ships NO raw knowledge entries. The 25 seed notes from
 * v0.6.3 moved to `experiments/presentedexternally/dsh-pray/research/` and are
 * not exposed by the plugin. The next step is to verify DSH components/history
 * and the community ecosystem, then write reviewed entries.
 */
export const STORY_VERSION = '0.2.0'
export const STORY_UPDATED_AT = '2026-11-12'
export const STORY_STATUS = 'research'
export const STORY_NOTE = '知识地图正在预调研 DSH 仓库、历史发展、社区生态；暂不放未经审稿的条目。'

export const STORY_CATEGORIES = [
  {
    id: 'dsh',
    title: 'DSH 组件与机制',
    description: '待调研：Session、Turn/Step、Tool、Slot、Plugin/Bundle、Profile、Workspace、Context、Skill、Hook、Sandbox、MCP。',
  },
  {
    id: 'ai',
    title: 'AI 全景',
    description: '待调研：Token、Embedding、Transformer/Attention、Context Window、训练/对齐、推理/KV Cache、量化、MoE、Scaling、Agent、RAG、Eval。',
  },
]

export const STORY_ENTRIES = []
