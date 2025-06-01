import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import userDAO from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";

export const register_user_service = async (name, email, password) => {
    try {
        const user = await userDAO.FindUserByEmail(email);
        if (user) {
            return new Error("User already exists");
        }
        
        const newUser = await userDAO.CreateUser(name, email, password);
        const token = signToken({ id: newUser._id });
        return { user: newUser, token };
    } catch (error) {
        console.error("Registration error:", error);
        return error;
    }
}

export const login_user_service = async (email, password) => {
    try {
        const user = await userDAO.FindUserByEmail(email);

        if (!user) {
            return new Error("User not found");
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return new Error("Incorrect password");
        }
        
        return user;
    } catch (error) {
        console.error("Login error:", error);
        return error;
    }
}

export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}


