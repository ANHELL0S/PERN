import React, { createContext, useState, useEffect, useContext } from 'react'

const NetworkStatusContext = createContext()

export const NetworkStatusProvider = ({ children }) => {
	const [isOnline, setIsOnline] = useState(navigator.onLine)

	useEffect(() => {
		const handleOnline = () => setIsOnline(true)
		const handleOffline = () => setIsOnline(false)

		window.addEventListener('online', handleOnline)
		window.addEventListener('offline', handleOffline)

		return () => {
			window.removeEventListener('online', handleOnline)
			window.removeEventListener('offline', handleOffline)
		}
	}, [])

	return <NetworkStatusContext.Provider value={{ isOnline }}>{children}</NetworkStatusContext.Provider>
}

export const useNetworkStatus = () => useContext(NetworkStatusContext)
