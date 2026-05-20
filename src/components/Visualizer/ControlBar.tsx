import styles from './Visualizer.module.css'

interface Props {
  currentStep: number
  totalSteps: number
  playing: boolean
  onPrev: () => void
  onNext: () => void
  onPlayToggle: () => void
  onFirst: () => void
  onLast: () => void
}

export default function ControlBar({ currentStep, totalSteps, playing, onPrev, onNext, onPlayToggle, onFirst, onLast }: Props) {
  return (
    <div className={styles.controls}>
      <button onClick={onFirst} disabled={currentStep === 0} title="第一步">⏮</button>
      <button onClick={onPrev} disabled={currentStep === 0} title="上一步">⏪</button>
      <button onClick={onPlayToggle} className={styles.playBtn} title={playing ? '暂停' : '播放'}>
        {playing ? '⏸' : '▶'}
      </button>
      <button onClick={onNext} disabled={currentStep === totalSteps - 1} title="下一步">⏩</button>
      <button onClick={onLast} disabled={currentStep === totalSteps - 1} title="最后一步">⏭</button>
      <span className={styles.stepInfo}>步骤 {currentStep + 1}/{totalSteps}</span>
    </div>
  )
}
