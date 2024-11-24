import { FC } from 'react'
import LogoSVG from '../../assets/img/logo.svg?react'

interface ILogoProps {
  title: string
  isDark: boolean
}

export const Logo: FC<ILogoProps> = ({title, isDark}) => {
  return (
    <a href='/' style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
      <LogoSVG className={isDark ? 'svgColor' : ''}/>
      <span style={{fontSize: '14px', color: 'var(--logo-color-text)'}}>{title}</span>
    </a>
  );
}