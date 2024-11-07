import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string; // Cast to string to avoid TypeScript error

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        });
    };
};
