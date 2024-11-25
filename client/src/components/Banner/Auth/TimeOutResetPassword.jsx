import { Button } from '../../Button/Button'
import { useNavigate } from 'react-router-dom'
import path_img from '../../../assets/images/time_out_password.svg'
import { DASHBOARD_PATH, RECOVER_ACCOUNT_PATH } from '../../../helpers/constants.helper'

const TimeOutResetPassword = ({
	title = 'Tiempo agotado',
	message = 'Estimado usuario, lamentamos informarte que el enlace para restablecer tu contraseña ha expirado. Por favor, solicita un nuevo enlace para continuar con el proceso.',
}) => {
	const navigate = useNavigate()
	return (
		<>
			<div className='container mx-auto lg:flex lg:items-center lg:gap-12'>
				<div className='text-slate-00 w-full lg:w-1/2 flex flex-col gap-2'>
					<h1 className='text-2xl font-semibold text-neutral-600 md:text-2xl'>{title}</h1>
					<p className='text-slate-500 font-medium text-sm'>{message}</p>

					<div className='flex md:flex-row flex-col items-center justify-between gap-4'>
						<Button variant='primary' size='full' onClick={() => navigate(RECOVER_ACCOUNT_PATH)}>
							Solicitar nuevo enlace
						</Button>

						<Button variant='secondary' size='full' onClick={() => navigate(DASHBOARD_PATH)}>
							Ir al inicio
						</Button>
					</div>
				</div>

				<div className='flex items-center justify-center w-full lg:mt-0 lg:w-1/2'>
					<img className='w-full max-w-lg lg:mx-auto' src={path_img} alt={title} />
				</div>
			</div>
		</>
	)
}

export { TimeOutResetPassword }
