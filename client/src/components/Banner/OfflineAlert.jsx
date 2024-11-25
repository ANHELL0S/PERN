import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNetworkStatus } from '../../context/NetworkStatusContext'

const OfflineAlert = () => {
	const { isOnline } = useNetworkStatus()
	const [wasOffline, setWasOffline] = useState(false)
	const [showReconnectMessage, setShowReconnectMessage] = useState(false)

	useEffect(() => {
		if (!isOnline) setWasOffline(true)

		if (isOnline && wasOffline) {
			setShowReconnectMessage(true)
			const timer = setTimeout(() => {
				setShowReconnectMessage(false)
				setWasOffline(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [isOnline, wasOffline])

	return (
		<>
			<AnimatePresence>
				{!isOnline && (
					<motion.div
						key='offline'
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: 'circInOut' } }}
						exit={{ y: 50, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
						className='fixed bottom-0 left-0 right-0 z-50 bg-neutral-800 py-1.5 text-center text-sm text-neutral-50'>
						<p>Sin conexión a internet</p>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showReconnectMessage && (
					<motion.div
						key='reconnected'
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: 'circInOut' } }}
						exit={{ y: 50, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
						className='fixed bottom-0 left-0 right-0 z-50 bg-green-600 py-1.5 text-center text-sm text-white'>
						<p>De nuevo en línea</p>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export { OfflineAlert }
