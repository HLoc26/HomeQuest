import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0", // Mở cổng để container có thể truy cập
		port: 5173, // Giữ nguyên cổng
		strictPort: true, // Giữ cổng 5173 cố định, tránh thay đổi ngẫu nhiên
		watch: {
			usePolling: true, // Đảm bảo theo dõi file đúng trong môi trường Docker
		},
	},
});
