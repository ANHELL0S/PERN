import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { userController } from '../controllers/user.controller.js'

const router = Router()

router.get('/info-user', Auth, userController.infoUser)
router.put('/change-info', Auth, userController.updateInfoUser)
router.put('/change-password', Auth, userController.changePassword)

export default router
