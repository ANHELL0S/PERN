import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { LOGIN_PATH } from '../../helpers/constants.helper'
import { BiArrowBack, BiEnvelope, BiLockAlt } from 'react-icons/bi'
import { PasswordResetRequestForm } from '../../components/Form/Auth/PasswordResetRequestForm'

const PasswordResetRequestSection = () => {
	const [emailSent, setEmailSent] = useState('')
	const [requestSent, setRequestSent] = useState(false)

	if (requestSent) {
		return (
			<div className='flex items-center justify-center'>
				<div className='grid grid-cols-1 gap-4 items-center justify-center max-w-6xl w-full'>
					<div className='border border-neutral-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] mx-auto flex flex-col gap-4'>
						<div className='flex items-center justify-center rounded-full border p-3 mx-auto'>
							<BiEnvelope size={50} />
						</div>

						<h3 className='text-neutral-700 text-3xl font-extrabold text-center'>Verifica tu email</h3>
						<p className='text-neutral-500 text-sm leading-relaxed text-start'>
							Se ha enviado un enlace para restablecer tu contraseña a <strong>{emailSent}</strong>
						</p>
						<div className='flex justify-end gap-4 flex-col'>
							<a href='https://mail.google.com/mail/u/0/?pli=1#inbox'>
								<Button variant='primary' size='full'>
									Ir a Gmail
								</Button>
							</a>

							<Link to={LOGIN_PATH}>
								<Button variant='secondary' size='full'>
									<BiArrowBack size={18} className='mr-2' />
									<span>Regresar</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='flex items-center justify-center'>
			<div className='grid grid-cols-1 gap-4 items-center justify-center max-w-6xl w-full'>
				<div className='border border-neutral-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] mx-auto flex flex-col gap-4'>
					<div className='flex items-center justify-center rounded-full border p-3 mx-auto'>
						<BiLockAlt size={50} />
					</div>

					<h3 className='text-neutral-700 text-3xl font-extrabold text-center'>Recuperar contraseña</h3>
					<p className='text-neutral-500 text-sm leading-relaxed text-start'>
						Restablece tu contraseña fácilmente para volver a acceder a tu cuenta y seguir disfrutando de nuestros
						servicios.
					</p>
					<PasswordResetRequestForm setEmailSent={setEmailSent} setRequestSent={setRequestSent} />
				</div>
			</div>
		</div>
	)
}

export { PasswordResetRequestSection }
