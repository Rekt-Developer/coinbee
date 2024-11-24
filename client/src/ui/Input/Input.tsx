import { CSSProperties, forwardRef, HTMLAttributes, MutableRefObject } from 'react';
import styles from './Input.module.scss';

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  inputRef?: MutableRefObject<null>;
  style?: CSSProperties;
  value?: string;
  size?: 'lg';
  label?: string;
  type?: string;
  placeholder?: string;
}

export const Input= forwardRef<HTMLInputElement, IInputProps>(({
  placeholder,
  style,
  value,
  size,
  label,
  type = 'text',
  ...props
}, ref) => {


  return (

    
    <label className={styles.label} style={style}>
      {label}
      <input
      placeholder={placeholder}
        ref={ref}
        value={value}
        className={styles.input}
        data-size={size}
        type={type}
        {...props}
      />
    </label>
  );
});
