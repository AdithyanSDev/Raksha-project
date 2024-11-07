import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sfkjPIFfjfipa'; // Ensure you have this set in your .env
console.log("1")
console.log("JWT_SECRET:", process.env.JWT_SECRET);

interface AuthRequest extends Request {
    user?: any; // You can refine the type based on your user model
}
console.log("2")
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Middleware initialized");
    console.log("Request headers:", req.headers); // Log the headers

    const authHeader = req.header('Authorization'); // Capture the Authorization header
    console.log("Authorization header:", authHeader);

    const token = authHeader?.replace('Bearer ', '');
    console.log("Extracted token:", token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        console.log("Decoded token:", decoded); // Log decoded user data
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (err) {
        console.error("Token verification error:", err); // Log error details
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

