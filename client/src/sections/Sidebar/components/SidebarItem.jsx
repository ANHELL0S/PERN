import { useLocation } from 'react-router-dom'

const SidebarItem = ({ path, icon: Icon, label, isCollapsed, onClick }) => {
	const location = useLocation()

	const isActive =
		location.pathname === path ? 'bg-neutral-200/50 text-neutral-600' : 'hover:bg-neutral-200/50 hover:text-neutral-600'

	return (
		<li
			className={`flex items-center gap-2 p-1 rounded-md w-full cursor-pointer transition-all duration-200 ease-linear ${isActive}`}
			onClick={onClick}>
			<Icon size={24} />
			{!isCollapsed && <span>{label}</span>}
		</li>
	)
}

export { SidebarItem }
