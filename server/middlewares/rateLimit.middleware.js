import rateLimit from 'express-rate-limit'

const limiterRequest = rateLimit({
	windowMs: 10 * 1000, // Range time mlsg - 10 seconds
	max: 100, // Limit query
	message: JSON.stringify({ message: 'Demasiadas peticiones! Intentalo de nuevo en 10 segundos.' }),
	keyGenerator: req => req.ip,
})

export { limiterRequest }
