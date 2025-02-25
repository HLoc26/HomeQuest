import axios from "axios";

// Cấu hình axios cho các yêu cầu đến API (cả Auth Server và Resource Server)
const api = axios.create({
	baseURL: "http://localhost:3000", // Địa chỉ của server, có thể khác cho auth và resource server
	headers: {
		"Content-Type": "application/json", // Gửi dữ liệu dưới dạng JSON
	},
});

export default api;
