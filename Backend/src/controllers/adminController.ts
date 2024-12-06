// // backend/src/controllers/adminController.ts
// import { Request, Response } from 'express';

// const adminCredentials = {
//     email: 'admin@gmail.com',
//     password: 'admin@123', // Hardcoded credentials
// };

// // Admin login controller
// export const adminLogin = (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     if (email === adminCredentials.email && password === adminCredentials.password) {
//         return res.status(200).json({ message: 'Admin logged in successfully', token: 'admin-token' });
//     } else {
//         return res.status(401).json({ message: 'Invalid admin credentials' });
//     }
// };
