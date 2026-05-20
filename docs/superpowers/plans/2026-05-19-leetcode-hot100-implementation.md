# LeetCode Hot 100 题解网站 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React SPA that visualizes LeetCode Hot 100 solutions with C++/Rust code, step animations, and walkthrough tables.

**Architecture:** Vite + React 18 + TypeScript SPA. Data embedded as TypeScript modules. 5 Visualizer components driven by a shared step-based animation engine. CSS Variables for dark/light theme toggle.

**Tech Stack:** React 18, Vite 5, TypeScript 5, React Router v6, CSS Modules, CSS Variables

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Initialize project**

Create `package.json`:
```json
{
  "name": "leetcode-hot100",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LeetCode Hot 100</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 6: Create src/main.tsx**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 7: Install dependencies**

Run: `cd /path/to/hot100 && npm install`
Expected: node_modules created, no errors

---

### Task 2: Core Types

**Files:**
- Create: `src/data/types.ts`

- [ ] **Step 1: Write data types**

```typescript
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
```

---

### Task 3: Theme System + Global Styles

**Files:**
- Create: `src/index.css`
- Create: `src/hooks/useTheme.ts`
- Create: `src/components/Layout/Header.tsx`
- Create: `src/components/Layout/Header.module.css`

- [ ] **Step 1: Write global CSS with theme variables**

```css
:root {
  --bg: #ffffff;
  --bg-secondary: #f8fafc;
  --text: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --border-light: #f1f5f9;
  --accent: #667eea;
  --accent-light: #667eea20;
  --easy: #22c55e;
  --easy-bg: #22c55e20;
  --medium: #eab308;
  --medium-bg: #eab30820;
  --hard: #ef4444;
  --hard-bg: #ef444420;
  --radius: 10px;
  --max-width: 720px;
}

[data-theme="dark"] {
  --bg: #1e1e2e;
  --bg-secondary: #181825;
  --text: #cdd6f4;
  --text-muted: #6c7086;
  --border: #313244;
  --border-light: #252537;
  --accent: #89b4fa;
  --accent-light: #89b4fa20;
  --easy-bg: #22c55e20;
  --medium-bg: #eab30820;
  --hard-bg: #ef444420;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
  line-height: 1.6;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

button {
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
}
```

- [ ] **Step 2: Write useTheme hook**

```typescript
import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggleTheme }
}
```

- [ ] **Step 3: Create Header component**

```typescript
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  theme: ReturnType<typeof useTheme>
}

export default function Header({ theme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>&lt;/&gt;</span>
          <span className={styles.logoText}>LeetCode Hot 100</span>
        </Link>
        <button onClick={theme.toggleTheme} className={styles.themeBtn} title="切换主题">
          {theme.theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
```

```css
.header {
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}

.logo:hover { text-decoration: none; }

.logoIcon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}

.logoText {
  font-weight: 700;
  font-size: 16px;
}

.themeBtn {
  font-size: 20px;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.2s;
}

.themeBtn:hover {
  background: var(--bg-secondary);
}
```

---

### Task 4: Home Page with Category Cards

**Files:**
- Create: `src/data/categories.ts`
- Create: `src/data/index.ts`
- Create: `src/components/CategoryCard/CategoryCard.tsx`
- Create: `src/components/CategoryCard/CategoryCard.module.css`
- Create: `src/pages/Home.tsx`
- Create: `src/pages/pages.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write category metadata**

```typescript
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
```

- [ ] **Step 2: Create data/index.ts**

```typescript
export * from './types'
export { categoryList } from './categories'
```

- [ ] **Step 3: Create CategoryCard component**

```typescript
import { Link } from 'react-router-dom'
import styles from './CategoryCard.module.css'

interface Props {
  name: string
  label: string
  gradient: string
  count: number
  difficultyCounts: { easy: number; medium: number; hard: number }
}

export default function CategoryCard({ name, label, gradient, count, difficultyCounts }: Props) {
  return (
    <Link to={`/category/${name}`} className={styles.card} style={{ background: gradient }}>
      <span className={styles.label}>{label}</span>
      <div className={styles.right}>
        <span className={styles.count}>{count} 题</span>
        <div className={styles.badges}>
          {difficultyCounts.easy > 0 && <span className={styles.easy}>简单 {difficultyCounts.easy}</span>}
          {difficultyCounts.medium > 0 && <span className={styles.medium}>中等 {difficultyCounts.medium}</span>}
          {difficultyCounts.hard > 0 && <span className={styles.hard}>困难 {difficultyCounts.hard}</span>}
        </div>
        <span className={styles.arrow}>→</span>
      </div>
    </Link>
  )
}
```

```css
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-radius: var(--radius);
  color: #fff;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  text-decoration: none;
}

.label {
  font-weight: 700;
  font-size: 16px;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.count {
  font-size: 13px;
  opacity: 0.85;
}

.badges {
  display: flex;
  gap: 6px;
}

.badges span {
  padding: 1px 8px;
  border-radius: 99px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.2);
}

.arrow {
  opacity: 0.7;
  font-size: 18px;
  margin-left: 4px;
}
```

- [ ] **Step 4: Create Home page**

```typescript
import { categoryList } from '../data'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import styles from './pages.module.css'

export default function Home() {
  return (
    <main className={styles.home}>
      <h1 className={styles.title}>LeetCode Hot 100</h1>
      <p className={styles.subtitle}>按算法范式分类，可视化理解每道题</p>
      <div className={styles.cardList}>
        {categoryList.map(cat => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            label={cat.label}
            gradient={cat.gradient}
            count={0}
            difficultyCounts={{ easy: 0, medium: 0, hard: 0 }}
          />
        ))}
      </div>
    </main>
  )
}
```

```css
.home {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 40px 20px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--text-muted);
  margin: 8px 0 32px;
  font-size: 14px;
}

.cardList {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;
}
```

- [ ] **Step 5: Create App.tsx with routing**

```typescript
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Header from './components/Layout/Header'
import Home from './pages/Home'

export default function App() {
  const theme = useTheme()
  return (
    <>
      <Header theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
```

---

### Task 5: Problem Data Files + Category Page

**Files:**
- Create: `src/data/problems/array.ts` (with 3 sample problems)
- Create: `src/data/problems/index.ts`
- Create: `src/components/ProblemCard/ProblemCard.tsx`
- Create: `src/components/ProblemCard/ProblemCard.module.css`
- Create: `src/pages/Category.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create sample array problems with full animation data**

Three problems for array category:
- Two Sum (easy)
- Three Sum (medium)
- Maximum Subarray (medium)

```typescript
import { Problem } from '../types'

export const arrayProblems: Problem[] = [
  {
    id: 1,
    title: '两数之和',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/two-sum/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [2, 7, 11, 15], target = 9',
    output: '[0, 1] (因为 nums[0] + nums[1] = 2 + 7 = 9)',
    code: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) {
                return {mp[complement], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map = HashMap::new();
        for (i, &num) in nums.iter().enumerate() {
            let complement = target - num;
            if let Some(&j) = map.get(&complement) {
                return vec![j as i32, i as i32];
            }
            map.insert(num, i);
        }
        vec![]
    }
}`,
    },
    animationSteps: [
      { description: '初始化空哈希表，准备遍历数组', highlights: [], data: { nums: [2, 7, 11, 15], map: {} } },
      { description: 'i=0: nums[0]=2，complement=7，7不在哈希表中，将2→0存入哈希表', highlights: [0], data: { nums: [2, 7, 11, 15], map: { '2': 0 } }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1: nums[1]=7，complement=2，2在哈希表中！找到答案', highlights: [1], data: { nums: [2, 7, 11, 15], map: { '2': 0 } }, pointers: [{ label: 'i', pos: 1 }] },
      { description: '结果为 [0, 1]，nums[0] + nums[1] = 9 = target ✓', highlights: [0, 1], data: { nums: [2, 7, 11, 15], map: { '2': 0 } }, pointers: [{ label: 'i', pos: 1 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', num: '2', complement: '7' }, explanation: '7 不在哈希表中，将 2→0 存入' },
      { step: 2, variables: { i: '1', num: '7', complement: '2' }, explanation: '2 在哈希表中！找到答案' },
      { step: 3, variables: { result: '[0, 1]' }, explanation: '2 + 7 = 9 == target', isResult: true },
    ],
  },
  {
    id: 53,
    title: '最大子数组和',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/maximum-subarray/',
    category: 'array',
    visualizerType: 'pointer',
    input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    output: '6 (子数组 [4, -1, 2, 1] 的和最大，为 6)',
    code: {
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = 0, best = INT_MIN;
        for (int x : nums) {
            cur = max(x, cur + x);
            best = max(best, cur);
        }
        return best;
    }
};`,
      rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        let mut cur = 0;
        let mut best = i32::MIN;
        for &x in &nums {
            cur = std::cmp::max(x, cur + x);
            best = std::cmp::max(best, cur);
        }
        best
    }
}`,
    },
    animationSteps: [
      { description: '初始化 cur = 0, best = -∞', highlights: [], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 0, best: 'MIN' } },
      { description: 'x=-2: cur = max(-2, 0-2) = -2, best = max(MIN, -2) = -2', highlights: [0], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: -2, best: -2 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'x=1: cur = max(1, -2+1) = 1, best = max(-2, 1) = 1', highlights: [1], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 1, best: 1 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'x=-3: cur = max(-3, 1-3) = -2, best = max(1, -2) = 1', highlights: [2], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: -2, best: 1 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'x=4: cur = max(4, -2+4) = 4, best = max(1, 4) = 4', highlights: [3], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 4, best: 4 }, pointers: [{ label: 'i', pos: 3 }] },
      { description: 'x=-1: cur = max(-1, 4-1) = 3, best = max(4, 3) = 4', highlights: [4], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 3, best: 4 }, pointers: [{ label: 'i', pos: 4 }] },
      { description: 'x=2: cur = max(2, 3+2) = 5, best = max(4, 5) = 5', highlights: [5], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 5, best: 5 }, pointers: [{ label: 'i', pos: 5 }] },
      { description: 'x=1: cur = max(1, 5+1) = 6, best = max(5, 6) = 6', highlights: [6], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 6, best: 6 }, pointers: [{ label: 'i', pos: 6 }] },
      { description: 'x=-5: cur = max(-5, 6-5) = 1, best = max(6, 1) = 6', highlights: [7], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 1, best: 6 }, pointers: [{ label: 'i', pos: 7 }] },
      { description: 'x=4: cur = max(4, 1+4) = 5, best = max(6, 5) = 6 ✓', highlights: [8], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 5, best: 6 }, pointers: [{ label: 'i', pos: 8 }] },
    ],
    walkthrough: [
      { step: 1, variables: { x: '-2', cur: '-2', best: '-2' }, explanation: '开始新子数组 [-2]' },
      { step: 2, variables: { x: '1', cur: '1', best: '1' }, explanation: '舍弃 -2，从 1 开始新子数组' },
      { step: 3, variables: { x: '-3', cur: '-2', best: '1' }, explanation: '子数组 [1, -3] 和 = -2，不如单独 1' },
      { step: 4, variables: { x: '4', cur: '4', best: '4' }, explanation: '从 4 开始新子数组，best 更新为 4' },
      { step: 5, variables: { x: '-1', cur: '3', best: '4' }, explanation: '子数组 [4, -1] 和 = 3，best 不变' },
      { step: 6, variables: { x: '2', cur: '5', best: '5' }, explanation: '子数组 [4, -1, 2] 和 = 5，best 更新' },
      { step: 7, variables: { x: '1', cur: '6', best: '6' }, explanation: '子数组 [4, -1, 2, 1] 和 = 6，最大！' },
      { step: 8, variables: { x: '-5', cur: '1', best: '6' }, explanation: '遇到 -5 但最佳仍为 6' },
      { step: 9, variables: { x: '4', cur: '5', best: '6' }, explanation: '最终结果为 6', isResult: true },
    ],
  },
]
```

- [ ] **Step 2: Create data/problems/index.ts**

```typescript
import { Problem, CategoryName } from '../types'
import { arrayProblems } from './array'

export const problemsByCategory: Record<CategoryName, Problem[]> = {
  array: arrayProblems,
  'linked-list': [],
  tree: [],
  graph: [],
  dp: [],
  backtracking: [],
  greedy: [],
  'stack-queue': [],
  'hash-table': [],
  'two-pointers': [],
  'sliding-window': [],
  'binary-search': [],
  heap: [],
  'bit-manipulation': [],
  matrix: [],
}

export const problemMap: Record<number, Problem> = {}
for (const problems of Object.values(problemsByCategory)) {
  for (const p of problems) {
    problemMap[p.id] = p
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
```

- [ ] **Step 3: Create ProblemCard**

```typescript
import { Link } from 'react-router-dom'
import { Problem } from '../../data/types'
import styles from './ProblemCard.module.css'

interface Props {
  problem: Problem
}

const diffLabel = { easy: '简单', medium: '中等', hard: '困难' } as const
const diffClass = { easy: styles.easy, medium: styles.medium, hard: styles.hard } as const

export default function ProblemCard({ problem }: Props) {
  return (
    <Link to={`/problem/${problem.id}`} className={styles.card}>
      <span className={styles.id}>#{problem.id}</span>
      <span className={styles.title}>{problem.title}</span>
      <span className={`${styles.diff} ${diffClass[problem.difficulty]}`}>{diffLabel[problem.difficulty]}</span>
      <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className={styles.link}
         onClick={e => e.stopPropagation()}>
        LeetCode →
      </a>
    </Link>
  )
}
```

```css
.card {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.2s, background 0.2s;
  gap: 12px;
}

.card:hover {
  border-color: var(--accent);
  background: var(--accent-light);
  text-decoration: none;
}

.id {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 36px;
}

.title { flex: 1; font-weight: 500; }

.diff {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 99px;
}

.easy { background: var(--easy-bg); color: var(--easy); }
.medium { background: var(--medium-bg); color: var(--medium); }
.hard { background: var(--hard-bg); color: var(--hard); }

.link {
  font-size: 12px;
  white-space: nowrap;
}
```

- [ ] **Step 4: Create Category page**

```typescript
import { useParams, Link } from 'react-router-dom'
import { categoryList, getCategoryCount, getCategoryDifficultyCounts, problemsByCategory } from '../data'
import type { CategoryName } from '../data/types'
import ProblemCard from '../components/ProblemCard/ProblemCard'
import styles from './pages.module.css'

export default function Category() {
  const { category } = useParams<{ category: string }>()
  const meta = categoryList.find(c => c.name === category)
  if (!meta || !category) {
    return (
      <main className={styles.home}>
        <p>分类不存在</p>
        <Link to="/">返回首页</Link>
      </main>
    )
  }

  const problems = problemsByCategory[category as CategoryName] || []
  const counts = getCategoryDifficultyCounts(category as CategoryName)

  return (
    <main className={styles.home}>
      <Link to="/" className={styles.back}>← 返回首页</Link>
      <div className={styles.categoryHeader}>
        <div className={styles.catLabel} style={{ background: meta.gradient }}>{meta.label}</div>
        <div className={styles.catStats}>
          共 {getCategoryCount(category as CategoryName)} 题 ·
          {counts.easy > 0 && <span className={styles.easy}>简单 {counts.easy}</span>}
          {counts.medium > 0 && <span className={styles.medium}>中等 {counts.medium}</span>}
          {counts.hard > 0 && <span className={styles.hard}>困难 {counts.hard}</span>}
        </div>
      </div>
      <div className={styles.problemList}>
        {problems.length === 0 && <p className={styles.empty}>暂无题目数据</p>}
        {problems.map(p => <ProblemCard key={p.id} problem={p} />)}
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Update pages.module.css**

```css
/* append to existing */
.back { display: inline-block; font-size: 14px; margin-bottom: 20px; }

.categoryHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.catLabel {
  padding: 8px 20px;
  border-radius: var(--radius);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
}

.catStats { font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }
.catStats span { padding: 1px 8px; border-radius: 99px; font-size: 11px; }
.easy { background: var(--easy-bg); color: var(--easy); }
.medium { background: var(--medium-bg); color: var(--medium); }
.hard { background: var(--hard-bg); color: var(--hard); }

.problemList { display: flex; flex-direction: column; gap: 8px; }

.empty {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
  font-size: 14px;
}
```

- [ ] **Step 6: Add category route to App.tsx**

```typescript
// Add import
import Category from './pages/Category'

// Add route inside <Routes>
<Route path="/category/:category" element={<Category />} />
```

---

### Task 6: CodeBlock Component

**Files:**
- Create: `src/components/CodeBlock/CodeBlock.tsx`
- Create: `src/components/CodeBlock/CodeBlock.module.css`

- [ ] **Step 1: Create CodeBlock**

```typescript
import { useState } from 'react'
import styles from './CodeBlock.module.css'

interface Props {
  code: { cpp: string; rust: string }
}

type Lang = 'cpp' | 'rust'

export default function CodeBlock({ code }: Props) {
  const [lang, setLang] = useState<Lang>('cpp')

  return (
    <div className={styles.block}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${lang === 'cpp' ? styles.active : ''}`}
          onClick={() => setLang('cpp')}
        >
          C++
        </button>
        <button
          className={`${styles.tab} ${lang === 'rust' ? styles.active : ''}`}
          onClick={() => setLang('rust')}
        >
          Rust
        </button>
      </div>
      <pre className={styles.code}><code>{code[lang]}</code></pre>
    </div>
  )
}
```

```css
.block {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
}

.tab {
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  transition: color 0.2s;
}

.tab.active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}

.tab:hover { color: var(--text); }

.code {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 16px 20px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  line-height: 1.7;
  overflow-x: auto;
  margin: 0;
}
```

---

### Task 7: Visualizer Engine + 5 Visualizers

**Files:**
- Create: `src/components/Visualizer/Visualizer.tsx`
- Create: `src/components/Visualizer/ControlBar.tsx`
- Create: `src/components/Visualizer/Visualizer.module.css`
- Create: `src/components/Visualizer/ArrayVisualizer.tsx`
- Create: `src/components/Visualizer/PointerVisualizer.tsx`
- Create: `src/components/Visualizer/LinkedListVisualizer.tsx`
- Create: `src/components/Visualizer/TreeVisualizer.tsx`
- Create: `src/components/Visualizer/MatrixVisualizer.tsx`

- [ ] **Step 1: Create ControlBar**

```typescript
import styles from './Visualizer.module.css'

interface Props {
  currentStep: number
  totalSteps: number
  playing: boolean
  onPrev: () => void
  onNext: () => void
  onPlayToggle: () => void
  onFirst: () => void
  onLast: () => void
}

export default function ControlBar({ currentStep, totalSteps, playing, onPrev, onNext, onPlayToggle, onFirst, onLast }: Props) {
  return (
    <div className={styles.controls}>
      <button onClick={onFirst} disabled={currentStep === 0} title="第一步">⏮</button>
      <button onClick={onPrev} disabled={currentStep === 0} title="上一步">⏪</button>
      <button onClick={onPlayToggle} className={styles.playBtn} title={playing ? '暂停' : '播放'}>
        {playing ? '⏸' : '▶'}
      </button>
      <button onClick={onNext} disabled={currentStep === totalSteps - 1} title="下一步">⏩</button>
      <button onClick={onLast} disabled={currentStep === totalSteps - 1} title="最后一步">⏭</button>
      <span className={styles.stepInfo}>步骤 {currentStep + 1}/{totalSteps}</span>
    </div>
  )
}
```

- [ ] **Step 2: Create ArrayVisualizer**

```typescript
import styles from './Visualizer.module.css'

interface Props {
  nums: number[]
  highlights: number[]
  pointers?: { label: string; pos: number }[]
}

export default function ArrayVisualizer({ nums, highlights, pointers }: Props) {
  return (
    <div className={styles.arrayContainer}>
      <div className={styles.pointerRow}>
        {pointers?.map(p => (
          <div key={p.label} className={styles.pointer}
               style={{ marginLeft: `${p.pos * 64 + 20}px` }}>
            {p.label}↓
          </div>
        ))}
      </div>
      <div className={styles.arrayRow}>
        {nums.map((val, i) => (
          <div key={i} className={`${styles.cell} ${highlights.includes(i) ? styles.highlight : ''}`}>
            {val}
          </div>
        ))}
      </div>
      <div className={styles.indexRow}>
        {nums.map((_, i) => <div key={i} className={styles.index}>{i}</div>)}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create PointerVisualizer** (array + current window)

```typescript
import styles from './Visualizer.module.css'

interface Props {
  nums: number[]
  highlights: number[]
  pointers?: { label: string; pos: number }[]
  windowRange?: [number, number]
}

export default function PointerVisualizer({ nums, highlights, pointers, windowRange }: Props) {
  return (
    <div className={styles.arrayContainer}>
      {windowRange && (
        <div className={styles.windowBar}>
          <div className={styles.window}
               style={{ marginLeft: `${windowRange[0] * 64}px`, width: `${(windowRange[1] - windowRange[0] + 1) * 64}px` }}>
            窗口
          </div>
        </div>
      )}
      <div className={styles.pointerRow}>
        {pointers?.map(p => (
          <div key={p.label} className={styles.pointer}
               style={{ marginLeft: `${p.pos * 64 + 20}px` }}>
            {p.label}↓
          </div>
        ))}
      </div>
      <div className={styles.arrayRow}>
        {nums.map((val, i) => (
          <div key={i} className={`${styles.cell} ${highlights.includes(i) ? styles.highlight : ''}`}>
            {val}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create LinkedListVisualizer**

```typescript
import styles from './Visualizer.module.css'

interface ListNode {
  val: number
  next?: ListNode
}

interface Props {
  head: ListNode | null
  highlights: number[]
  pointers?: { label: string; pos: number }[]
}

function flatten(node: ListNode | null): number[] {
  const result: number[] = []
  while (node) { result.push(node.val); node = node.next }
  return result
}

export default function LinkedListVisualizer({ head, highlights, pointers }: Props) {
  const values = flatten(head)
  return (
    <div className={styles.arrayContainer}>
      <div className={styles.pointerRow}>
        {pointers?.map(p => (
          <div key={p.label} className={styles.pointer}
               style={{ marginLeft: `${p.pos * 80 + 28}px` }}>
            {p.label}↓
          </div>
        ))}
      </div>
      <div className={styles.arrayRow}>
        {values.map((val, i) => (
          <div key={i} className={styles.listGroup}>
            <div className={`${styles.listNode} ${highlights.includes(i) ? styles.highlight : ''}`}>
              {val}
            </div>
            {i < values.length - 1 && <span className={styles.arrow}>→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create TreeVisualizer**

```typescript
import styles from './Visualizer.module.css'

interface TreeNode {
  val: number
  left?: TreeNode
  right?: TreeNode
}

interface Props {
  root: TreeNode | null
  highlights: number[]
}

function getLevels(node: TreeNode | null): (number | null)[][] {
  const levels: (number | null)[][] = []
  if (!node) return levels
  let queue: (TreeNode | null)[] = [node]
  while (queue.some(Boolean)) {
    const row: (number | null)[] = []
    const next: (TreeNode | null)[] = []
    for (const n of queue) {
      if (n) {
        row.push(n.val)
        next.push(n.left ?? null)
        next.push(n.right ?? null)
      } else {
        row.push(null)
      }
    }
    if (row.some(v => v !== null)) levels.push(row)
    queue = next
  }
  return levels
}

export default function TreeVisualizer({ root, highlights }: Props) {
  const levels = getLevels(root)
  return (
    <div className={styles.treeContainer}>
      {levels.map((row, li) => (
        <div key={li} className={styles.treeRow} style={{ gap: `${Math.max(4, 40 - li * 8)}px` }}>
          {row.map((val, vi) => (
            <div key={vi} className={`${styles.treeNode} ${val !== null && highlights.includes(val) ? styles.highlight : ''} ${val === null ? styles.null : ''}`}>
              {val !== null ? val : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Create MatrixVisualizer**

```typescript
import styles from './Visualizer.module.css'

interface Props {
  matrix: number[][]
  highlights: number[]
}

export default function MatrixVisualizer({ matrix, highlights }: Props) {
  const flatIdx = (r: number, c: number) => r * (matrix[0]?.length ?? 1) + c
  return (
    <div className={styles.matrixContainer}>
      {matrix.map((row, ri) => (
        <div key={ri} className={styles.matrixRow}>
          {row.map((val, ci) => (
            <div key={ci} className={`${styles.matrixCell} ${highlights.includes(flatIdx(ri, ci)) ? styles.highlight : ''}`}>
              {val}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 7: Create Visualizer (main dispatcher)**

```typescript
import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimationStep, VisualizerType } from '../../data/types'
import ControlBar from './ControlBar'
import ArrayVisualizer from './ArrayVisualizer'
import PointerVisualizer from './PointerVisualizer'
import LinkedListVisualizer from './LinkedListVisualizer'
import TreeVisualizer from './TreeVisualizer'
import MatrixVisualizer from './MatrixVisualizer'
import styles from './Visualizer.module.css'

interface Props {
  steps: AnimationStep[]
  visualizerType: VisualizerType
}

export default function Visualizer({ steps, visualizerType }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)

  const step = steps[currentStep] || steps[0]
  const data = step?.data ?? {}
  const highlights = step?.highlights ?? []
  const pointers = step?.pointers

  const next = useCallback(() => {
    setCurrentStep(s => Math.min(s + 1, steps.length - 1))
  }, [steps.length])

  const prev = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0))
  }, [])

  const playToggle = useCallback(() => {
    setPlaying(p => !p)
  }, [])

  const first = useCallback(() => setCurrentStep(0), [])
  const last = useCallback(() => setCurrentStep(steps.length - 1), [steps.length])

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setTimeout(() => {
        if (currentStep < steps.length - 1) next()
        else setPlaying(false)
      }, 1500)
    }
    return () => { if (timerRef.current !== null) window.clearTimeout(timerRef.current) }
  }, [playing, currentStep, steps.length, next])

  useEffect(() => {
    setCurrentStep(0)
    setPlaying(false)
  }, [steps])

  const renderVisualizer = () => {
    switch (visualizerType) {
      case 'array':
        return <ArrayVisualizer nums={(data.nums ?? data.matrix) as number[]} highlights={highlights} pointers={pointers} />
      case 'pointer':
        return <PointerVisualizer nums={data.nums as number[]} highlights={highlights} pointers={pointers} windowRange={data.windowRange as [number, number]} />
      case 'linked-list':
        return <LinkedListVisualizer head={data.head as never} highlights={highlights} pointers={pointers} />
      case 'tree':
        return <TreeVisualizer root={data.root as never} highlights={highlights} />
      case 'matrix':
        return <MatrixVisualizer matrix={data.matrix as number[][]} highlights={highlights} />
    }
  }

  return (
    <div className={styles.visualizer}>
      {renderVisualizer()}
      <p className={styles.description}>{step?.description ?? ''}</p>
      <ControlBar
        currentStep={currentStep} totalSteps={steps.length}
        playing={playing} onPrev={prev} onNext={next}
        onPlayToggle={playToggle} onFirst={first} onLast={last}
      />
    </div>
  )
}
```

- [ ] **Step 8: Create Visualizer.module.css**

```css
.visualizer {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.description {
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
  margin: 16px 0 12px;
  min-height: 20px;
}

/* Controls */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.controls button {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 16px;
  transition: background 0.2s, opacity 0.2s;
}

.controls button:hover:not(:disabled) { background: var(--bg-secondary); }
.controls button:disabled { opacity: 0.3; cursor: default; }

.playBtn {
  background: var(--accent) !important;
  color: #fff;
  border-radius: 50% !important;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.stepInfo {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 12px;
  min-width: 80px;
}

/* Array / pointer */
.arrayContainer { padding: 8px 0; }

.pointerRow { display: flex; height: 24px; }
.pointer { font-size: 12px; color: var(--accent); font-weight: 600; white-space: nowrap; width: 64px; }

.arrayRow, .matrixRow { display: flex; justify-content: center; gap: 8px; }

.cell, .listNode {
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s;
}

.cell.highlight, .listNode.highlight {
  border-color: var(--accent);
  background: var(--accent-light);
  color: var(--accent);
  box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
  transform: translateY(-4px);
}

.indexRow { display: flex; justify-content: center; gap: 8px; margin-top: 4px; }
.index { width: 56px; text-align: center; font-size: 11px; color: var(--text-muted); }

/* Window bar */
.windowBar { height: 22px; display: flex; }
.window {
  height: 22px;
  background: var(--accent-light);
  border: 1px dashed var(--accent);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--accent);
  transition: all 0.3s;
}

/* Linked list */
.listGroup { display: flex; align-items: center; }
.listNode { border-radius: 50%; }
.arrow { font-size: 18px; color: var(--text-muted); margin: 0 4px; }

/* Tree */
.treeContainer { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 8px 0; }
.treeRow { display: flex; justify-content: center; }
.treeNode {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  border-radius: 50%;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s;
}
.treeNode.highlight {
  border-color: var(--accent);
  background: var(--accent-light);
  color: var(--accent);
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}
.treeNode.null {
  border: 1px dashed var(--border);
  background: transparent;
}

/* Matrix */
.matrixContainer { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px 0; }
.matrixRow { display: flex; gap: 6px; }
.matrixCell {
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s;
}
.matrixCell.highlight {
  border-color: var(--accent);
  background: var(--accent-light);
  color: var(--accent);
}
```

---

### Task 8: WalkthroughTable Component

**Files:**
- Create: `src/components/Walkthrough/WalkthroughTable.tsx`
- Create: `src/components/Walkthrough/Walkthrough.module.css`

- [ ] **Step 1: Create component**

```typescript
import { WalkthroughEntry } from '../../data/types'
import styles from './Walkthrough.module.css'

interface Props {
  entries: WalkthroughEntry[]
}

export default function WalkthroughTable({ entries }: Props) {
  if (entries.length === 0) return null
  const varKeys = Object.keys(entries[0].variables)

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>步骤</th>
            {varKeys.map(k => <th key={k}>{k}</th>)}
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className={e.isResult ? styles.result : ''}>
              <td>{e.isResult ? '✓' : e.step}</td>
              {varKeys.map(k => <td key={k}>{e.variables[k] ?? '-''}</td>)}
              <td className={styles.explain}>{e.explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

```css
.wrapper {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table th {
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-light);
}

.result {
  background: var(--easy-bg);
}

.result td {
  font-weight: 600;
  color: var(--easy);
}

.explain {
  color: var(--text-muted);
  font-size: 12px;
}
```

---

### Task 9: Problem Detail Page

**Files:**
- Create: `src/pages/Problem.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Problem page**

```typescript
import { useParams, Link } from 'react-router-dom'
import { problemMap } from '../data'
import CodeBlock from '../components/CodeBlock/CodeBlock'
import Visualizer from '../components/Visualizer/Visualizer'
import WalkthroughTable from '../components/Walkthrough/WalkthroughTable'
import styles from './pages.module.css'

const diffLabel = { easy: '简单', medium: '中等', hard: '困难' } as const
const diffClass = { easy: styles.easyBadge, medium: styles.mediumBadge, hard: styles.hardBadge } as const

export default function Problem() {
  const { id } = useParams<{ id: string }>()
  const problem = problemMap[Number(id)]

  if (!problem) {
    return (
      <main className={styles.home}>
        <p>题目不存在</p>
        <Link to="/">返回首页</Link>
      </main>
    )
  }

  return (
    <main className={styles.problemPage}>
      <Link to={`/category/${problem.category}`} className={styles.back}>← 返回分类</Link>

      <div className={styles.problemHeader}>
        <div>
          <span className={styles.problemId}>#{problem.id}</span>
          <span className={styles.problemTitle}>{problem.title}</span>
          <span className={`${styles.badge} ${diffClass[problem.difficulty]}`}>{diffLabel[problem.difficulty]}</span>
        </div>
        <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className={styles.leetcodeLink}>
          LeetCode 原题 →
        </a>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📝 题解代码</h2>
        <CodeBlock code={problem.code} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🔄 算法可视化</h2>
        <p className={styles.ioInfo}>
          <strong>输入:</strong> {problem.input}
        </p>
        <Visualizer steps={problem.animationSteps} visualizerType={problem.visualizerType} />
        <p className={styles.ioInfo}>
          <strong>输出:</strong> {problem.output}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📊 运算过程</h2>
        <WalkthroughTable entries={problem.walkthrough} />
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Add Problem page styles to pages.module.css**

```css
.problemPage {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 24px 20px 60px;
}

.problemHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.problemId {
  font-size: 14px;
  color: var(--text-muted);
  margin-right: 10px;
}

.problemTitle {
  font-size: 22px;
  font-weight: 700;
  margin-right: 12px;
}

.badge {
  display: inline-block;
  padding: 2px 12px;
  border-radius: 99px;
  font-size: 12px;
  vertical-align: middle;
}

.easyBadge { background: var(--easy-bg); color: var(--easy); }
.mediumBadge { background: var(--medium-bg); color: var(--medium); }
.hardBadge { background: var(--hard-bg); color: var(--hard); }

.leetcodeLink {
  font-size: 13px;
}

.section {
  margin-bottom: 32px;
}

.sectionTitle {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.ioInfo {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 12px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.ioInfo strong { color: var(--text); }
```

- [ ] **Step 3: Add problem route to App.tsx**

```typescript
// Add import
import Problem from './pages/Problem'

// Add route
<Route path="/problem/:id" element={<Problem />} />
```

---

### Task 10: Build Verification

- [ ] **Step 1: Run build**

Run: `cd /path/to/hot100 && npx tsc --noEmit`
Expected: No type errors

Run: `npx vite build`
Expected: Build succeeds, outputs to `dist/`

- [ ] **Step 2: Quick preview**

Run: `npx vite preview`
Expected: Opens local server. Navigate homepage, click category card, click problem, see code + animation + walkthrough.
