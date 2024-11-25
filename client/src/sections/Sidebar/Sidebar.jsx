import { useState } from 'react'
import { LuLogOut } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { BiCog, BiSolidHeart, BiSquareRounded } from 'react-icons/bi'
import { ACCOUNT_PATH, DASHBOARD_PATH, NAME_DEV, SOCIAL_NETWORk_DEV } from '../../helpers/constants.helper'

const Sidebar = () => {
	const { logout } = useAuth()

	const [isCollapsed, setIsCollapsed] = useState(false)
	const location = useLocation()

	const isActive = path => {
		return location.pathname === path
			? 'bg-neutral-200/50 text-dneutral-600'
			: 'hover:bg-neutral-200/50 hover:text-dneutral-600'
	}

	return (
		<nav
			className={`flex flex-col bg-neutral-50 h-screen ${isCollapsed ? 'w-16' : 'w-56'} transition-all ease-in-out duration-100 text-neutral-500 font-medium text-sm`}>
			<Link to={DASHBOARD_PATH} className='flex items-center gap-3 p-4 text-neutral-700 rounded-md'>
				<h1 className='text-neutral-50 bg-neutral-700 p-1 rounded-md flex items-center justify-center'>
					<BiSquareRounded size={24} />
				</h1>
				<p className='text-lg font-semibold'>Untitled</p>
			</Link>

			<div className='flex-grow overflow-y-auto h-3 pr-3 mb-4'>
				<div className='pl-4 flex flex-col gap-2 pt-2'>
					<h2>Section 1</h2>
					<ul className='space-y-2 flex flex-col justify-center items-start'>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link2')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link</span>}
						</li>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link3')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link</span>}
						</li>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link2')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link</span>}
						</li>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link3')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link</span>}
						</li>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link2')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link</span>}
						</li>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link3')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link</span>}
						</li>
					</ul>
				</div>

				<div className='pl-4 flex flex-col gap-2 pt-6'>
					<h2>Section 2</h2>
					<ul className='space-y-2 flex flex-col justify-center items-start'>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link4')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link 1</span>}
						</li>
						<li
							className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/link5')}`}>
							<BiSquareRounded size={24} />
							{!isCollapsed && <span>Link 2</span>}
						</li>
					</ul>
				</div>
			</div>

			<div className='pl-4 flex flex-col gap-2 mt-auto pb-4'>
				<ul className='flex flex-col justify-center items-start space-y-2'>
					<li
						className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full ${isActive('/settings')}`}>
						<BiCog size={24} />
						{!isCollapsed && <span>Slot</span>}
					</li>
					<li
						className={`flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer p-1 rounded-md w-full`}
						onClick={logout}>
						<Link to={ACCOUNT_PATH} className='flex items-center gap-2 w-full'>
							<LuLogOut size={24} />
							{!isCollapsed && <span>Cerrar sesión</span>}
						</Link>
					</li>
				</ul>

				<div className='pt-2'>
					<span className='flex items-center gap-1 text-xs pl-2'>
						Made with <BiSolidHeart className='text-red-500' /> by
						<a href={SOCIAL_NETWORk_DEV} target='_blank' rel='noopener noreferrer' className='underline font-semibold'>
							{NAME_DEV}
						</a>
					</span>
				</div>
			</div>
		</nav>
	)
}

export { Sidebar }
