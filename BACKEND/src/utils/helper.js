import { nanoid } from "nanoid"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const generateNanoId = (length) => {
    return nanoid(length)
}

export const signToken = (payload) => {
    // Use environment variable or fallback to a default secret
    const secret = process.env.JWT_SECRET || "url_shortener_default_secret_key_2025";
    if (!secret) {
        throw new Error("JWT secret is not configured");
    }
    return jwt.sign(payload, secret, {
        expiresIn: "1h",
    });
}

export const verifyToken = (token) => {
    // Use environment variable or fallback to a default secret
    const secret = process.env.JWT_SECRET || "url_shortener_default_secret_key_2025";
    if (!secret) {
        throw new Error("JWT secret is not configured");
    }
    return jwt.verify(token, secret);
}

// Export signToken as generateToken for backward compatibility
export const generateToken = signToken;
