import { Attachment } from "../models/index.js";
class AttachmentService {
	static saveProof(attachments) {
		return Attachment.bulkCreate(attachments);
	}

	static getAttachments(taskId) {
		return Attachment.findAll({ where: { task_id: taskId } });
	}
}

export default AttachmentService;
