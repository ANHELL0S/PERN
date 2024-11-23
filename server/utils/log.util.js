import { logsScheme } from '../schema/schemes.js'

export const logEvent = async (level, message, meta = {}, user_fk = null, req) => {
	try {
		// Capture the HTTP method and action
		const httpMethod = req ? req.method : null
		const action = req ? req.method + ' ' + req.originalUrl : null

		await logsScheme.create({
			level,
			message,
			meta,
			user_fk,
			ipAddress: req ? req.ip : null,
			endpoint: req ? req.originalUrl : null,
			httpMethod,
			action,
		})
	} catch (error) {
		console.error('Error al registrar el log:', error)
	}
}
