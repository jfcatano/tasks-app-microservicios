import { db } from "../../../config";

export const delete_task = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Task ID is required");
        }

        const taskExists = await db.tasks.findFirst({
            where: { id },
        });

        if (!taskExists) {
            throw new Error("Task not found");
        }

        const task = await db.tasks.delete({
            where: { id },
        });

        return {
            message: "Task deleted succesfully",
            data: {
                task,
            },
        };
    } catch (error) {
        throw error;
    }
};
