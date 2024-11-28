import { z } from 'zod'

const personalInfoSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Debe tener al menos 4 caracteres' })
    .max(255, { message: 'No puede exceder 255 caracteres' }),

  email: z
    .string()
    .email({ message: 'Dirección de correo electrónico no válida' })
    .min(8, { message: 'Debe tener al menos 8 caracteres' })
    .max(255, { message: 'No puede exceder 255 caracteres' }),

  phone: z
    .string()
    .min(10, { message: 'Debe tener al menos 10 caracteres' })
    .max(10, { message: 'No puede exceder 10 caracteres' }),

  identification_card: z
    .string()
    .min(10, { message: 'Debe tener al menos 10 caracteres' })
    .max(10, { message: 'No puede exceder 10 caracteres' }),

  residence: z
    .string()
    .min(10, { message: 'Debe tener al menos 10 caracteres' })
    .max(255, { message: 'No puede exceder 255 caracteres' })
})

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: 'Este campo es requerido' })
    .max(255, { message: 'Maximo 20 caracteres' }),

  newPassword: z
    .string()
    .min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres'
    })
    .max(20, { message: 'Maximo 20 caracteres' })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe contener al menos una letra mayúscula'
    })
    .regex(/[0-9]/, {
      message: 'La contraseña debe contener al menos un número'
    })
    .regex(/[\W_]/, {
      message: 'La contraseña debe contener al menos un carácter especial'
    }),

  confirmPassword: z
    .string()
    .min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres'
    })
    .max(20, { message: 'Maximo 20 caracteres' })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe contener al menos una letra mayúscula'
    })
    .regex(/[0-9]/, {
      message: 'La contraseña debe contener al menos un número'
    })
    .regex(/[\W_]/, {
      message: 'La contraseña debe contener al menos un carácter especial'
    })
})

export { personalInfoSchema, changePasswordSchema }
