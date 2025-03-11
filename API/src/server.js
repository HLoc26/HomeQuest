import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import syncDatabase from "./config/syncdb.js";
import router from "./routes/index.routes.js";

const PORT = process.env.PORT;
const HOST = process.env.HOST_NAME;

const app = express();

app.use((req, res, next) => {
	console.log(req.headers.origin);
	next();
});

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	})
);
// Cấu hình để phục vụ file tĩnh từ thư mục 'uploads'
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, HOST, async () => {
	await syncDatabase();
	console.log(`Listening on http://${HOST}:${PORT}`);
});
