import { z } from 'zod'

const authSchema = z.object({
	email: z
		.string()
		.email({ message: 'Correo electrónico inválido' })
		.max(255, { message: 'No puede exceder 255 caracteres' }),
	password: z
		.string()
		.min(8, { message: 'Debe tener al menos 8 caracteres' })
		.max(32, { message: 'No puede exceder 32 caracteres' }),
})

const requestResetPasswordSchema = z.object({
	email: z
		.string()
		.email({ message: 'Correo electrónico inválido' })
		.max(255, { message: 'No puede exceder 255 caracteres' }),
})

const changePasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
		.max(20, { message: 'Maximo 20 caracteres' })
		.regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
		.regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' })
		.regex(/[\W_]/, { message: 'La contraseña debe contener al menos un carácter especial' }),

	confirmPassword: z
		.string()
		.min(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
		.max(20, { message: 'Maximo 20 caracteres' })
		.regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
		.regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' })
		.regex(/[\W_]/, { message: 'La contraseña debe contener al menos un carácter especial' }),
})

export { authSchema, requestResetPasswordSchema, changePasswordSchema }
