import { FC } from 'react'
import styles from './TotalProgressBar.module.scss';

interface ITotalProgressBarProps {
  count?: string
}

export const TotalProgressBar: FC<ITotalProgressBarProps> = ({count}) => {
  let progress: number = 100
  if (!count || parseInt(count) === 0) {
    count = '#0'
  } else if (parseInt(count) > 10000) {
    count = `#${count}`
  } else {
    progress = parseInt(count) / 100 // max 10000
  }

  const radius: number = 40
  const dash: number = radius * 2 * Math.PI
  return (
    <div className={styles.progressBar}>
      <svg
        width='114'
        height='123.896973'
        viewBox='0 0 114.026 123.897'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <linearGradient
            x1='23.426380'
            y1='50.537247'
            x2='136.974686'
            y2='109.312347'
            id='paint_linear_1_2565_0'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FD749B' />
            <stop offset='1.000000' stopColor='#281AC8' />
          </linearGradient>
          <linearGradient
            x1='58.771111'
            y1='50.222366'
            x2='83.476143'
            y2='-16.721245'
            id='paint_linear_1_2566_0'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FD749B' />
            <stop offset='1.000000' stopColor='#281AC8' />
          </linearGradient>
          <linearGradient
            x1='11.912472'
            y1='51.427513'
            x2='44.355740'
            y2='72.359413'
            id='paint_linear_1_2567_0'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FC58B3' />
            <stop offset='1.000000' stopColor='#FEAE68' />
          </linearGradient>
                    <linearGradient
            x1="100" y1="85" x2="-25" y2="90" id='paint_linear_1_2569_0'gradientUnits="userSpaceOnUse"
          >
            <stop stopColor='#FD749B' />
            <stop offset='1.000000' stopColor='#281AC8' />
          </linearGradient>
        </defs>
        <g className={styles.gSvg}>
        <g opacity='0.253397'>
          <path
            id='Path 4'
            d='M20.36 88.61C20.36 88.61 20.93 85.46 23.18 92.88C25.42 100.3 50.82 116.54 59.32 103.38C67.83 90.23 79.85 104.99 88.15 101.04C96.45 97.1 97.77 91.89 91.58 79.34C85.39 66.79 100.61 51.49 85.44 41.66C70.26 31.83 82.01 34.24 82.01 34.24L81.93 74.39L61.62 92.8L20.36 88.61Z'
            fill='url(#paint_linear_1_2565_0)'
            fillOpacity='1.000000'
            fillRule='evenodd'
          />
          <path
            id='Path 4'
            d='M23.18 92.88C25.42 100.3 50.82 116.54 59.32 103.38C67.83 90.23 79.85 104.99 88.15 101.04C96.45 97.1 97.77 91.89 91.58 79.34C85.39 66.79 100.61 51.49 85.44 41.66C70.26 31.83 82.01 34.24 82.01 34.24L81.93 74.39L61.62 92.8L20.36 88.61C20.36 88.61 20.93 85.46 23.18 92.88Z'
            stroke='#979797'
            strokeOpacity='0'
            strokeWidth='0.000000'
          />
        </g>
        <g opacity='0.518059'>
          <path
            id='Path 2 Copy'
            d='M80.59 49.54C80.59 49.54 78.82 49.44 82.73 47.69C86.64 45.94 93.81 30.74 86.04 26.92C78.28 23.09 85.54 15.42 82.82 11.08C80.1 6.74 77.16 6.37 70.71 10.65C64.27 14.94 51.82 3.49 47.47 12.58C43.11 21.67 50.51 10.63 50.51 10.63L68.66 16.34L80.1 26.36L80.59 49.54Z'
            fill='url(#paint_linear_1_2566_0)'
            fillOpacity='1.000000'
            fillRule='evenodd'
          />
          <path
            id='Path 2 Copy'
            d='M82.73 47.69C86.64 45.94 93.81 30.74 86.04 26.92C78.28 23.09 85.54 15.42 82.82 11.08C80.1 6.74 77.16 6.37 70.71 10.65C64.27 14.94 51.82 3.49 47.47 12.58C43.11 21.67 50.51 10.63 50.51 10.63L68.66 16.34L80.1 26.36L80.59 49.54C80.59 49.54 78.82 49.44 82.73 47.69Z'
            stroke='#979797'
            strokeOpacity='0'
            strokeWidth='0.000000'
          />
        </g>
        <circle
          id='Ellipse 7'
          cx='45'
          cy='54'
          r={radius}
          stroke='#FAA9C6'
          strokeOpacity='1.000000'
          strokeWidth='10.000000'
        />
        <circle
          id='Ellipse 8'
          className={styles.circleProgress}
          cx='45'
          cy='54'
          r={radius}
          stroke="url(#paint_linear_1_2569_0)"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 45 54)"
          strokeDashoffset= {`calc(${dash} - (${dash} * ${progress}) / 100)`}
        />
        </g>
      </svg>
      <span>{count}</span>
    </div>
  );
};
