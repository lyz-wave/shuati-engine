import { useMemo, useState } from 'react'
import styles from './CodeBlock.module.css'

interface Props {
  code: { cpp: string; rust: string }
}

type Lang = 'cpp' | 'rust'

// 极简语法高亮：关键字、数字、字符串、注释
function highlight(code: string, lang: Lang): string {
  const keywords = lang === 'cpp'
    ? /\b(class|public|private|protected|int|vector|unordered_map|for|if|else|return|auto|size)\b/g
    : /\b(impl|fn|pub|mut|let|for|if|else|return|Some|None|HashMap|Vec|i32|usize)\b/g

  const typeKeywords = lang === 'cpp'
    ? /\b(Solution)\b/g
    : /\b(Solution)\b/g

  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 注释优先（// 和 /* */）
  escaped = escaped.replace(/(\/\/.*)/g, '<span style="color:#6c7086">$1</span>')
  escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6c7086">$1</span>')

  // 字符串
  escaped = escaped.replace(/(&quot;.*?&quot;|'.*?')/g, '<span style="color:#a6e3a1">$1</span>')

  // 数字
  escaped = escaped.replace(/\b(\d+)\b/g, '<span style="color:#fab387">$1</span>')

  // 类型关键字
  escaped = escaped.replace(typeKeywords, '<span style="color:#89b4fa">$1</span>')

  // 关键字
  escaped = escaped.replace(keywords, '<span style="color:#cba6f7">$1</span>')

  return escaped
}

export default function CodeBlock({ code }: Props) {
  const [lang, setLang] = useState<Lang>('cpp')

  const html = useMemo(() => highlight(code[lang], lang), [code, lang])

  return (
    <div className={styles.block}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${lang === 'cpp' ? styles.active : ''}`}
          onClick={() => setLang('cpp')}
        >
          C++
        </button>
        <button
          className={`${styles.tab} ${lang === 'rust' ? styles.active : ''}`}
          onClick={() => setLang('rust')}
        >
          Rust
        </button>
      </div>
      <pre className={styles.code}><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </div>
  )
}
