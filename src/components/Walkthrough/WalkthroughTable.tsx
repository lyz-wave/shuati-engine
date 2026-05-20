import { WalkthroughEntry } from '../../data/types'
import styles from './Walkthrough.module.css'

interface Props {
  entries: WalkthroughEntry[]
}

export default function WalkthroughTable({ entries }: Props) {
  if (entries.length === 0) return null
  const varKeys = Object.keys(entries[0].variables)

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>步骤</th>
            {varKeys.map(k => <th key={k}>{k}</th>)}
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className={e.isResult ? styles.result : ''}>
              <td>{e.isResult ? '✓' : e.step}</td>
              {varKeys.map(k => <td key={k}>{e.variables[k] ?? '-'}</td>)}
              <td className={styles.explain}>{e.explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
