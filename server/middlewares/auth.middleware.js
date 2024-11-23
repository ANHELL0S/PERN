import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js'
import { sendResponse } from '../utils/response_handler.util.js'

export const Auth = (req, res, next) => {
	try {
		const { accessToken } = req.cookies
		if (!accessToken) return sendResponse(res, 403, 'Autenticación requerida.')
		jwt.verify(accessToken, env.JWT_SECRET, (error, user) => {
			if (error) return sendResponse(res, 403, 'Tu sesión actual ha expirado, por favor vuelve a iniciar sesión.')
			req.user = user
			next()
		})
	} catch (error) {
		return sendResponse(res, 500, error.message)
	}
}
