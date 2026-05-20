import { Problem, CategoryName } from '../types'
import { arrayProblems } from './array'
import { treeProblems } from './tree'
import { graphProblems } from './graph'
import { matrixProblems } from './matrix'
import { dpProblems } from './dp'
import { backtrackingProblems } from './backtracking'
import { greedyProblems } from './greedy'
import { slidingWindowProblems } from './sliding-window'
import { binarySearchProblems } from './binary-search'
import { bitManipulationProblems } from './bit-manipulation'
import { hashTableProblems } from './hash-table'
import { twoPointersProblems } from './two-pointers'

import { linkedListProblems } from './linked-list'
import { stackQueueProblems } from './stack-queue'
import { heapProblems } from './heap'

export const problemsByCategory: Record<CategoryName, Problem[]> = {
  array: arrayProblems,
  'linked-list': linkedListProblems,
  tree: treeProblems,
  graph: graphProblems,
  dp: dpProblems,
  backtracking: backtrackingProblems,
  greedy: greedyProblems,
  'stack-queue': stackQueueProblems,
  'hash-table': hashTableProblems,
  'two-pointers': twoPointersProblems,
  'sliding-window': slidingWindowProblems,
  'binary-search': binarySearchProblems,
  heap: heapProblems,
  'bit-manipulation': bitManipulationProblems,
  matrix: matrixProblems,
}

export const problemMap: Record<number, Problem> = {}
for (const problems of Object.values(problemsByCategory)) {
  for (const p of problems) {
    if (!problemMap[p.id]) {
      problemMap[p.id] = p
    }
  }
}

export function getCategoryCount(name: CategoryName): number {
  return problemsByCategory[name]?.length ?? 0
}

export function getCategoryDifficultyCounts(name: CategoryName) {
  const problems = problemsByCategory[name] || []
  return {
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length,
  }
}
