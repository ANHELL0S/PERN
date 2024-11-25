import { ToastGeneric } from '../components/Toasts/Toast'
import { createContext, useContext, useState, useEffect } from 'react'
import { signinRequest, refreshTokenRequest, closeRequest } from '../services/api/auth.api'

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within an AuthProvider')
	return context
}

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const isAuthenticatedInStorage = localStorage.getItem('isAuthenticated') === 'true'

		if (!isAuthenticatedInStorage) {
			localStorage.removeItem('isAuthenticated')
			closeRequest()
		}

		setIsAuthenticated(isAuthenticatedInStorage)
		setLoading(false)
	}, [])

	const signing = async (email, password) => {
		try {
			const response = await signinRequest({ email, password })
			setIsAuthenticated(true)
			localStorage.setItem('isAuthenticated', 'true')
			ToastGeneric({ type: 'success', message: response.message })
		} catch (error) {
			setIsAuthenticated(false)
			localStorage.setItem('isAuthenticated', 'false')
			ToastGeneric({ type: 'error', message: error.message })
		}
	}

	const refreshAccessToken = async () => {
		try {
			const response = await refreshTokenRequest()
			if (response) {
				ToastGeneric({ type: 'success', message: response.message })
			}
		} catch (error) {
			setIsAuthenticated(false)
			localStorage.setItem('isAuthenticated', 'false')
		}
	}

	const logout = async () => {
		try {
			await closeRequest()
		} catch (error) {
		} finally {
			setIsAuthenticated(false)
			localStorage.setItem('isAuthenticated', 'false')
		}
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				logout,
				loading,
				signing,
				refreshAccessToken,
			}}>
			{children}
		</AuthContext.Provider>
	)
}
