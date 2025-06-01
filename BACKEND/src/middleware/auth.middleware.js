import { verifyToken } from "../utils/helper.js";
import { UnauthorizedError } from "../utils/errorHandler.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication required');
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedError('Authentication token missing');
    }
    
    try {
      // Verify the token
      const decoded = verifyToken(token);
      
      // Add user data to request
      req.user = { id: decoded.id };
      
      next();
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  } catch (error) {
    next(error);
  }
};
