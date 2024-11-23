import http from 'http'
import helmet from 'helmet'
import dotenv from 'dotenv'
import express from 'express'
import routes from './routes.js'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { db_main } from './config/db.config.js'
import { setupCors } from './config/cors.config.js'
import { startServer } from './utils/start_server.util.js'
import { setupMorgan } from './middlewares/morgan.middleware.js'
import { queueMiddleware } from './middlewares/queue.middleware.js'
import { errorHandler } from './middlewares/errorHandler.middleware.js'

dotenv.config()

// Initialize the application and start the server HTTP
const app = express()
const server = http.createServer(app)

// Loggers
setupCors(app)
setupMorgan(app)

// Configure security headers and response compression
app.use(helmet())
app.use(compression())

// Enable cookie analysis on requests
app.use(cookieParser())
app.use(express.json({ limit: '10mb' })) // Limit analysis json 10 mb
app.use(errorHandler)

// Route, applying middleware to handle queues
app.use('/api/', queueMiddleware, routes)

// Synchronize the main database without forcing destructive changes
Promise.all([db_main.sync({ force: false })])
	.then(() => {
		startServer(server)
	})
	.catch(err => {
		console.error('Error syncing with databases:', err)
	})
