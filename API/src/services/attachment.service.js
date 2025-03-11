import { Attachment } from "../models/index.js";
class AttachmentService {
	static saveProof(attachments) {
		return Attachment.bulkCreate(attachments);
	}
}

export default AttachmentService;
