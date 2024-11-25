import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button/Button'
import { ToastGeneric } from '../../Toasts/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputFieldZod } from '../../Input/InputFieldZod'
import { updatePasswordRequest } from '../../../services/api/user.api'
import { changePasswordSchema } from '../../../validators/account.validator'

const PasswordForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(changePasswordSchema),
	})

	const handleFormSubmit = async data => {
		setIsLoading(true)
		try {
			const response = await updatePasswordRequest(data)
			ToastGeneric({ type: 'success', message: response.message })
		} catch (error) {
			ToastGeneric({ type: 'error', message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-8'>
			<div className='space-y-5'>
				<InputFieldZod
					label='Contraseña actual'
					type={showPassword ? 'text' : 'password'}
					placeholder='Ingresa tu contraseña actual'
					register={register('currentPassword')}
					error={errors.currentPassword}
				/>
				<InputFieldZod
					label='Nueva contraseña'
					type={showPassword ? 'text' : 'password'}
					placeholder='Ingresa tu nueva contraseña'
					register={register('newPassword')}
					error={errors.newPassword}
				/>
				<InputFieldZod
					label='Confirmar nueva contraseña'
					type={showPassword ? 'text' : 'password'}
					placeholder='Confirma tu nueva contraseña'
					register={register('confirmPassword')}
					error={errors.confirmPassword}
				/>
			</div>

			<div className='flex justify-end gap-4'>
				<Button type='button' variant='secondary' onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? 'Ocultar Contraseñas' : 'Mostrar Contraseñas'}
				</Button>

				<Button variant='primary' type='submit' size='md' disabled={isLoading}>
					{isLoading ? 'Procesando...' : 'Cambiar contraseña'}
				</Button>
			</div>
		</form>
	)
}

export { PasswordForm }
