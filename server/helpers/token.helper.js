function convertJwtRefreshToMilliseconds(jwtRefreshValue) {
	const days = parseInt(jwtRefreshValue)
	if (isNaN(days)) throw new Error('El valor de JWT_REFRESH no es válido.')
	return days * 24 * 60 * 60 * 1000
}

export { convertJwtRefreshToMilliseconds }
