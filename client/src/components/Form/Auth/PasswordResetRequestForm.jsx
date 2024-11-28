import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button/Button'
import { BiArrowBack } from 'react-icons/bi'
import { ToastGeneric } from '../../Toasts/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputFieldZod } from '../../Input/InputFieldZod'
import { LOGIN_PATH } from '../../../helpers/constants.helper'
import { passwordResetRequest } from '../../../services/api/auth.api'
import { requestResetPasswordSchema } from '../../../validators/auth.validator'

const PasswordResetRequestForm = ({ setEmailSent, setRequestSent }) => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(requestResetPasswordSchema)
    })

    const handleFormSubmit = async data => {
        setLoading(true)

        try {
            const response = await passwordResetRequest({ email: data.email })
            ToastGeneric({ type: 'success', message: response.message })
            setRequestSent(true)
            setEmailSent(data.email)
        } catch (error) {
            ToastGeneric({ type: 'error', message: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-5">
                <InputFieldZod
                    label="Correo electrónico"
                    type="email"
                    placeholder="Introduce tu correo"
                    register={register('email')}
                    error={errors.email}
                />

                <div className="flex justify-end gap-4 flex-col">
                    <Button
                        type="submit"
                        variant="primary"
                        size="full"
                        loading={false}
                    >
                        {loading ? 'Procesando...' : 'Siguiente'}
                    </Button>

                    <Link to={LOGIN_PATH}>
                        <Button variant="secondary" size="full">
                            <BiArrowBack size={18} className="mr-2" />
                            <span>Regresar</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </form>
    )
}

export { PasswordResetRequestForm }
