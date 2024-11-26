import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const SidebarItem = ({ path, icon: Icon, label, isCollapsed }) => {
	const location = useLocation()
	const [isHovered, setIsHovered] = useState(false)

	const isActive =
		location.pathname === path ? 'bg-neutral-200/50 text-neutral-600' : 'hover:bg-neutral-200/50 hover:text-neutral-600'

	return (
		<li
			className={`flex items-center gap-2 p-1.5 rounded-md w-full cursor-pointer ${isActive}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<Icon size={24} />
			{!isCollapsed && <span>{label}</span>}

			{isCollapsed && isHovered && (
				<div className='absolute bg-neutral-500 font-medium text-white text-sm py-1 px-2 rounded-md ml-10'>{label}</div>
			)}
		</li>
	)
}

export { SidebarItem }
