import { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/pages.module.css'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() { return { hasError: true } }

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.home} style={{ padding: '60px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>出错了</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>
            页面加载异常，可能是题目数据不完整
          </p>
          <Link to="/" onClick={() => this.setState({ hasError: false })}
                style={{ padding: '8px 20px', borderRadius: 8, background: 'var(--accent)', color: '#fff', display: 'inline-block' }}>
            返回首页
          </Link>
        </main>
      )
    }
    return this.props.children
  }
}
