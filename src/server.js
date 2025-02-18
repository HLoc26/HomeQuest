import express from "express";
import "dotenv/config"
import syncDatabase from "./config/syncdb.js";
import router from "./routes/index.routes.js";
import cors from "cors"

const PORT = process.env.PORT;
const HOST = process.env.HOST_NAME;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router);


app.listen(PORT, HOST, async () => {
    await syncDatabase();
    console.log(`Listening on http://${HOST}:${PORT}`);
})