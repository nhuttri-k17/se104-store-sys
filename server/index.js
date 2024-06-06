import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    const data = prisma.sanpham.findMany();
    res.send(data);
});

app.listen(8080, () => {
    console.log(`Server is running on port http://localhost:8080`);
});
