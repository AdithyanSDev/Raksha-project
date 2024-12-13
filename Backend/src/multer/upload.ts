import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/awsS3";

const   upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME as string,
    key: function (req, file, cb) {
      let folder;
      if (file.fieldname === "resourceDocuments") {
        folder = "resource-request-documents";
      } else if (file.fieldname === "materialImages") {
        folder = "material-donations"; // Folder for material donation images
      } else {
        folder = "resource-images";
      }
      cb(null, `${folder}/${Date.now().toString()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;
