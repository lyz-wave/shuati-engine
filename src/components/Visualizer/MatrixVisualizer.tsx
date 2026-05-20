import styles from './Visualizer.module.css'

interface Props {
  matrix: number[][]
  highlights: number[]
}

export default function MatrixVisualizer({ matrix, highlights }: Props) {
  const flatIdx = (r: number, c: number) => r * (matrix[0]?.length ?? 1) + c
  return (
    <div className={styles.matrixContainer}>
      {matrix.map((row, ri) => (
        <div key={ri} className={styles.matrixRow}>
          {row.map((val, ci) => (
            <div key={ci} className={`${styles.matrixCell} ${highlights.includes(flatIdx(ri, ci)) ? styles.highlight : ''}`}>
              {val}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
