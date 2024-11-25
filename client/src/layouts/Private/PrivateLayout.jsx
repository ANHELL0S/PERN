import { Navbar } from '../../sections/Navbar/Navbar'
import { Sidebar } from '../../sections/Sidebar/Sidebar'

const PrivateLayout = ({ children }) => {
	return (
		<div className='flex bg-neutral-50 h-screen'>
			<Sidebar />
			<div className='flex-1 border m-2 rounded-lg bg-white px-6 py-4 flex flex-col'>
				<Navbar />
				<div className='flex-1 overflow-y-auto'>{children}</div>
			</div>
		</div>
	)
}

export { PrivateLayout }
