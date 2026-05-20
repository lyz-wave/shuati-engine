import { CategoryMeta } from './types'

export const categoryList: { name: CategoryMeta['name']; label: string; gradient: string }[] = [
  { name: 'array',          label: '数组',       gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'linked-list',    label: '链表',       gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: 'tree',           label: '树',         gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { name: 'graph',          label: '图',         gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { name: 'dp',             label: '动态规划',   gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { name: 'backtracking',   label: '回溯',       gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { name: 'greedy',         label: '贪心',       gradient: 'linear-gradient(135deg, #fccb90, #d57eeb)' },
  { name: 'stack-queue',    label: '栈/队列',    gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' },
  { name: 'hash-table',     label: '哈希表',     gradient: 'linear-gradient(135deg, #f5576c, #ff6f91)' },
  { name: 'two-pointers',   label: '双指针',     gradient: 'linear-gradient(135deg, #30cfd0, #330867)' },
  { name: 'sliding-window', label: '滑动窗口',   gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { name: 'binary-search',  label: '二分查找',   gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
  { name: 'heap',           label: '堆',         gradient: 'linear-gradient(135deg, #84fab0, #8fd3f4)' },
  { name: 'bit-manipulation',label: '位运算',    gradient: 'linear-gradient(135deg, #cfd9df, #e2ebf0)' },
  { name: 'matrix',         label: '矩阵',       gradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' },
]
