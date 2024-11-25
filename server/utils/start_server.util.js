import { env } from '../config/env.config.js'

function startServer(app) {
	const PORT = env.PORT
	app.listen(PORT, () => {
		console.log(`\n>> Server running in port  -> ${PORT}`)
		console.log(`>> Connected db primary    -> ${env.MAIN_DB_NAME}`)
		const allowedOrigins = env.CORS_ORIGINS ? env.CORS_ORIGINS.split(',') : []
		console.log(`>> CORS Origins            -> ${allowedOrigins.join(' - ')}\n`)
	})
}

export { startServer }
