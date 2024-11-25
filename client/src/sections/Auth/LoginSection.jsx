import { Link } from 'react-router-dom'
import path_img from '../../assets/images/auth.svg'
import { SigningForm } from '../../components/Form/Auth/SigningForm'
import { RECOVER_ACCOUNT_PATH } from '../../helpers/constants.helper'

const LoginSection = () => {
	return (
		<>
			<div class='flex fle-col items-center justify-center'>
				<div class='grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full'>
					<div class='border border-neutral-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto flex flex-col gap-4'>
						<div>
							<h3 class='text-neutral-700 text-3xl font-extrabold'>Iniciar Sesión</h3>
							<p class='text-neutral-500 text-sm mt-4 leading-relaxed'>
								Cuidamos su mundo, empezando por sus mascotas. ¡Tu viaje hacia su bienestar comienza aquí!
							</p>
						</div>

						<SigningForm />

						<div class='flex flex-wrap items-center justify-end gap-4'>
							<div class='text-sm'>
								<Link to={RECOVER_ACCOUNT_PATH} class='text-blue-600 hover:underline font-semibold'>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
						</div>
					</div>

					<div class='md:block h-auto hidden object-cover'>
						<img src={path_img} class='w-full h-full max-md:w-4/5 mx-auto block object-cover' alt='Dining Experience' />
					</div>
				</div>
			</div>
		</>
	)
}

export { LoginSection }
