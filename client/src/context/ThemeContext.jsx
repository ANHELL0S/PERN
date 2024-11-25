import React, { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

	useEffect(() => {
		document.body.classList.toggle('dark', theme === 'dark')
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeContext
