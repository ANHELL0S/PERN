import React from 'react'
import { useUserStore } from '../../hooks/useUser'

const DashboardSection = () => {
	const { userStore, loading, error } = useUserStore()

	if (loading) return <div>Loading...</div>

	if (error) return <div>Error: {error}</div>

	return (
		<div className='space-y-6'>
			<h2 className='text-2xl font-semibold text-center text-slate-700'>Welcome {userStore?.data?.username}</h2>
			<p className='text-center text-slate-600'>{userStore?.data?.email}</p>
		</div>
	)
}

export { DashboardSection }
