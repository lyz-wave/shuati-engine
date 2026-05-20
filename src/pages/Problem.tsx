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
      <Link to={`/category/${problem.category}`} className={styles.back}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        返回分类
      </Link>

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
