import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes in this file require authentication
router.use(authMiddleware);

// Example protected route - Get user's URLs
router.get("/urls", async (req, res, next) => {
  try {
    // This route is protected, so req.user is available
    const userId = req.user.id;
    
    // In a real implementation, you would fetch the user's URLs from the database
    // For now, we'll just return a placeholder response
    res.status(200).json({
      success: true,
      message: "Protected route accessed successfully",
      userId: userId,
      urls: [] // This would be populated with the user's URLs from the database
    });
  } catch (error) {
    next(error);
  }
});

export default router;
