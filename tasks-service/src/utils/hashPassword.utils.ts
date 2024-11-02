import bcrypt from "bcrypt";

export const generateHashedPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};
