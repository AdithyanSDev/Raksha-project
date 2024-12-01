import { Request, Response } from "express";


const uploadAudio = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No audio file provided" });
    }

    const fileUrl = (req.file as any).location; // S3 file location from multerS3
    return res.status(200).json({ message: "Audio uploaded successfully", fileUrl });
  } catch (error) {
    console.error("Audio upload error:", error);
    return res.status(500).json({ message: "Audio upload failed", error });
  }
};

export default {
  uploadAudio,  
};
 