import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/auth.routes.js";
import accountRouter from "./routes/account.routes.js";
import personalRouter from "./routes/personal.routes.js";
import staffRouter from "./routes/staff.routes.js";
import strategyRouter from "./routes/strategy.routes.js";
import promotionRouter from "./routes/promotion.routes.js";
import customerRouter from "./routes/customer.routes.js";
import storeRouter from "./routes/store.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import orderRouter from "./routes/order.routes.js";

import storeCustomerRouter from "./routes/store_customer.routes.js";
import storeproductRouter from "./routes/store_product.routes.js";
import storepromo from "./routes/store_promo.routes.js";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
    const emailExist = await prisma.taikhoan.findFirst({
        where: {
            email: "alice@gmail.com",
        },
    });

    const pr = await prisma.khuyenmai.findMany();
    let promos = [];
    if (pr.length <= 1) {
        promos = getRandomPromo();
    }

    if (emailExist) {
        return res.json(emailExist);
    }

    const admin = await prisma.nhanvien.create({
        data: {
            ten: "Admin",
            vaitro: "admin",
            hinhanh: "https://i.pravatar.cc/300",
        },
    });
    const user = await prisma.taikhoan.create({
        data: {
            nhanvienId: admin.id,
            ten: "Alice",
            email: "alice@gmail.com",
            password: "1234567",
        },
    });

    res.json({ user, promos });
});

app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/me", personalRouter);
app.use("/api/v1/promotions", promotionRouter);
app.use("/api/v1/strategies", strategyRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/login", authRouter);

app.use("/store_products", storeproductRouter);
app.use("/store_promotions", storepromo);
app.use("/store_customers", storeCustomerRouter);

app.listen(8080, () => {
    console.log(
        `Server is running on port if you run local http://localhost:8080`
    );
});

function getRandomPromo() {
    const promoName = [
        "DEALOFTHEDAY",
        "SALEOFF",
        "DISCOUNT",
        "GIFT",
        "FREE",
        "BONUS",
        "LUCKY",
        "WIN",
        "LUCKYDRAW",
        "LUCKYSPIN",
    ];
    return promoName.map(async (name) => {
        await prisma.khuyenmai.create({
            data: {
                ten: name,
                giatri: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
                ngaybatdau: dayjs()
                    .add(Math.floor(Math.random() * (2 * 10 + 1)) - 10, "day")
                    .toDate(),
                ngayketthuc: dayjs()
                    .add(10 + Math.floor(Math.random() * (2 * 10 + 1)), "day")
                    .toDate(),
            },
        });
    });
}
