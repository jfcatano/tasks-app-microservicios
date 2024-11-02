import { Router } from 'express'
import authRoutes from './tasks/tasks.routes'
import { validateJWT } from '../middlewares/validatejtw'

const router = Router()

// Use the validateJWT middleware for all the routes in the tasks service
router.use('/tasks', validateJWT, authRoutes)

export default router
