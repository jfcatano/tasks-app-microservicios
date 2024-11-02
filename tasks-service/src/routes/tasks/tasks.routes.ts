import { Router } from 'express'
import { tasksController } from '../../controllers'

const router = Router()

const { create, getall_byid, update, delete_task } = tasksController

// Endpoint to create a task
router.post('/', create)

// Endpoint to get all tasks by user id
router.get('/', getall_byid)

// Endpoint to update a task
router.put('/:id', update)

// Endpoint to delete a task
router.delete('/:id', delete_task)

export default router
