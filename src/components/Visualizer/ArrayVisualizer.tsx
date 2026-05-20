import styles from './Visualizer.module.css'

interface Props {
  nums: number[]
  highlights: number[]
  pointers?: { label: string; pos: number }[]
}

export default function ArrayVisualizer({ nums = [], highlights = [], pointers }: Props) {
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
