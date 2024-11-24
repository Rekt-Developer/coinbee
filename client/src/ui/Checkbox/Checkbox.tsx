import styles from './Checkbox.module.scss'
import CheckboxSVG from '../../assets/img/checkbox.svg?react'
import { CSSProperties, FC, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../Providers/ThemeProvider'

type TCheckboxProps = {
  checked: boolean;
  handleChecked: () => void;
  style?: CSSProperties
}

export const Checkbox: FC<TCheckboxProps> = ({checked, handleChecked, style}) => {
  const [theme] = useContext(ThemeContext);
  const [showSvg, setShowSvg] = useState(false);
  
  useEffect(() => {
    if (checked) {
       const timer = setTimeout(() => setShowSvg(true), 200);
       return () => clearTimeout(timer); 
    } else setShowSvg(false)
  }, [checked]);
  return (
    <span style={style} onClick={handleChecked} className={`${styles.checkbox} ${checked ? styles.active : ''}`}>
      {showSvg && <CheckboxSVG className={theme === 'dark' ? styles.dark : ''} />}
    </span>
  )
}