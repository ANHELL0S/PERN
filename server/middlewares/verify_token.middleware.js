import { tokenScheme } from '../schema/schemes.js'
import jwt from 'jsonwebtoken'
import { sendResponse } from '../utils/response_handler.util.js'
import { env } from '../config/env.config.js'

async function verifyToken(req, res, next) {
	try {
		const { id } = req.params

		if (!id) return sendResponse(res, 400, 'Token no proporcionado.')

		const tokenInDb = await tokenScheme.findOne({
			where: {
				id_user_fk: id,
				used: false,
			},
		})

		if (!tokenInDb) return sendResponse(res, 401, 'Token inválido o ya utilizado.')

		const decoded = jwt.verify(tokenInDb.token, env.JWT_SECRET)

		req.userId = decoded.id_user

		next()
	} catch (error) {
		return sendResponse(res, 500)
	}
}

export { verifyToken }
