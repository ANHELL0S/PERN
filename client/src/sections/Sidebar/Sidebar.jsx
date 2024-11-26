import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'
import { SidebarItem } from './components/SidebarItem'
import { BiSquareRounded, BiMenuAltLeft, BiGridAlt } from 'react-icons/bi'
import { ACCOUNT_PATH, DASHBOARD_PATH } from '../../helpers/constants.helper'

const Sidebar = () => {
	const { logout } = useAuth()
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isMobileOpen, setIsMobileOpen] = useState(false)

	return (
		<>
			{/* Button show or hidden sidebar */}
			<button
				className='fixed md:hidden bottom-4 right-4 z-50 hover:bg-neutral-700 border-neutral-600 transition-all duration-200 ease-in-out bg-neutral-600 border p-2 rounded-full text-neutral-50'
				onClick={() => setIsMobileOpen(!isMobileOpen)}>
				<BiMenuAltLeft size={24} />
			</button>

			<nav
				className={`fixed md:static z-40 top-0 left-0 h-screen bg-neutral-50 transition-transform ease-in-out duration-300 ${isMobileOpen ? 'translate-x-0 border-r shadow-xl' : '-translate-x-full'} ${isCollapsed ? 'w-16' : 'w-56'} md:translate-x-0 flex flex-col`}>
				{/* Sidebar header */}
				<Link to={DASHBOARD_PATH} className='flex items-center gap-3 p-4 text-neutral-700 rounded-md'>
					<h1 className='text-neutral-50 bg-neutral-700 p-1 rounded-md flex items-center justify-center'>
						<BiSquareRounded size={24} />
					</h1>
					{!isCollapsed && <p className='text-lg font-semibold'>Untitled</p>}
				</Link>

				{/* Scrollable content */}
				<div className='flex-grow overflow-y-auto pr-3'>
					<div className='pl-4 flex flex-col gap-2 pt-2'>
						<h2>Section 1</h2>
						<ul className='space-y-2 flex flex-col justify-center items-start'>
							<SidebarItem path={DASHBOARD_PATH} icon={BiGridAlt} label='Dashboard' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						</ul>
					</div>
					<div className='pl-4 flex flex-col gap-2 pt-6'>
						<h2>Section 2</h2>
						<ul className='space-y-2 flex flex-col justify-center items-start'>
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						</ul>
					</div>
					<div className='pl-4 flex flex-col gap-2 pt-6'>
						<h2>Section 3</h2>
						<ul className='space-y-2 flex flex-col justify-center items-start'>
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						</ul>
					</div>
				</div>

				{/* Fixed footer */}
				<div className='p-4'>
					<ul className='flex flex-col justify-center items-start space-y-2'>
						<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						<li className={`flex items-center gap-2 p-1 rounded-md w-full`} onClick={logout}>
							<Link to={ACCOUNT_PATH} className='flex items-center gap-2 w-full'>
								<LuLogOut size={24} />
								{!isCollapsed && <span>Cerrar sesión</span>}
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export { Sidebar }
