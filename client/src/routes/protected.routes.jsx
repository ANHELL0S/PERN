import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DASHBOARD_PATH, LOGIN_PATH } from '../helpers/constants.helper'

export function RedirectIfAuthenticated({ children }) {
	const { isAuthenticated, loading } = useAuth()
	if (loading) return null
	if (isAuthenticated) return <Navigate to={DASHBOARD_PATH} replace />
	return children
}

export function RedirectIfNotAuthenticated({ children }) {
	const { isAuthenticated, loading } = useAuth()
	if (loading) return null
	if (!isAuthenticated) return <Navigate to={LOGIN_PATH} replace />
	return children
}
