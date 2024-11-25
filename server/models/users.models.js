import { Op } from 'sequelize'
import { hashPassword } from '../helpers/bcrypt.helper.js'
import { userScheme, rolScheme } from '../schema/schemes.js'

export class UserModel {
	static async getAllUsers() {
		try {
			const users = await userScheme.findAll({
				include: {
					model: rolScheme,
					attributes: ['type_rol'],
					where: { type_rol: { [Op.notIn]: ['admin'] } },
				},
				order: [['createdAt', 'ASC']],
			})
			return users
		} catch (error) {
			throw new Error(error)
		}
	}

	static async getUserById(id) {
		try {
			const user = await userScheme.findByPk(id, {
				include: { model: rolScheme, attributes: ['type_rol'] },
			})
			return user
		} catch (error) {
			throw new Error(error)
		}
	}

	static async createUser(userData) {
		try {
			const newUser = await userScheme.create(userData)
			if (userData.role) {
				await rolScheme.create({
					id_user_fk: newUser.id_user,
					type_rol: userData.role,
				})
			}
			return newUser
		} catch (error) {
			throw new Error(error.message)
		}
	}

	static async updateUser(id, newData) {
		try {
			const user = await userScheme.findByPk(id, {
				include: rolScheme,
			})

			const currentRole = await rolScheme.findOne({ where: { id_user_fk: user.id_user } })

			await currentRole.update({ type_rol: newData.role })

			const { role, ...userData } = newData
			await user.update(userData)

			return user
		} catch (error) {
			throw new Error(error.message)
		}
	}

	static async changeActiveUser(id, active = false) {
		try {
			const user = await userScheme.findByPk(id)
			if (active) {
				user.active = true
			} else {
				user.active = false
			}
			await user.save()
			return true
		} catch (error) {
			throw new Error(error)
		}
	}

	static async getUserByUsername(username) {
		try {
			const user = await userScheme.findOne({
				where: { username },
				include: { model: rolScheme, attributes: ['type_rol'] },
			})
			return user
		} catch (error) {
			throw new Error(error)
		}
	}

	static async getUserByEmail(email) {
		try {
			const user = await userScheme.findOne({
				where: { email },
				include: { model: rolScheme, attributes: ['type_rol'] },
			})
			return user
		} catch (error) {
			throw new Error(error)
		}
	}

	static async getUserByCLI(identification_card) {
		try {
			const user = await userScheme.findOne({
				where: { identification_card },
				include: { model: rolScheme, attributes: ['type_rol'] },
			})
			return user
		} catch (error) {
			throw new Error(error)
		}
	}

	static async deleteUser(id) {
		try {
			const user = await userScheme.findByPk(id)
			await user.destroy()
		} catch (error) {
			throw new Error(error)
		}
	}

	static async getAllRoles() {
		try {
			const roles = await rolScheme.findAll()
			return roles
		} catch (error) {
			throw new Error(error)
		}
	}

	static async getRoleByUserId(id) {
		try {
			const role = await rolScheme.findOne({ where: { id_user_fk: id } })
			return role
		} catch (error) {
			throw new Error(error)
		}
	}

	static async createRole(roleData) {
		try {
			const newRole = await rolScheme.create(roleData)
			return newRole
		} catch (error) {
			throw new Error(error)
		}
	}

	static async updateRole(id, newData) {
		try {
			const role = await rolScheme.findByPk(id)
			await role.update(newData)
			return role
		} catch (error) {
			throw new Error(error)
		}
	}

	static async removeRole(id) {
		try {
			const role = await rolScheme.findByPk(id)
			await role.destroy()
		} catch (error) {
			throw new Error(error)
		}
	}
}

userScheme.afterSync(async () => {
	try {
		const existingUser = await userScheme.findOne()
		if (!existingUser) {
			const hashedPassword = await hashPassword('999999999', 10)
			await userScheme.create({
				username: 'Vet. Médidico',
				email: 'vet@gmail.com',
				phone: '0000000000',
				identification_card: '9999999999',
				residence: 'Por defecto',
				password: hashedPassword,
			})
		}
	} catch (error) {
		console.error(error)
	}
})

rolScheme.afterSync(async () => {
	try {
		const existingRole = await rolScheme.findOne({ where: { type_rol: 'admin' } })
		if (!existingRole) {
			const userAdmin = await userScheme.findOne({ where: { email: 'vet@gmail.com' } })
			if (userAdmin) await rolScheme.create({ type_rol: 'admin', id_user_fk: userAdmin.id_user })
		}
	} catch (error) {
		console.error(error)
	}
})
