import { useState } from 'react'
import { LuLogOut } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { DASHBOARD_PATH } from '../../helpers/constants.helper'
import { BiSquareRounded, BiMenuAltLeft, BiGridAlt, BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { SidebarItem } from './components/SidebarItem'

const Sidebar = () => {
	const { logout } = useAuth()
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isMobileOpen, setIsMobileOpen] = useState(false)
	const toggleSidebarCollapse = () => setIsCollapsed(!isCollapsed)

	return (
		<>
			{/* Botón para abrir/cerrar sidebar en móvil */}
			<button
				className='fixed md:hidden bottom-4 right-4 z-50 hover:bg-neutral-700 border-neutral-600 transition-all duration-200 ease-in-out bg-neutral-600 border p-2 rounded-full text-neutral-50'
				onClick={() => setIsMobileOpen(!isMobileOpen)}>
				<BiMenuAltLeft size={24} />
			</button>

			<nav
				className={`fixed md:static z-40 top-0 left-0 h-screen bg-neutral-50 transition-transform ease-in-out duration-300 ${isMobileOpen ? 'translate-x-0 border-r md:border-none lg:border-none shadow-xl md:shadow-none lg:shadow-none' : '-translate-x-full'} ${isCollapsed ? 'w-16' : 'w-56'} md:translate-x-0 flex flex-col`}>
				{/* Header del sidebar */}
				<div className='flex items-center justify-between p-4'>
					<Link to={DASHBOARD_PATH} className='flex items-center gap-3 text-neutral-700 rounded-md'>
						<h1 className='text-neutral-50 bg-neutral-700 p-1 rounded-md flex items-center justify-center'>
							<BiSquareRounded size={24} />
						</h1>
						{/* Mostrar título solo si no está colapsado */}
						{!isCollapsed && <p className='text-lg font-semibold'>Untitled</p>}
					</Link>

					{/* Botón para colapsar/expandir el sidebar */}
					{!isMobileOpen && (
						<button
							className={`text-neutral-50 hover:bg-neutral-600 bg-neutral-500 rounded-full ml-3 p-0.5 transition-transform duration-200 ${
								isCollapsed ? 'rotate-180' : 'rotate-0'
							}`}
							onClick={toggleSidebarCollapse}>
							{isCollapsed ? <BiChevronRight size={24} /> : <BiChevronLeft size={24} />}
						</button>
					)}
				</div>

				{/* Scrollable content */}
				<div className='flex-grow overflow-y-auto pr-3'>
					<div className='pl-4 flex flex-col gap-2 pt-2'>
						{!isCollapsed ? <p className='text-base font-medium'>Section 1</p> : <hr className='pb-4' />}
						<ul className='space-y-2 flex flex-col justify-center items-start'>
							<SidebarItem path={DASHBOARD_PATH} icon={BiGridAlt} label='Dashboard' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						</ul>
					</div>
					<div className='pl-4 flex flex-col gap-2 pt-6'>
						{!isCollapsed ? <p className='text-base font-medium'>Section 2</p> : <hr className='pb-4' />}
						<ul className='space-y-2 flex flex-col justify-center items-start'>
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						</ul>
					</div>
					<div className='pl-4 flex flex-col gap-2 pt-6'>
						{!isCollapsed ? <p className='text-base font-medium'>Section 3</p> : <hr className='pb-4' />}
						<ul className='space-y-2 flex flex-col justify-center items-start'>
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
							<SidebarItem path='/link' icon={BiSquareRounded} label='Slot' isCollapsed={isCollapsed} />
						</ul>
					</div>
				</div>

				{/* Footer fijo con Logout */}
				<div className='p-4'>
					<ul className='space-y-2'>
						<li className='flex items-center gap-2 p-2 rounded-md cursor-pointer' onClick={logout}>
							<LuLogOut size={24} />
							{!isCollapsed && <span>Cerrar sesión</span>}
						</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export { Sidebar }
