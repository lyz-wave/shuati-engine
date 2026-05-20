import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useSwipeBack } from './hooks/useSwipeBack'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import Category from './pages/Category'
import Problem from './pages/Problem'

export default function App() {
  const theme = useTheme()
  useSwipeBack()
  return (
    <>
      <Header theme={theme} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/problem/:id" element={<Problem />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}
