import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimationStep, VisualizerType } from '../../data/types'
import ControlBar from './ControlBar'
import ArrayVisualizer from './ArrayVisualizer'
import PointerVisualizer from './PointerVisualizer'
import LinkedListVisualizer from './LinkedListVisualizer'
import TreeVisualizer from './TreeVisualizer'
import MatrixVisualizer from './MatrixVisualizer'
import styles from './Visualizer.module.css'

interface Props {
  steps: AnimationStep[]
  visualizerType: VisualizerType
}

export default function Visualizer({ steps, visualizerType }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)

  if (!steps || steps.length === 0) {
    return (
      <div className={styles.visualizer}>
        <p className={styles.description}>暂无动画数据</p>
      </div>
    )
  }

  const step = steps[currentStep] || steps[0]
  const data = step?.data ?? {}
  const highlights = step?.highlights ?? []
  const pointers = step?.pointers

  const next = useCallback(() => {
    setCurrentStep(s => Math.min(s + 1, steps.length - 1))
  }, [steps.length])

  const prev = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0))
  }, [])

  const playToggle = useCallback(() => {
    setPlaying(p => !p)
  }, [])

  const first = useCallback(() => setCurrentStep(0), [])
  const last = useCallback(() => setCurrentStep(steps.length - 1), [steps.length])

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setTimeout(() => {
        if (currentStep < steps.length - 1) next()
        else setPlaying(false)
      }, 1500)
    }
    return () => { if (timerRef.current !== null) window.clearTimeout(timerRef.current) }
  }, [playing, currentStep, steps.length, next])

  useEffect(() => {
    setCurrentStep(0)
    setPlaying(false)
  }, [steps])

  const renderVisualizer = () => {
    switch (visualizerType) {
      case 'array':
        return <ArrayVisualizer nums={(data.nums ?? data.matrix) as number[]} highlights={highlights} pointers={pointers} />
      case 'pointer':
        return <PointerVisualizer nums={data.nums as number[]} highlights={highlights} pointers={pointers} windowRange={data.windowRange as [number, number]} />
      case 'linked-list':
        return <LinkedListVisualizer head={(data.head ?? data.list ?? data.l1 ?? data.result) as never} highlights={highlights} pointers={pointers} />
      case 'tree':
        return <TreeVisualizer root={data.root as never} highlights={highlights} />
      case 'matrix':
        return <MatrixVisualizer matrix={data.matrix as number[][]} highlights={highlights} />
    }
  }

  return (
    <div className={styles.visualizer}>
      {renderVisualizer()}
      <p className={styles.description}>{step?.description ?? ''}</p>
      <ControlBar
        currentStep={currentStep} totalSteps={steps.length}
        playing={playing} onPrev={prev} onNext={next}
        onPlayToggle={playToggle} onFirst={first} onLast={last}
      />
    </div>
  )
}
