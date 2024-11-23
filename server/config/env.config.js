import dotenv from 'dotenv'

dotenv.config()

const env = {
	MAIN_DB_HOST: process.env.MAIN_DB_HOST,
	MAIN_DB_PORT: process.env.MAIN_DB_PORT,
	MAIN_DB_NAME: process.env.MAIN_DB_NAME,
	MAIN_DB_USER: process.env.MAIN_DB_USER,
	MAIN_DB_PASSWORD: process.env.MAIN_DB_PASSWORD,

	PORT: process.env.PORT,
	URL_API: process.env.URL_API,
	CORS_ORIGINS: process.env.CORS_ORIGINS,
	URL_MAIN: process.env.URL_MAIN,

	JWT_EXPIRED: process.env.JWT_EXPIRED,
	JWT_REFRESH: process.env.JWT_REFRESH,
	JWT_SECRET: process.env.JWT_SECRET,

	NODE_ENV: process.env.NODE_ENV,

	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASS: process.env.SMTP_PASS,
	DEFAULT_FROM_EMAIL: process.env.DEFAULT_FROM_EMAIL,
}

// Validar las variables críticas
const requiredVariables = Object.keys(env) // Obtener las claves del objeto `env`

requiredVariables.forEach(key => {
	if (!env[key]) {
		console.error(`La variable de entorno ${key} no está definida.`)
		process.exit(1) // Detenemos la ejecución si falta una variable crítica
	}
})

export { env }
