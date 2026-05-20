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
