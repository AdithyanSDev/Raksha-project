    import { Request, Response } from 'express';
    import jwt from 'jsonwebtoken';
    import passport from 'passport';

    export const googleAuthCallback = (req: Request, res: Response) => {
        passport.authenticate('google', { failureRedirect: '/login' }, async (err, user, info) => {
          if (err || !user) {
            return res.status(400).json({ message: 'Google authentication failed' });
          }
      
          // Fetch user role and other relevant data
          const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
          });
          console.log("Generated token:", token);
      
          // Option to set a cookie with the token
          res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
          
          // Redirect to frontend with token and role
          res.redirect(`http://localhost:5173?token=${token}&role=${user.role}`);
        })(req, res);
      };
      