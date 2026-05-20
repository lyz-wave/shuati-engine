import { categoryList, getCategoryCount, getCategoryDifficultyCounts } from '../data'
import type { CategoryName } from '../data/types'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import styles from './pages.module.css'

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.titleAccent}>LeetCode</span> Hot 100
        </h1>
        <p className={styles.subtitle}>
          按算法范式分类，可视化理解每道题
        </p>
      </div>

      <div className={styles.statsBar}>
        <span className={styles.stat}>
          分类 <strong>{categoryList.length}</strong>
        </span>
        <span className={styles.statDivider} />
        <span className={styles.stat}>
          题目 <strong>100</strong>
        </span>
        <span className={styles.statDivider} />
        <span className={styles.stat}>
          语言 <strong>C++</strong> + <strong>Rust</strong>
        </span>
      </div>

      <div className={styles.cardList}>
        {categoryList.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            label={cat.label}
            gradient={cat.gradient}
            count={getCategoryCount(cat.name as CategoryName)}
            difficultyCounts={getCategoryDifficultyCounts(cat.name as CategoryName)}
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
    </main>
  )
}
