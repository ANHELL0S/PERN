import bcrypt from 'bcrypt'
import { logEvent } from '../utils/log.util.js'
import { db_main } from '../config/db.config.js'
import { UserModel } from '../models/users.models.js'
import { isValidCI } from '../validators/cli.validator.js'
import { hashPassword } from '../helpers/bcrypt.helper.js'
import { sendResponse } from '../utils/response_handler.util.js'

const userController = {
	async infoUser(req, res) {
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

	async updateInfoUser(req, res) {
		const t = await db_main.transaction()
		const { user } = req
		try {
			const { username, email, phone, identification_card, residence } = req.body

			const user_found = await UserModel.getUserById(user.id, { transaction: t })

			if (!user_found) {
				await t.rollback()
				await logEvent('warn', 'Cliente no encontrado.', { id: user.id }, user.id, req)
				return sendResponse(res, 404, 'Cliente no encontrado.')
			}

			if (email && email !== user_found.email) {
				const existingClient = await UserModel.getUserByEmail({ email, transaction: t })
				if (existingClient) {
					await logEvent('warn', 'Este email ya está en uso.', { email }, user.id, req)
					await t.rollback()
					return sendResponse(res, 400, 'Este email ya está en uso.')
				}
			}
			if (identification_card) {
				if (!isValidCI(identification_card)) {
					await logEvent('warn', 'Cédula inválida.', { identification_card }, user.id, req)
					return sendResponse(res, 400, 'La cédula ingresada no es válida.')
				}

				if (identification_card !== user_found.identification_card) {
					const existingClient = await UserModel.getUserByCLI({ identification_card, transaction: t })
					if (existingClient) {
						await logEvent('warn', 'Esta cédula ya está en uso.', { identification_card }, user.id, req)
						await t.rollback()
						return sendResponse(res, 400, 'Esta cédula ya está en uso.')
					}
				}
			}

			const changes = []

			if (username && username !== user_found.username) {
				user_found.username = username
				changes.push('nombres')
			}

			if (email && email !== user_found.email) {
				user_found.email = email
				changes.push('email')
			}

			if (identification_card && identification_card !== user_found.identification_card) {
				user_found.identification_card = identification_card
				changes.push('cédula')
			}

			if (phone && phone !== user_found.phone) {
				user_found.phone = phone
				changes.push('teléfono')
			}

			if (residence && residence !== user_found.residence) {
				user_found.residence = residence
				changes.push('teléfono')
			}

			if (changes.length === 0) {
				await logEvent('warn', 'No se realizarón cambios.', { data: req.body }, user.id, req)
				await t.commit()
				return sendResponse(res, 200, 'No se realizarón cambios.')
			}

			await user_found.save({ transaction: t })
			await logEvent('info', 'Datos actualizados correctamente.', { data: req.body }, user.id, req)
			await t.commit()
			return sendResponse(res, 200, `Datos actualizados correctamente.`)
		} catch (error) {
			await logEvent(
				'error',
				'Error inesperado al cambiar los datos del usuario',
				{ error: error.message, stack: error.stack },
				user.id,
				req
			)
			await t.rollback()
			return sendResponse(res, 500)
		}
	},

	async changePassword(req, res) {
		const t = await db_main.transaction()
		const { user } = req
		try {
			const { currentPassword, newPassword, confirmPassword } = req.body

			if (!currentPassword || !newPassword || !confirmPassword) {
				await logEvent('warn', 'Campos incompletos.', { currentPassword, newPassword, confirmPassword }, user.id, req)
				return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			}

			const user_found = await UserModel.getUserById(user.id, { transaction: t })

			if (!user_found) {
				await logEvent('warn', 'Usuario no encontrado.', { user_found }, user.id, req)
				return sendResponse(res, 404, 'Usuario no encontrado.')
			}

			bcrypt.compare(currentPassword, user_found.password, async (err, match) => {
				if (err) {
					await t.rollback()
					return sendResponse(res, 500)
				}
				if (match) {
					if (newPassword === confirmPassword) {
						const hashedPassword = await hashPassword(newPassword)
						const newData = {
							password: hashedPassword,
						}

						await UserModel.updateUser(user.id, newData, { transaction: t })
						await t.commit()

						await logEvent('success', 'Contraseña actualizada exitosamente.', { newPassword }, user.id, req)
						return sendResponse(res, 200, 'Contraseña actualizada exitosamente.')
					} else {
						await logEvent('warn', 'La nueva contraseña no coincide.', { newPassword, confirmPassword }, user.id, req)
						await t.rollback()
						return sendResponse(res, 400, 'La nueva contraseña no coincide.')
					}
				} else {
					await logEvent('warn', 'Contraseña actual inválida.', {}, user.id, req)
					await t.rollback()
					return sendResponse(res, 401, 'Contraseña actual inválida.')
				}
			})
		} catch (error) {
			await logEvent(
				'error',
				'Error inesperado durante el cambio de contraseña',
				{ error: error.message, stack: error.stack },
				user.id,
				req
			)
			await t.rollback()
			return sendResponse(res, 500)
		}
	},
}

export { userController }
