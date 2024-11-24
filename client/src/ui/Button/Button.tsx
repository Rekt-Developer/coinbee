import { FC, HtmlHTMLAttributes } from 'react';
import { Loader } from '../Loader'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

interface IButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  form?: string;
  size?: 'lg' | 'md' | 'sm',
  link?: string
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
  colorTheme?: 'white';
}

export const Button: FC<IButtonProps> = ({
  form,
  size,
  link,
  isLoading,
  isDisabled,
  children,
  type = 'button',
  colorTheme,
  ...props
}) => {
  if (link) {
    return (
      <Link to={link} className={styles.button} data-color-theme={colorTheme}>
        {isLoading ? <Loader color="pink" /> : <p>{children}</p>}
      </Link>
    )
  }
  return (
    <button
    form={form}
    className={styles.button}
    type={type}
    disabled={isDisabled || isLoading}
    data-size={size}
    data-color-theme={colorTheme}
    {...props}
    >
      {isLoading ? <Loader color="pink" /> : <p>{children}</p>}
    </button>
  )
};
