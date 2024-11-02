import { Request, Response } from 'express';
import { authServices } from '../../services'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const data = await authServices.login(email, password);

        res.status(200).json(data)
    } catch (error) {
        console.error('Error in user login: ', error)
        res.status(500).json({ message: 'Internal server error.', error })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { name, last_name, email, password } = req.body;

        const data = await authServices.register({ name, last_name, email, password });

        res.status(200).json(data)
    } catch (error) {
        console.error('Error in user registration: ', error)
        res.status(500).json({ message: 'Internal server error.', error })
    }
}

export const getmyinfo = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const data = await authServices.getmyinfo(user_id);

        res.status(200).json(data)
    } catch (error) {
        console.error('Error getting user information:', error)
        res.status(500).json({ message: 'Internal server error.', error })
    }
}
