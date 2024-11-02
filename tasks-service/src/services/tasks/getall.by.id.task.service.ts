import { db } from "../../../config";

export const getall_byid = async (user_id: string) => {
    try {

        const task = await db.tasks.findMany({
            where: { user_id },
        });

        return {
            message: "Getting al tasks for user uuid",
            data: {
                task,
            },
        };

    } catch (error) {
        throw error;
    }
};
