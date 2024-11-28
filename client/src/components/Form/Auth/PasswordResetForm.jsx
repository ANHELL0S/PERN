import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputFieldZod } from '../../Input/InputFieldZod'
import { Button } from '../../Button/Button'
import { ToastGeneric } from '../../Toasts/Toast'
import { resetPasswordRequest } from '../../../services/api/auth.api'
import { changePasswordSchema } from '../../../validators/auth.validator'

const PasswordResetForm = ({ decodedToken, token, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(changePasswordSchema)
    })

    const handleFormSubmit = async data => {
        setLoading(true)

        try {
            const response = await resetPasswordRequest(decodedToken.id, {
                token,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            })

            ToastGeneric({ type: 'success', message: response.message })
            onSuccess()
        } catch (error) {
            ToastGeneric({ type: 'error', message: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-5">
                <InputFieldZod
                    label="Nueva contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingresa tu nueva contraseña"
                    register={register('newPassword')}
                    error={errors.newPassword}
                />
                <InputFieldZod
                    label="Confirmar nueva contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirma tu nueva contraseña"
                    register={register('confirmPassword')}
                    error={errors.confirmPassword}
                />
            </div>

            <div className="flex gap-4 flex-col">
                <Button
                    type="submit"
                    variant="primary"
                    size="full"
                    loading={loading}
                >
                    {loading ? 'Procesando...' : 'Confirmar'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="full"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword
                        ? 'Ocultar Contraseñas'
                        : 'Mostrar Contraseñas'}
                </Button>
            </div>
        </form>
    )
}

export { PasswordResetForm }
