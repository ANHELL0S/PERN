import cors from 'cors'
import { env } from './env.config.js'

function setupCors(app) {
	const { CORS_ORIGINS } = env
	const allowedOrigins = CORS_ORIGINS ? CORS_ORIGINS.split(',') : []
	app.use(
		cors({
			origin: (origin, callback) => {
				if (!origin || allowedOrigins.includes(origin)) {
					return callback(null, true)
				}
				callback(new Error('Not allowed by CORS'))
			},
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
		})
	)
}

export { setupCors }
