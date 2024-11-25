import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../context/AuthContext'
import { InputFieldZod } from '../../Input/InputFieldZod'
import { authSchema } from '../../../validators/auth.validator'

const SigningForm = () => {
	const { signing } = useAuth()
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(authSchema),
	})

	const handleFormSigninigSubmit = async data => {
		setLoading(true)
		try {
			await signing(data.email, data.password)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSigninigSubmit)}>
			<div className='space-y-5'>
				<InputFieldZod
					label='Correo Electrónico'
					type='email'
					placeholder='Introduce tu correo'
					register={register('email')}
					error={errors.email}
				/>
				<InputFieldZod
					label='Contraseña'
					type='password'
					placeholder='Introduce tu contraseña'
					register={register('password')}
					error={errors.password}
				/>

				<div className='flex justify-end gap-4'>
					<Button type='submit' variant='primary' size='full' loading={loading}>
						{loading ? 'Cargando...' : 'Iniciar Sesión'}
					</Button>
				</div>
			</div>
		</form>
	)
}

export { SigningForm }
