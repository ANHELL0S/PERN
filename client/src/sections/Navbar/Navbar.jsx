import Avvvatars from 'avvvatars-react'
import { BiGridAlt } from 'react-icons/bi'
import { BiChevronRight } from 'react-icons/bi'
import { useUserStore } from '../../hooks/useUser'
import { Link, useLocation } from 'react-router-dom'
import { ACCOUNT_PATH, DASHBOARD_PATH } from '../../helpers/constants.helper'

const Navbar = () => {
	const { userStore, loading, error } = useUserStore()
	const location = useLocation()

	const pathParts = location.pathname.split('/').filter(part => part)

	return (
		<>
			<nav className='flex items-center text-neutral-600 justify-between'>
				<section className='mt-2 text-sm text-neutral-500'>
					<div aria-label='breadcrumb'>
						<ol className='flex items-center gap-0 font-medium'>
							<li>
								<Link to={DASHBOARD_PATH} className='text-neutral-500 hover:underline flex items-center'>
									<BiGridAlt className='mr-1' />
									Home
								</Link>
							</li>

							{location.pathname !== DASHBOARD_PATH && (
								<>
									{pathParts.map((part, index) => {
										const isLastPart = index === pathParts.length - 1
										return (
											<li key={index} className='flex items-center font-semibold text-neutral-600'>
												<BiChevronRight className='mx-1' />
												{isLastPart ? (
													<span>{part}</span>
												) : (
													<Link to={`/${pathParts.slice(0, index + 1).join('/')}`} className='hover:underline'>
														{part}
													</Link>
												)}
											</li>
										)
									})}
								</>
							)}
						</ol>
					</div>
				</section>

				<section className='flex items-center gap-2 text-sm font-semibold text-neutral-600'>
					<Link
						to={ACCOUNT_PATH}
						className='flex items-center gap-2 w-full hover:border-neutral-400 pr-3 transition-all ease-linear duration-200 border rounded-full'>
						<Avvvatars size={32} value={userStore?.data?.username} />
						<span>{userStore?.data?.username}</span>
					</Link>
				</section>
			</nav>
		</>
	)
}

export { Navbar }
