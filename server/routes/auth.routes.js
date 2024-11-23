import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { authController } from '../controllers/auth.controller.js'

const router = Router()

router.post('/signin', authController.signin)
router.get('/verify', authController.verifyToken)
router.post('/logout', Auth, authController.logout)
router.post('/refresh-token', authController.refreshToken)
router.put('/reset-password/:id', authController.resetPassword)
router.post('/request-password-reset', authController.requestPasswordReset)

export default router
