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
    <main className={styles.home} style={{ padding: '28px 24px 80px' }}>
      <Link to="/" className={styles.back}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        返回首页
      </Link>
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
        {problems.map((p, i) => (
          <div key={p.id} style={{ animation: `fadeInUp 0.4s ease both`, animationDelay: `${i * 0.06}s` }}>
            <ProblemCard problem={p} />
          </div>
        ))}
      </div>
    </main>
  )
}
