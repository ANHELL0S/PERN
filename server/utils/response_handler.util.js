const sendResponse = (res, statusCode, message = '', data = {}) => {
	if (statusCode === 500) message = '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.'

	return res.status(statusCode).json({
		status: statusCode === 200 ? 'success' : 'error',
		code: statusCode,
		message,
		data,
	})
}

export { sendResponse }
