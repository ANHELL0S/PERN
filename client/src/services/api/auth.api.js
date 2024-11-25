import { authInstance } from '../../config/instances'

const signinRequest = async data => {
	try {
		const response = await authInstance.post(`/signin`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const infoClientRequest = async data => {
	try {
		const response = await authInstance.post('/info', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const closeRequest = async data => {
	try {
		const response = await authInstance.post(`/logout`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const refreshTokenRequest = async () => {
	try {
		const response = await authInstance.post('/refresh-token')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const validateOTPRequest = async data => {
	try {
		const response = await authInstance.post('/validate-otp', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const passwordResetRequest = async data => {
	try {
		const response = await authInstance.post('/request-password-reset', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const resetPasswordRequest = async (id, data) => {
	try {
		const response = await authInstance.put(`/reset-password/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	closeRequest,
	signinRequest,
	infoClientRequest,
	validateOTPRequest,
	refreshTokenRequest,
	passwordResetRequest,
	resetPasswordRequest,
}
