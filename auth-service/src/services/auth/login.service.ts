import { db } from "../../../config";
import { generateJWT } from "../../utils";
import bcrypt from "bcrypt";

export const login = async (email: string, password: string) => {
    try {
        const user = await db.users.findFirst({
            where: { email },
        });

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        const passwordValidation = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordValidation) {
            throw new Error("Wrong password");
        }

        const token = await generateJWT({ id: user.id });

        return {
            message: "User logged in successfully",
            data: {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                accessToken: token,
            },
        };
    } catch (error) {
        throw error;
    }
};
