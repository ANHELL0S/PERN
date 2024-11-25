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
import { db_main } from '../config/db.config.js'
import { tokenScheme } from '../schema/schemes.js'

const authController = {
	async signin(req, res) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				await logEvent('warn', 'Credenciales faltantes', {}, null, req)
				return sendResponse(res, 400, 'Por favor, ingresa tus credenciales.')
			}

			const userFound = await UserModel.getUserByEmail(email)
			if (!userFound) {
				await logEvent('warn', 'Usuario inválido', { email }, null, req)
				return sendResponse(res, 403, 'Credenciales inválidas.')
			}

			const isPasswordValid = await comparePassword(password, userFound.password)
			if (!isPasswordValid) {
				await logEvent('warn', 'Contraseña inválida', { email }, userFound.id_user, req)
				return sendResponse(res, 403, 'Credenciales inválidas.')
			}

			if (!userFound.active) {
				await logEvent('warn', 'Cuenta suspendida', { email }, userFound.id_user, req)
				return sendResponse(res, 403, 'Tu cuenta está suspendida.')
			}

			// Crear Access Token y Refresh Token
			const accessToken = await createAccessToken({ id: userFound.id_user })
			const refreshToken = await createRefreshToken({ id: userFound.id_user })

			const jwtExpiredValue = env.JWT_EXPIRED
			const expiredTokenMaxAge = convertJwtRefreshToMilliseconds(jwtExpiredValue)

			// Establecer cookies
			res.cookie('accessToken', accessToken, {
				httpOnly: true, // Not access js
				secure: env.NODE_ENV === 'production',
				sameSite: 'Strict',
				path: '/',
				maxAge: expiredTokenMaxAge,
			})

			const jwtRefreshValue = env.JWT_REFRESH
			const refreshTokenMaxAge = convertJwtRefreshToMilliseconds(jwtRefreshValue)

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true, // Not access js
				secure: env.NODE_ENV === 'production',
				sameSite: 'Strict',
				path: '/',
				maxAge: refreshTokenMaxAge,
			})

			await logEvent('info', 'Inició de sesión exitoso', { id: userFound.id_user }, userFound.id_user, req)

			const { id_user, role } = userFound

			sendResponse(res, 200, 'Inicio de sesión exitoso.', {
				user: {
					id_user,
					type_rol: role.type_rol,
				},
				accessToken,
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

			return sendResponse(res, 200, 'Sesión cerrada.')
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

	async refreshToken(req, res) {
		try {
			const { refreshToken } = req.cookies

			if (!refreshToken) {
				await logEvent('warn', 'Refresh token faltante', {}, null, req)
				return sendResponse(res, 401, 'No hay refresh token. Inicia sesión nuevamente.')
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
				return sendResponse(res, 404, 'Usuario no encontrado.')
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
			return sendResponse(res, 200, 'Sesión extendida con éxito.', accessToken)
		} catch (error) {
			await logEvent(
				'error',
				'Error al intentar refrescar el token',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			sendResponse(res, 500)
		}
	},

	async requestPasswordReset(req, res) {
		const t = await db_main.transaction()
		try {
			const { email } = req.body

			if (!email) {
				await logEvent('warn', 'Email faltante en la solicitud de restablecimiento de contraseña', { email }, null, req)
				return sendResponse(res, 401, 'Por favor, ingresa tu email actual.')
			}

			const user = await UserModel.getUserByEmail(email)
			if (!user) {
				await logEvent('warn', 'Usuario no encontrado por email', { email }, null, req)
				return sendResponse(res, 404, 'Email no encontrado.')
			}

			const token = jwt.sign({ id: user.id_user }, env.JWT_SECRET, { expiresIn: '30m' })

			await tokenScheme.create(
				{
					id_user_fk: user.id_user,
					token: token,
				},
				{ transaction: t }
			)

			await sendCodeResetPassword(email, token)

			await t.commit()
			await logEvent('info', 'Correo de restablecimiento de contraseña enviado', { email }, user.id_user, req)
			return sendResponse(res, 200, 'Correo enviado exitosamente.')
		} catch (error) {
			await logEvent(
				'error',
				'Error en la solicitud de restablecimiento de contraseña',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			await t.rollback()
			return sendResponse(res, 500)
		}
	},

	async resetPassword(req, res) {
		const t = await db_main.transaction()
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
				return sendResponse(res, 401, 'Por favor, completa todos los campos.')
			}

			if (isTokenExpired(token)) {
				await logEvent('warn', 'Intento de restablecimiento de contraseña con token expirado', { id }, null, req)
				return sendResponse(res, 400, 'El código OTP ha expirado.')
			}

			const decoded = jwt.verify(token, env.JWT_SECRET)

			if (decoded.id !== id) {
				await logEvent('warn', 'Usuario no autorizado para restablecer la contraseña', { id }, id, req)
				return sendResponse(res, 400, 'No autorizado para realizar esta acción.')
			}

			const user = await UserModel.getUserById(id, { transaction: t })
			if (!user) {
				await logEvent('warn', 'Usuario no encontrado durante el restablecimiento de contraseña', { id }, id, req)
				return sendResponse(res, 404, 'Usuario no encontrado.')
			}

			if (newPassword !== confirmPassword) {
				await logEvent('warn', 'Las contraseñas no coinciden', { newPassword, confirmPassword }, id, req)
				return sendResponse(res, 400, 'La contraseña no coincide.')
			}

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			if (!hashedPassword) throw new Error('Error al generar la nueva contraseña.')

			const newData = { password: hashedPassword }
			await UserModel.updateUser(id, newData, { transaction: t })

			await tokenScheme.update(
				{ used: true },
				{
					where: {
						token: token,
					},
					transaction: t,
				}
			)

			await t.commit()
			await logEvent('info', 'Contraseña restablecida correctamente', { newPassword }, user.id_user, req)
			return sendResponse(res, 200, 'ontraseña restablecida correctamente.')
		} catch (error) {
			await logEvent(
				'error',
				'Error al restablecer la contraseña',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			await t.rollback()
			return sendResponse(res, 500)
		}
	},

	async infoAccount(req, res) {
		try {
			const { user } = req

			if (!user.id) {
				await logEvent('warn', 'No se proporciono una ID', {}, null, req)
				return sendResponse(res, 400, 'No se proporciono una ID.')
			}

			const user_found = await UserModel.getUserById(user.id)
			if (!user_found) {
				await logEvent('warn', 'Usuario no encontrado', { id: user.id }, null, req)
				return sendResponse(res, 404, 'Usuario no encontrado.')
			}

			return sendResponse(res, 200, 'Usuario encontrado.', user_found)
		} catch (error) {
			await logEvent(
				'error',
				'Error inesperado al recuperar la información del usuario',
				{ error: error.message, stack: error.stack },
				null,
				req
			)
			sendResponse(res, 500)
		}
	},
}

export { authController }
