import nodemailer from 'nodemailer'
import { env } from './env.config.js'

const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

const defaultFromEmail = env.DEFAULT_FROM_EMAIL

export { transporter, defaultFromEmail }
