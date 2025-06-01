import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
import shortUrl from "../models/shorturl.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

// All routes in this file require authentication
router.use(authMiddleware);

// Get user's URLs
router.get("/urls", async (req, res, next) => {
  try {
    // This route is protected, so req.user is available
    const userId = req.user.id;
    
    // Fetch user's URLs from the database
    const urls = await shortUrl.find({ user: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: urls
    });
  } catch (error) {
    next(error);
  }
});

// Get user profile
router.get("/profile", async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Fetch user from database without password
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put("/profile", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Update fields if provided
    if (name) user.name = name;
    
    // If email is changing, check if it already exists
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
      }
      user.email = email;
    }
    
    // If password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    // Save updated user
    await user.save();
    
    // Return user without password
    const updatedUser = await User.findById(userId).select("-password");
    
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

export default router;
