import { BiSolidHeart } from 'react-icons/bi'
import { NAME_DEV, SOCIAL_NETWORk_DEV } from '../../helpers/constants.helper'

const Footer = () => {
	return (
		<footer class='font-sans tracking-wide'>
			<div className='flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs mt-10 gap-4 sm:gap-0'>
				<span>&copy; {new Date().getFullYear()} PUI. Todos los derechos reservados</span>
				<div className='flex items-center gap-1'>
					<span className='flex gap-1 text-xs font-medium'>
						Made with
						<BiSolidHeart className='text-red-500' size={14} />
						by
					</span>
					<div className='flex items-center gap-2'>
						<a
							href={SOCIAL_NETWORk_DEV}
							className='block text-xs font-medium underline transition-colors duration-200 hover:text-neutral-700'
							target='_blank'
							rel='noopener noreferrer'>
							{NAME_DEV}
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export { Footer }
