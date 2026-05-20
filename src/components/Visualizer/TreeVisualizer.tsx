import styles from './Visualizer.module.css'

interface TreeNode {
  val: number
  left?: TreeNode
  right?: TreeNode
}

interface Props {
  root: TreeNode | null
  highlights: number[]
}

function getLevels(node: TreeNode | null): (number | null)[][] {
  const levels: (number | null)[][] = []
  if (!node) return levels
  let queue: (TreeNode | null)[] = [node]
  while (queue.some(Boolean)) {
    const row: (number | null)[] = []
    const next: (TreeNode | null)[] = []
    for (const n of queue) {
      if (n) {
        row.push(n.val)
        next.push(n.left ?? null)
        next.push(n.right ?? null)
      } else {
        row.push(null)
      }
    }
    if (row.some(v => v !== null)) levels.push(row)
    queue = next
  }
  return levels
}

export default function TreeVisualizer({ root, highlights = [] }: Props) {
  const levels = getLevels(root)
  return (
    <div className={styles.treeContainer}>
      {levels.map((row, li) => (
        <div key={li} className={styles.treeRow} style={{ gap: `${Math.max(4, 40 - li * 8)}px` }}>
          {row.map((val, vi) => (
            <div key={vi} className={`${styles.treeNode} ${val !== null && highlights.includes(val) ? styles.highlight : ''} ${val === null ? styles.null : ''}`}>
              {val !== null ? val : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
