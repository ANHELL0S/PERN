import { DataTypes } from 'sequelize'
import { db_main } from '../config/db.config.js'

/* ------------------------------- USERS -----------------------------*/

const userScheme = db_main.define(
	'user',
	{
		id_user: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true,
			validate: {
				is: /^[0-9]+$/,
			},
		},
		identification_card: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true,
		},
		residence: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		paranoid: true,
		timestamps: true,
		tableName: 'users',
	}
)

/* ------------------------------- ROLES -----------------------------*/

const rolScheme = db_main.define(
	'role',
	{
		id_rol: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		type_rol: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'employee',
			validate: {
				isIn: [['admin', 'employee', 'client']],
			},
		},
		id_user_fk: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
	},
	{
		paranoid: true,
		tableName: 'roles',
	}
)

userScheme.hasOne(rolScheme, {
	foreignKey: 'id_user_fk',
	sourceKey: 'id_user',
})

/* ------------------------------- ROLES -----------------------------*/

const tokenScheme = db_main.define(
	'token',
	{
		id_token: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		id_user_fk: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id_user',
			},
			onDelete: 'CASCADE',
		},
		token: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		used: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		paranoid: true,
		tableName: 'token',
	}
)

userScheme.hasOne(tokenScheme, {
	foreignKey: 'id_user_fk',
	sourceKey: 'id_user',
})

/* ------------------------------- LOGS -----------------------------*/

const logsScheme = db_main.define(
	'logs',
	{
		id_log: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		level: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_fk: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: userScheme,
				key: 'id_user',
			},
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		httpMethod: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		action: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		meta: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		ipAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		endpoint: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		timestamps: true,
		tableName: 'logs',
	}
)

logsScheme.belongsTo(userScheme, {
	foreignKey: 'user_fk',
	targetKey: 'id_user',
})

export { userScheme, rolScheme, tokenScheme, logsScheme }
