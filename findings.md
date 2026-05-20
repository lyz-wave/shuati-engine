# 发现记录

## 设计决策（执行后确认）
- **技术栈**: React 18 + Vite 5 + TypeScript 5, no extra deps beyond react-router-dom
- **主题系统**: CSS Variables + data-theme 属性切换，localStorage 持久化
- **动画引擎**: DOM 元素 + CSS Transition，5 种 Visualizer（Array/Pointer/LinkedList/Tree/Matrix）
- **数据模式**: TypeScript 模块内嵌 100 道题数据，按分类懒加载（计划），无后端
- **布局**: 首页竖排全渐变卡片（max-width 480px），分类页题目列表，详情页四块布局

## 技术约束
- 纯静态站点，可部署到 GitHub Pages / Vercel
- 全量构建 ~184KB JS（60KB gzipped）+ ~10KB CSS，首屏加载需要考虑按分类分割

## 踩坑记录
- `LinkedListVisualizer` 中 `ListNode.next` 类型应为 `ListNode | null` 而非 `?ListNode`，否则 flatten 函数的参数类型不兼容
- 代码质量审核发现缺少 `.gitignore` 和 `favicon`，已补上
- Home 页初始使用硬编码 `count={0}`，需在问题数据就绪后更新为真实计数
- WalkthroughTable 中 template literal 用了 `'-''` 导致语法错误（单引号内的额外单引号），已在实现中修复为 `'-'`

## 实现规模
- 已完成 10 个 Task，包含 25+ 个文件
- 2 个示例题目（两数之和 / 最大子数组和），包含完整 C++/Rust 代码 + 动画步骤 + 运算过程
- TypeScript 零错误，Vite 构建通过
