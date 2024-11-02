import { db } from "../../../config";

interface ITasks {
    title: string;
    description: string;
    user_id: string;
}

export const create = async ({title, description, user_id}: ITasks) => {
    try {

        const task = await db.tasks.create({
            data: {
                title,
                description,
                user_id
            }
        });

        return {
            message: "Task created successfully",
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
            },
        };

    } catch (error) {
        throw error;
    }
};
