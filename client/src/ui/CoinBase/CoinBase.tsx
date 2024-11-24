import { FC } from 'react'
import CoinBaseSVG from '../../assets/img/coinBaseLogo.svg?react'

interface ICoinBaseProps {
  title: string
  isDark: boolean
}

export const CoinBase: FC<ICoinBaseProps> = ({title, isDark}) => {
  return (
    <a href='#!' style={{display: 'flex', alignItems: 'center', gap: '10px', marginRight: '77px'}}>
      <CoinBaseSVG className={isDark ? 'svgColor' : ''}/>
      <span style={{fontSize: '12px', color: 'var(--logo-color-text)', transform: 'translateY(4px)'}}>{title}</span>
    </a>
  );
}