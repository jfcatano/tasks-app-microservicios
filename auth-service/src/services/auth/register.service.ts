import { db } from "../../../config";
import { generateHashedPassword } from "../../utils/hashPassword.utils";

interface IRegisterData {
    name: string;
    last_name: string;
    email: string;
    password: string;
}

export const register = async ({ name, last_name, email, password, }: IRegisterData) => {
    try {
        const user = await db.users.findFirst({
            where: { email },
        });

        if (user) {
            throw new Error(`User with email ${email} already exists`);
        }

        const cratedUser = await db.users.create({
            data: {
                name,
                last_name,
                email,
                password: await generateHashedPassword(password),
            },
        });

        return {
            message: "User registered successfully",
            data: {
                id: cratedUser.id,
                email: cratedUser.email,
            },
        };
    } catch (error) {
        throw error;
    }
};
