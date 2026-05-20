# LeetCode Hot 100 题解可视化网站

> 按算法范式分类，可视化理解每道题 — 傻子都能看懂的题解

## 🚀 在线地址

> [leetcode-hot100.vercel.app](https://leetcode-hot100.vercel.app)（待部署）

## 📖 项目简介

将 LeetCode Hot 100 热门题目按 **15 种算法范式** 分类，每道题提供：

- **C++ / Rust 双语言题解** — 带生动中文注释，白话文解释
- **步骤式动画演示** — 5 种 Visualizer（数组、双指针、链表、树、矩阵）
- **运算过程追踪表** — 每一步变量变化一目了然
- **暗/亮主题切换** — 代码风格编辑器暗色背景

## 🧩 分类体系

| 分类 | 题数 | 分类 | 题数 |
|------|------|------|------|
| 数组 | 12 | 双指针 | 5 |
| 链表 | 8 | 滑动窗口 | 4 |
| 树 | 10 | 二分查找 | 6 |
| 图 | 5 | 堆 | 4 |
| 动态规划 | 15 | 位运算 | 3 |
| 回溯 | 6 | 矩阵 | 3 |
| 贪心 | 5 | **总计** | **100** |
| 栈/队列 | 8 | | |
| 哈希表 | 6 | | |

## 🛠 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 路由 | React Router v6 |
| 样式 | CSS Modules + CSS Variables |
| 动画 | DOM + CSS Transition |
| 移动端 | Capacitor（Android APK） |

## 📁 项目结构

```
src/
├── data/
│   ├── types.ts             # 核心类型定义
│   ├── categories.ts        # 15 个分类元信息
│   └── problems/            # 100 道题目数据
│       ├── array.ts         # 数组 (12 题)
│       ├── linked-list.ts   # 链表 (8 题)
│       ├── tree.ts          # 树 (10 题)
│       ├── dp.ts            # 动态规划 (15 题)
│       └── ...              # 其他分类
├── components/
│   ├── Visualizer/          # 动画引擎 (5 种 Visualizer)
│   ├── CodeBlock/           # C++/Rust 代码切换
│   ├── Walkthrough/         # 运算过程表格
│   └── Layout/              # Header + 主题切换
└── pages/
    ├── Home.tsx             # 首页分类列表
    ├── Category.tsx         # 分类题目列表
    └── Problem.tsx          # 题目详情页
```

## 🏃 本地运行

```bash
npm install
npm run dev        # 启动开发服务器 (http://localhost:5173)
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
```

## 📱 构建 Android APK

```bash
npm install
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

> 需要 JDK 21 和 Android SDK。Android Studio 可选。

## 🎨 设计特点

- **Codex 视觉系统** — 深色点阵背景 + 渐变品牌色 + 圆角卡片
- **分类卡片** — 渐变色填满卡片 + 半透明叠加层
- **入场动画** — 逐项 fadeInUp 错开显现
- **响应式** — 桌面 + 移动端自适应

## 📄 License

MIT
