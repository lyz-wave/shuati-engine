import { useTheme } from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  theme: ReturnType<typeof useTheme>
}

declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}

export default function Header({ theme }: HeaderProps) {
  const isElectron = typeof window.electronAPI !== 'undefined'

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span className={styles.logoText}>Hot 100</span>
        </Link>

        <nav className={styles.nav}>
          <span className={styles.navHint}>算法可视化题解</span>
          <div className={styles.divider} />
          <button onClick={theme.toggleTheme} className={styles.themeBtn} title="切换主题">
            {theme.theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {isElectron && (
            <div className={styles.winControls}>
              <button className={styles.winBtn} onClick={() => window.electronAPI!.minimize()} title="最小化">
                <svg width="12" height="12" viewBox="0 0 12 12"><rect y="5" width="12" height="1.5" fill="currentColor" /></svg>
              </button>
              <button className={styles.winBtn} onClick={() => window.electronAPI!.maximize()} title="最大化">
                <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </button>
              <button className={`${styles.winBtn} ${styles.closeBtn}`} onClick={() => window.electronAPI!.close()} title="关闭">
                <svg width="12" height="12" viewBox="0 0 12 12"><line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" /><line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
            </div>
          )}
        </nav>
      </div>
      <div className={styles.gradientBar} />
    </header>
  )
}
