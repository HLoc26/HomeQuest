import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		// Lấy extension của file gốc
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + "-" + Date.now() + ext);
	},
});

const upload = multer({ storage: storage });

export default upload;
