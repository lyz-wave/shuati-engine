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
