import { createContext, useState, useEffect, ReactNode, FC} from 'react'

export const ThemeContext = createContext([''])

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light')

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setTheme('dark');
  //   }
  // }, []);


  useEffect(() => {
    theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [theme])

  // return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
  return <ThemeContext.Provider value={[theme]}>{children}</ThemeContext.Provider>
}