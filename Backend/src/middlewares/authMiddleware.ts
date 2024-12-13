import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sfkjPIFfjfipa';

console.log("JWT_SECRET:", process.env.JWT_SECRET);

interface AuthRequest extends Request {
    user?: any; // You can refine the type based on your user model
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    

    const authHeader = req.header('Authorization'); // Capture the Authorization header
    const token = authHeader?.replace('Bearer ', '');
    console.log("Extracted token:", token);
    console.log("Authorization Header:", authHeader);

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (err) {
        console.error("Token verification error:", err); // Log error details
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

