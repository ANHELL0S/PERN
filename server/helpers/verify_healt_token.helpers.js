const isTokenExpired = token => {
	const arrayToken = token.split('.')
	const tokenPayload = JSON.parse(Buffer.from(arrayToken[1], 'base64').toString())
	const currentTime = Math.floor(Date.now() / 1000)
	return currentTime >= tokenPayload.exp
}

export { isTokenExpired }
