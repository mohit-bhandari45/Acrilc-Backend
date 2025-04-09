import axios from "axios";
import FormData from "form-data";

class UploadService {
    static async upload(formData: FormData) {
        const response = await axios.post("https://api.imgbb.com/1/upload?key=34cb3d0fe2362f6b0dcf3fcd9e8860b6", formData);
        return response;
    }
}

export default UploadService;
