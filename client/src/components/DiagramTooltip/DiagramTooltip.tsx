import { FC, HTMLAttributes } from 'react'
import styles from './DiagramTooltip.module.scss'


interface ITooltip extends HTMLAttributes<HTMLDivElement> {
  isShowTooltip: boolean;
  tooltip: { label: string, value: number, x: number, y: number };
  max?: number;
}
export const DiagramTooltip: FC<ITooltip> = ({tooltip, max = 100, isShowTooltip, ...props}) => {
  return (
    <div className={`${styles.tooltip} ${isShowTooltip ? '' : styles.hidden}`} style={{top: tooltip.y - 45, left: tooltip.x - 46}} {...props}>
      <h4>{tooltip.label}</h4>
      <p>{tooltip.value}/{max}</p>
      <span className={styles.progress}>
        <span style={{width: `${tooltip.value / max * 100}%`}}></span>
      </span>
    </div>
  )
}