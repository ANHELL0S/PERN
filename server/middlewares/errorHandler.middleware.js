const errorHandler = (err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
		return res.status(400).json({ message: 'Invalid JSON payload' })

	if (err.status === 413) return res.status(413).json({ message: 'Payload too large. Maximum limit is 10KB.' })

	next(err)
}

export { errorHandler }
