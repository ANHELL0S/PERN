import { UserModel } from '../models/users.models.js'
import { sendResponse } from '../utils/response_handler.util.js'

async function checkUserRole(req, res, next, roles) {
	try {
		const user = req.user
		const userRole = await UserModel.getRoleByUserId(user.id)
		if (!roles.includes(userRole.type_rol))
			return sendResponse(res, 401, 'No tienes permiso para realizar esta acción.')
		next()
	} catch (error) {
		return sendResponse(res, 500, 'Error al verificar el rol del usuario.')
	}
}

export function hasRole(roles) {
	return (req, res, next) => checkUserRole(req, res, next, roles)
}
