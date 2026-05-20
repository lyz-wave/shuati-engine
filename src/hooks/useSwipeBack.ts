import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const THRESHOLD = 80

export function useSwipeBack() {
  const navigate = useNavigate()
  const startX = useRef(0)
  const startY = useRef(0)

  useEffect(() => {
    const handler = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      if (e.type === 'touchstart') {
        startX.current = touch.screenX
        startY.current = touch.screenY
        return
      }
      if (e.type === 'touchend') {
        const dx = touch.screenX - startX.current
        const dy = touch.screenY - startY.current
        // 右滑超过阈值，且纵向偏移不大（避免误触滚动）
        if (dx > THRESHOLD && Math.abs(dy) < Math.abs(dx) * 1.5) {
          navigate(-1)
        }
        // 左滑超过阈值（可选前进）
        if (dx < -THRESHOLD && Math.abs(dy) < Math.abs(dx) * 1.5) {
          navigate(1)
        }
      }
    }

    document.addEventListener('touchstart', handler, { passive: true })
    document.addEventListener('touchend', handler, { passive: true })
    return () => {
      document.removeEventListener('touchstart', handler)
      document.removeEventListener('touchend', handler)
    }
  }, [navigate])
}
