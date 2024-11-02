import { db } from "../../../config";

export const getmyinfo = async (user_id: string) => {
    try {

        if (!user_id) {
            throw new Error("User ID is required");
        }

        const user = await db.users.findFirst({
            where: { id: user_id },
            select: {
                id: true,
                email: true,
                name: true,
                last_name: true
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            message: "Getting user information",
            data: {
                user,
            },
        };

    } catch (error) {
        throw error;
    }
};
