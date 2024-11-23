import { logsScheme } from '../schema/schemes.js'

const errorLogger = async (error, req, res, next) => {
	const { method, originalUrl, body, user } = req
	await logsScheme.create({
		level: 'error',
		message: error.message,
		meta: { body, user },
		ipAddress: req.ip,
		endpoint: originalUrl,
	})
	next(error)
}

export { errorLogger }
