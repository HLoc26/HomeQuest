import { Attachment } from "../models/index.js";
class AttachmentService {
	static async saveProof(taskId, files) {
		const attachments = files.map((file) => ({
			attachment_path: file.path,
			task_id: taskId,
		}));
		return await Attachment.bulkCreate(attachments);
	}

	static getAttachments(taskId) {
		return Attachment.findAll({ where: { task_id: taskId } });
	}
}

export default AttachmentService;
