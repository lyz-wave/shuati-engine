import styles from './Visualizer.module.css'

interface ListNode {
  val: number
  next: ListNode | null
}

interface Props {
  head: ListNode | null
  highlights: number[]
  pointers?: { label: string; pos: number }[]
}

function flatten(node: ListNode | null): number[] {
  const result: number[] = []
  while (node) { result.push(node.val); node = node.next }
  return result
}

export default function LinkedListVisualizer({ head, highlights, pointers }: Props) {
  const values = flatten(head)
  return (
    <div className={styles.arrayContainer}>
      <div className={styles.pointerRow}>
        {pointers?.map(p => (
          <div key={p.label} className={styles.pointer}
               style={{ marginLeft: `${p.pos * 80 + 28}px` }}>
            {p.label}↓
          </div>
        ))}
      </div>
      <div className={styles.arrayRow}>
        {values.map((val, i) => (
          <div key={i} className={styles.listGroup}>
            <div className={`${styles.listNode} ${highlights.includes(i) ? styles.highlight : ''}`}>
              {val}
            </div>
            {i < values.length - 1 && <span className={styles.arrow}>→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
