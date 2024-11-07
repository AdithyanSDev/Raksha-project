
import { IUser } from '../../models/User';  

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}
// src/types/express/index.d.ts

declare namespace Express {
  interface MulterS3File extends Multer.File {
    location: string; // Add the location property for S3 uploads
  }

  interface Request {
    file?: MulterS3File; // Make sure req.file uses this extended type
  }
}
