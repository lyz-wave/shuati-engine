import { Link } from 'react-router-dom'
import styles from './CategoryCard.module.css'

interface Props {
  name: string
  label: string
  gradient: string
  count: number
  difficultyCounts: { easy: number; medium: number; hard: number }
  style?: { animationDelay?: string }
}

export default function CategoryCard({ name, label, gradient, count, difficultyCounts, style }: Props) {
  return (
    <Link to={`/category/${name}`} className={styles.card} style={style}>
      <div className={styles.bg} style={{ background: gradient }} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <div className={styles.right}>
          <span className={styles.count}>
            {count}
            <span className={styles.countSuffix}> 题</span>
          </span>
          {count > 0 && (
            <div className={styles.badges}>
              {difficultyCounts.easy > 0 && <span className={styles.easy}>{difficultyCounts.easy}</span>}
              {difficultyCounts.medium > 0 && <span className={styles.medium}>{difficultyCounts.medium}</span>}
              {difficultyCounts.hard > 0 && <span className={styles.hard}>{difficultyCounts.hard}</span>}
            </div>
          )}
          <span className={styles.arrow}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
