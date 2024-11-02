import { Router } from 'express'
import { authController } from '../../controllers'

const router = Router()

const { login, register, getmyinfo } = authController

router.post('/register', register)

router.post('/login', login)

router.get('/myinfo/:user_id', getmyinfo)

export default router
