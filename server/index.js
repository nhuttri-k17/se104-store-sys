import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import accountRouter from "./routes/account.routes.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import storeRouter from "./routes/store.routes.js";
import staffRouter from "./routes/staff.routes.js";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
    const emailExist = await prisma.taikhoan.findFirst({
        where: {
            email: "alice@gami9l.com",
        },
    });
    if (emailExist) {
        return res.json(emailExist);
    }

    const admin = await prisma.nhanvien.create({
        data: {
            ten: "Admin",
            vaitro: "admin",
            hinhanh: "https://i.imgur.com/2u6bZp0.jpg",
        },
    });
    const user = await prisma.taikhoan.create({
        data: {
            nhanvienId: admin.id,
            ten: "Alice",
            email: "alice@gami9l.com",
            password: "1234567",
        },
    });
    res.json(user);
});

app.use("/api/v1/store", storeRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/login", authRouter);

app.listen(8080, () => {
    console.log(`Server is running on port http://localhost:8080`);
});
