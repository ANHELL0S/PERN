import express from 'express'
import authRoutes from './routes/auth.routes.js'
import { limiterRequest } from './middlewares/rateLimit.middleware.js'

const router = express.Router()

// Endpoints public
router.use('/auth/', limiterRequest, authRoutes)

// Endpoints privates

export default router
