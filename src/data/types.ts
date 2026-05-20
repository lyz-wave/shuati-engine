export type Difficulty = 'easy' | 'medium' | 'hard'

export type CategoryName =
  | 'array' | 'linked-list' | 'tree' | 'graph' | 'dp'
  | 'backtracking' | 'greedy' | 'stack-queue' | 'hash-table'
  | 'two-pointers' | 'sliding-window' | 'binary-search' | 'heap'
  | 'bit-manipulation' | 'matrix'

export type VisualizerType = 'array' | 'pointer' | 'linked-list' | 'tree' | 'matrix'

export interface AnimationStep {
  description: string
  highlights: number[]
  data: Record<string, unknown>
  pointers?: { label: string; pos: number }[]
}

export interface WalkthroughEntry {
  step: number
  variables: Record<string, string>
  explanation: string
  isResult?: boolean
}

export interface Problem {
  id: number
  title: string
  difficulty: Difficulty
  leetcodeUrl: string
  category: CategoryName
  code: { cpp: string; rust: string }
  input: string
  output: string
  animationSteps: AnimationStep[]
  walkthrough: WalkthroughEntry[]
  visualizerType: VisualizerType
}

export interface CategoryMeta {
  name: CategoryName
  label: string
  gradient: string
  problems: Problem[]
}
