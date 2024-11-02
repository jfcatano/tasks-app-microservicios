import { Request, Response } from 'express';
import { tasksServices } from '../../services'

export const create = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        const user_id = (req as any).user.id

        const data = await tasksServices.create({ title, description, user_id});

        res.status(200).json(data)
    } catch (error) {
        console.error('Error creating the user task:', error)
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export const getall_byid = async (req: Request, res: Response) => {
    try {
        const user_id  = (req as any).user.id

        const data = await tasksServices.getall_byid(user_id)
        
        res.status(200).json(data)
    } catch (error) {
        console.error(`Error getting all task for user`, error)
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { title, description, completed } = req.body;
        const { id } = req.params;

        const data = await tasksServices.update({ id, title, description, completed });
        
        res.status(200).json(data)
    } catch (error) {
        console.error(`Error updading a task for user:`, error)
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export const delete_task = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const data = await tasksServices.delete_task(id);
        
        res.status(200).json(data)
    } catch (error) {
        console.error(`Error updading a task for user:`, error)
        res.status(500).json({ message: 'Internal server error', error })
    }
}