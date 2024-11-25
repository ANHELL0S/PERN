import { env } from './env.config.js'
import { Sequelize } from 'sequelize'

const db_main = new Sequelize(env.MAIN_DB_NAME, env.MAIN_DB_USER, env.MAIN_DB_PASSWORD, {
	host: env.MAIN_DB_HOST,
	port: env.MAIN_DB_PORT,
	dialect: 'postgres',
	timezone: '+00:00',
	logging: false,
	dialectOptions: {
		useUTC: true,
	},
	pool: {
		max: 100, // Conexion simultaneous
		min: 0,
		acquire: 30000, // Wait a conenection avalible
		idle: 10000, // Close connections inactives
	},

	// FOR CONNECTION SSL - SERVICES COMO RENDER, ETC//
	/*
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	retry: {
		match: [/SequelizeConnectionError/, /SequelizeConnectionRefusedError/, /EAI_AGAIN/],
		max: 5,
		backoffBase: 1000,
		backoffExponent: 2,
	},
	*/
})

const db_backup = new Sequelize(env.BACKUP_DB_NAME, env.BACKUP_DB_USER, env.BACKUP_DB_PASSWORD, {
	host: env.BACKUP_DB_HOST,
	port: env.BACKUP_DB_PORT,
	dialect: 'postgres',
	timezone: '+00:00',
	logging: false,
	dialectOptions: {
		useUTC: true,
	},
	pool: {
		max: 100, // Conexion simultaneous
		min: 0,
		acquire: 30000, // Wait a conenection avalible
		idle: 10000, // Close connections inactives
	},
})

export { db_main, db_backup }
