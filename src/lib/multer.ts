import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        const fileExtension: string = file.originalname.split(".")[1];
        const newFileName: string = `${uuidv4()}.${fileExtension}`;
        cb(null, newFileName);
    },
});

const upload = multer({ storage });

export default upload;
