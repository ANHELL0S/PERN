import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { verifyToken } from '../middlewares/verify_token.middleware.js'
import { authController } from '../controllers/auth.controller.js'

const router = Router()

router.post('/signin', authController.signin)
router.post('/logout', Auth, authController.logout)
router.post('/refresh-token', authController.refreshToken)
router.post('/request-password-reset', authController.requestPasswordReset)
router.put('/reset-password/:id', verifyToken, authController.resetPassword)

export default router
