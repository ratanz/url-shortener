import { generateToken } from "../utils/helper.js";
import { register_user_service } from "../services/auth.service.js";
import { login_user_service } from "../services/auth.service.js";

export const register_user = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      
      // Validate input
      if (!name || !email || !password) {
         return res.status(400).json({ error: "All fields are required" });
      }

      const result = await register_user_service(name, email, password);

      if (result instanceof Error) {
         return res.status(400).json({ error: result.message || "Failed to register user" });
      }
      
      res.status(201).json(result);
   } catch (error) {
      res.status(500).json({ error: "Server error during registration" });
   }
};

export const login_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await login_user_service(email, password);
        
        if (user instanceof Error) {
            return res.status(400).json({ error: user.message || "Failed to login user" });
        }
        
        // Create a proper payload object with the user id
        const token = generateToken({ id: user._id });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Server error during login" });
    }
};