import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js'
import { logEvent } from '../utils/log.util.js'
import { UserModel } from '../models/users.models.js'
import { sendCodeResetPassword } from '../libs/mailer.lib.js'
import { comparePassword } from '../helpers/bcrypt.helper.js'
import { sendResponse } from '../utils/response_handler.util.js'
import { createAccessToken, createRefreshToken } from '../libs/jwt.lib.js'
import { isTokenExpired } from '../helpers/verify_healt_token.helpers.js'
import { convertJwtRefreshToMilliseconds } from '../helpers/token.helper.js'

const authController = {
	async signin(req, res) {
		try {
			const { identification_card, password } = req.body

			if (!identification_card || !password) {
				await logEvent('warn', 'Credenciales faltantes', {}, null, req)
				return res.status(400).json({ message: 'Por favor, ingresa tus credenciales.' })
			}

			const userFound = await UserModel.getUserByCLI(identification_card)
			if (!userFound) {
				await logEvent('warn', 'Usuario inválido', { identification_card }, null, req)
				return res.status(401).json({ message: 'Credenciales inválidas.' })
			}

			const isPasswordValid = await comparePassword(password, userFound.password)
			if (!isPasswordValid) {
				await logEvent('warn', 'Contraseña inválida', { identification_card }, userFound.id_user, req)
				return res.status(401).json({ message: 'Credenciales inválidas.' })
			}

			if (!userFound.active) {
				await logEvent('warn', 'Cuenta suspendida', { identification_card }, userFound.id_user, req)
				return res.status(403).json({ message: 'Tu cuenta está suspendida.' })
			}

			// Crear Access Token y Refresh Token
			const accessToken = await createAccessToken({ id: userFound.id_user })
			const refreshToken = await createRefreshToken({ id: userFound.id_user })

			const jwtExpiredValue = env.JWT_EXPIRED
			const expiredTokenMaxAge = convertJwtRefreshToMilliseconds(jwtExpiredValue)

			// Establecer cookies
			res.cookie('accessToken', accessToken, {
				httpOnly: true, // Esto hace que no se pueda acceder desde JavaScript
				secure: env.NODE_ENV === 'production', // Solo se envían a través de HTTPS en producción
				sameSite: 'Strict', // O 'Lax', según tu necesidad
				path: '/',
				maxAge: expiredTokenMaxAge,
			})

			const jwtRefreshValue = env.JWT_REFRESH
			const refreshTokenMaxAge = convertJwtRefreshToMilliseconds(jwtRefreshValue)

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true, // Esto hace que no se pueda acceder desde JavaScript
				secure: env.NODE_ENV === 'production', // Solo se envían a través de HTTPS en producción
				sameSite: 'Strict', // O 'Lax', según tu necesidad
				path: '/',
				maxAge: refreshTokenMaxAge,
			})

			await logEvent('info', 'Inició de sesión exitoso', { id: userFound.id_user }, userFound.id_user, req)

			// Extraer id_user y role con type_rol
			const { id_user, role } = userFound

			// Enviar la respuesta con la estructura deseada
			res.status(200).json({
				message: 'Inicio de sesión exitoso.',
				user: {
					id_user,
					role: {
						type_rol: role.type_rol,
					},
				},
			})
		} catch (error) {
			await logEvent(
				'error',
				'Error inesperado durante el inicio de sesión',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			sendResponse(res, 500)
		}
	},

	async logout(req, res) {
		try {
			const { user } = req
			await logEvent('info', 'Sesion cerrada exitosa', { id: user.id }, null, req)

			res.clearCookie('accessToken', { path: '/' })
			res.clearCookie('refreshToken', { path: '/' })

			res.status(200).json({ message: 'Sesión cerrada.' })
		} catch (error) {
			await logEvent(
				'error',
				'Error durante el cierre de sesión',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			sendResponse(res, 500)
		}
	},

	async verifyToken(req, res) {
		try {
			const { accessToken } = req.cookies

			if (!accessToken) {
				await logEvent('warn', 'Token de acceso faltante', {}, null, req)
				return res.status(401).json({ message: 'Inicia sesión primero.' })
			}

			jwt.verify(accessToken, env.JWT_SECRET, async (error, data) => {
				if (error) {
					await logEvent('error', 'Token de acceso inválido', { error: error.message, stack: error.stack }, null, req)
					return res.status(401).json({ message: 'Token de acceso inválido.' })
				}

				const userFound = await UserModel.getUserById(data.id)
				if (!userFound) {
					await logEvent('warn', 'Usuario no encontrado para el token', { userId: data.id }, null, req)
					return res.status(401).json({ message: 'Usuario no encontrado.' })
				}

				req.userData = data
				await logEvent(
					'info',
					'Token de acceso verificado con éxito',
					{ userId: userFound.id_user },
					userFound.id_user,
					req
				)

				return res.status(200).json({ message: 'Token de acceso válido.', data })
			})
		} catch (error) {
			await logEvent(
				'error',
				'Error durante la verificación del token',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			sendResponse(res)
		}
	},

	async refreshToken(req, res) {
		try {
			const { refreshToken } = req.cookies

			if (!refreshToken) {
				await logEvent('warn', 'Refresh token faltante', {}, null, req)
				return res.status(401).json({ message: 'No hay refresh token. Inicia sesión nuevamente.' })
			}

			// Verificar el refreshToken
			const data = jwt.verify(refreshToken, env.JWT_SECRET)

			// Obtener el usuario correspondiente
			const userFound = await UserModel.getUserById(data.id)
			if (!userFound) {
				res.clearCookie('refreshToken', { path: '/' })
				await logEvent(
					'warn',
					'Usuario no encontrado para el refresh token',
					{ userId: data.id },
					userFound.id_user,
					req
				)
				return res.status(401).json({ message: 'Usuario no encontrado.' })
			}

			// Crear un nuevo accessToken
			const accessToken = await createAccessToken({ id: userFound.id_user })

			const jwtRefreshValue = env.JWT_REFRESH
			const refreshTokenMaxAge = convertJwtRefreshToMilliseconds(jwtRefreshValue)

			// Configurar la cookie del nuevo accessToken
			res.cookie('accessToken', accessToken, {
				httpOnly: env.NODE_ENV === 'production',
				secure: env.NODE_ENV === 'production',
				sameSite: env.NODE_ENV === 'production' ? 'None' : 'Lax',
				path: '/',
				maxAge: refreshTokenMaxAge,
			})

			res.clearCookie('refreshToken', { path: '/' })

			await logEvent('info', 'Sesión extendida con éxito', { userId: userFound.id_user }, userFound.id_user, req)
			res.status(200).json({ message: 'Sesión extendida con éxito.', accessToken })
		} catch (error) {
			res.clearCookie('accessToken', { path: '/' })
			res.clearCookie('refreshToken', { path: '/' })
			await logEvent(
				'error',
				'Error al intentar refrescar el token',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			sendResponse(res)
		}
	},

	async requestPasswordReset(req, res) {
		try {
			const { email } = req.body

			// Validar que se proporcione un email
			if (!email) {
				await logEvent('warn', 'Email faltante en la solicitud de restablecimiento de contraseña', { email }, null, req)
				return res.status(400).json({ message: 'Por favor, ingresa tu email actual.' })
			}

			// Buscar usuario por email
			const user = await UserModel.getUserByEmail(email)
			if (!user) {
				await logEvent('warn', 'Usuario no encontrado por email', { email }, null, req)
				return res.status(404).json({ message: 'Email no encontrado' })
			}

			// Crear el token de restablecimiento
			const token = jwt.sign({ id: user.id_user }, env.JWT_SECRET, { expiresIn: '5m' })

			// Enviar correo con el token
			await sendCodeResetPassword(email, token)

			await logEvent('info', 'Correo de restablecimiento de contraseña enviado', { email }, user.id_user, req)
			return res.status(200).json({ message: 'Correo enviado exitosamente.' })
		} catch (error) {
			await logEvent(
				'error',
				'Error en la solicitud de restablecimiento de contraseña',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			return sendResponse(res)
		}
	},

	async resetPassword(req, res) {
		try {
			const { id } = req.params
			const { token, newPassword, confirmPassword } = req.body

			if (!id || !token || !newPassword || !confirmPassword) {
				await logEvent(
					'warn',
					'Campos incompletos en el restablecimiento de contraseña',
					{ id, token, newPassword, confirmPassword },
					null,
					req
				)
				return res.status(400).json({ message: 'Por favor, completa todos los campos.' })
			}

			if (isTokenExpired(token)) {
				await logEvent('warn', 'Intento de restablecimiento de contraseña con token expirado', { id }, null, req)
				return res.status(400).json({ message: 'El código OTP ha expirado.' })
			}

			// Decodificar el token para obtener el ID del usuario
			const decoded = jwt.verify(token, env.JWT_SECRET)

			// Verificar si el ID decodificado del usuario coincide con el ID proporcionado en los parámetros
			if (decoded.id !== id) {
				await logEvent('warn', 'Usuario no autorizado para restablecer la contraseña', { id }, id, req)
				return res.status(400).json({ message: 'No autorizado para realizar esta acción.' })
			}

			const user = await UserModel.getUserById(id)
			if (!user) {
				await logEvent('warn', 'Usuario no encontrado durante el restablecimiento de contraseña', { id }, id, req)
				return res.status(404).json({ message: 'Usuario no encontrado.' })
			}

			// Validar que las contraseñas coincidan
			if (newPassword !== confirmPassword) {
				await logEvent('warn', 'Las contraseñas no coinciden', { newPassword, confirmPassword }, id, req)
				return res.status(400).json({ message: 'La contraseña no coincide.' })
			}

			// Generar hash para la nueva contraseña
			const hashedPassword = await bcrypt.hash(newPassword, 10)
			if (!hashedPassword) throw new Error('Error al generar la nueva contraseña.')

			const newData = { password: hashedPassword }
			await UserModel.updateUser(id, newData)

			await logEvent('info', 'Contraseña restablecida correctamente', { newPassword }, user.id_user, req)
			res.status(200).json({ message: 'Contraseña restablecida correctamente.' })
		} catch (error) {
			await logEvent(
				'error',
				'Error al restablecer la contraseña',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			return sendResponse(res)
		}
	},
}

export { authController }
