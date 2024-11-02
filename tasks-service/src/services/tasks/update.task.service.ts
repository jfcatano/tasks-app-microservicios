import { db } from "../../../config";

interface ITasks {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export const update = async ({id, title, description, completed}: ITasks) => {
    try {

        if (!id) {
            throw new Error('Task ID is required');
        }

        const task = await db.tasks.update({
            where: { id },
            data: {
                title,
                description,
                completed
            }
        });

        return {
            message: "Task updated successfully",
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed
            },
        };

    } catch (error) {
        throw error;
    }
};
