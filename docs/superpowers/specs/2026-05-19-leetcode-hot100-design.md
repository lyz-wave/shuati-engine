# LeetCode Hot 100 题解网站 — 设计文档

## 1. 概述

构建一个 LeetCode Hot 100 题解可视化网站，将 100 道热门题目按算法范式分类，提供 C++/Rust 双语言题解、步骤式动画可视化、输入到输出的运算过程追踪。目标：傻子都能看懂的题解体验。

## 2. 技术栈

| 层级 | 选型 | 理由 |
|------|------|------|
| 框架 | React 18 + Vite + TypeScript | 组件化，交互密集，构建快 |
| 路由 | React Router v6 | SPA 轻量导航 |
| 样式 | CSS Modules + CSS Variables | 暗/亮主题切换，零依赖 |
| 动画 | DOM 元素 + CSS Transition | 100 题可批量实现，无额外 bundle |
| 语法高亮 | highlight.js 或 Prism.js 轻量化 | 代码展示 |
| 部署 | 静态站点（GitHub Pages / Vercel） | 纯前端，零后端 |

## 3. 分类体系

按算法范式分 15 类：

1. 数组 — 12 题
2. 链表 — 8 题
3. 树 — 10 题
4. 图 — 5 题
5. 动态规划 — 15 题
6. 回溯 — 6 题
7. 贪心 — 5 题
8. 栈/队列 — 8 题
9. 哈希表 — 6 题
10. 双指针 — 5 题
11. 滑动窗口 — 4 题
12. 二分查找 — 6 题
13. 堆 — 4 题
14. 位运算 — 3 题
15. 矩阵 — 3 题

（题数分布以实际 LeetCode Hot 100 列表为准）

## 4. 页面结构

### 4.1 首页（/）

- 顶部 Header：Logo、"LeetCode Hot 100" 标题、暗/亮主题切换按钮
- 15 个竖排卡片，每个卡片：
  - 全渐变背景，圆角 10px
  - 左侧分类名称
  - 右侧难度分布标签（简单/中等/困难计数）
  - 右箭头引导
  - 卡片宽度 max-width: 480px，居中
- 点击卡片 → /category/:category

### 4.2 分类详情页（/category/:category）

- 回首页导航
- 分类标题 + 统计
- 题目列表：每行显示题号、标题、难度标签、LeetCode 外链
- 点击题目 → /problem/:id

### 4.3 题目详情页（/problem/:id）

从上到下四个区域：

1. **题头**：题号 + 标题 + 难度标签 + LeetCode 链接
2. **代码块**：暗色代码背景，顶部 Tab 切换 C++ / Rust，行号，语法高亮
3. **可视化动画**：根据算法类型选择对应的 Visualizer，底部控制栏（上一步/播放/下一步 + 步骤计数）
4. **运算过程表**：表格追踪每一步的变量/数据结构变化，最终结果行绿色高亮

## 5. 核心数据模型

```typescript
interface Problem {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  leetcodeUrl: string
  category: string    // 分类名
  code: {
    cpp: string
    rust: string
  }
  animationSteps: AnimationStep[]   // 驱动动画
  walkthrough: WalkthroughEntry[]   // 运算过程表格
  input: string                     // 输入样例说明
  output: string                    // 输出结果说明
}

interface AnimationStep {
  description: string               // 本步骤文字说明
  highlights: number[]              // 需要高亮的元素索引
  data: Record<string, any>         // 当前步骤的数据快照
  pointers?: { label: string; pos: number }[]  // 指针位置（双指针等）
}

interface WalkthroughEntry {
  step: number
  variables: Record<string, string> // 变量键值对
  explanation: string              // 本步解释
  isResult?: boolean               // 是否为最终结果行
}
```

## 6. 可视化引擎

### 6.1 Visualizer 类型

按数据结构分 5 种 Visualizer，每种适配多类题目：

| Visualizer | 数据结构 | CSS 表现 | 适用算法 |
|-----------|---------|---------|---------|
| ArrayVisualizer | 一维数组 | 彩色格子，高亮 border/背景 | 数组、哈希表、二分查找 |
| PointerVisualizer | 数组 + 箭头 | 格子上方浮动指针标签 | 双指针、滑动窗口 |
| LinkedListVisualizer | 节点 + 连线 | 节点盒 + 水平箭头连接 | 链表 |
| TreeVisualizer | 树形结构 | 递归缩进或 CSS 树布局 | 树、回溯 |
| MatrixVisualizer | 二维网格 | 表格形态格子 | 矩阵、图、DP 表格 |

### 6.2 控制栏

统一控制接口：

```
interface VisualizerProps {
  steps: AnimationStep[]
  currentStep: number
  onStepChange: (step: number) => void
  playing: boolean
  onPlayToggle: () => void
}
```

控制栏组件：⏮ (first) | ⏪ (prev) | ▶/⏸ (play/pause) | ⏩ (next) | ⏭ (last) + "步骤 3/8"

## 7. 主题系统

使用 CSS Variables 实现暗/亮主题切换：

```css
:root {
  --bg: #ffffff;
  --bg-secondary: #f8fafc;
  --text: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --accent: #667eea;
}

[data-theme="dark"] {
  --bg: #1e1e2e;
  --bg-secondary: #181825;
  --text: #cdd6f4;
  --text-muted: #6c7086;
  --border: #313244;
  --accent: #89b4fa;
}
```

## 8. 性能与代码分割

- 按分类做 React.lazy() 懒加载数据，每个分类一个 chunk
- 首页首屏仅加载 15 个分类元信息（~2KB）
- Visualizer 组件按需渲染（仅当前题目对应的类型）

## 9. 非功能性需求

- 暗/亮主题持久化到 localStorage
- 所有动画步骤支持键盘左右键控制
- 响应式设计：桌面优先，移动端自适应卡片宽度
- 纯静态站点，无需后端服务器

## 10. 目录结构

```
hot100/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── data/
│   │   ├── index.ts
│   │   ├── categories/
│   │   │   ├── array.ts
│   │   │   ├── linked-list.ts
│   │   │   ├── tree.ts
│   │   │   ├── graph.ts
│   │   │   ├── dp.ts
│   │   │   ├── backtracking.ts
│   │   │   ├── greedy.ts
│   │   │   ├── stack-queue.ts
│   │   │   ├── hash-table.ts
│   │   │   ├── two-pointers.ts
│   │   │   ├── sliding-window.ts
│   │   │   ├── binary-search.ts
│   │   │   ├── heap.ts
│   │   │   ├── bit-manipulation.ts
│   │   │   └── matrix.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.css
│   │   ├── CategoryCard/
│   │   │   ├── CategoryCard.tsx
│   │   │   └── CategoryCard.module.css
│   │   ├── ProblemCard/
│   │   │   ├── ProblemCard.tsx
│   │   │   └── ProblemCard.module.css
│   │   ├── CodeBlock/
│   │   │   ├── CodeBlock.tsx
│   │   │   └── CodeBlock.module.css
│   │   ├── Visualizer/
│   │   │   ├── Visualizer.tsx
│   │   │   ├── ControlBar.tsx
│   │   │   ├── ControlBar.module.css
│   │   │   ├── ArrayVisualizer.tsx
│   │   │   ├── PointerVisualizer.tsx
│   │   │   ├── LinkedListVisualizer.tsx
│   │   │   ├── TreeVisualizer.tsx
│   │   │   └── MatrixVisualizer.tsx
│   │   └── Walkthrough/
│   │       ├── WalkthroughTable.tsx
│   │       └── WalkthroughTable.module.css
│   └── pages/
│       ├── Home.tsx
│       ├── Category.tsx
│       ├── Problem.tsx
│       └── pages.module.css
├── .superpowers/
│   └── brainstorm/ (gitignored)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-19-leetcode-hot100-design.md
```
