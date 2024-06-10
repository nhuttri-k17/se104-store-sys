import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const getAllCustomer = async (req, res) => {
    try {
        const all = await prisma.khachhang.findMany();
        return res.json(all);
    } catch (error) {
        return res.status(500).json({ message: `Error ${error.message}` });
    }
};

const createCustomer = async (req, res) => {
    try {
        const {
            ten = "chưa đặt tên",
            hinhanh = "",
            email,
            sdt = "",
        } = req.body;
        const existEmail = await prisma.khachhang.findFirst({
            where: { email: email },
        });
        if (existEmail) {
            return res.status(400).json({ message: "Email is already taken" });
        }
        let uploadedResponse = null;
        if (hinhanh !== "") {
            uploadedResponse = await cloudinary.uploader.upload(hinhanh, {
                folder: "customer_avatar",
            });
        }

        const khachhang = await prisma.khachhang.create({
            data: {
                ten,
                email,
                sdt,
                hinhanh: uploadedResponse?.url || "https://i.pravatar.cc/300",
            },
        });
        if (!khachhang) {
            return res
                .status(400)
                .json({ message: "Failed to create customer" });
        }
        return res.json(khachhang);
    } catch (error) {
        return res.status(500).json({
            message: `Error create customer ${error.message}`,
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const kh = await prisma.khachhang.findUnique({
            where: {
                id,
            },
        });
        if (!kh) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.json(kh);
    } catch (error) {
        return res.status(500).json({
            message: `Error get customer by id ${error.message}`,
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const kh = await prisma.khachhang.delete({
            where: {
                id,
            },
        });
        if (!kh) {
            return res.status(404).json({ message: "Account not found" });
        }

        const giohang = await prisma.khachhang.delete({
            where: {
                id: kh.giohangId,
            },
        });
        return res.json(kh);
    } catch (error) {
        return res.status(500).json({
            message: `Error deleting customer ${error.message}`,
        });
    }
};

const getCustomerByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const kh = await prisma.khachhang.findFirst({
            where: {
                email,
            },
            include: {
                chitietgiohang: true,
            },
        });
        if (!kh) {
            return res.status(404).json({ message: "Account not found" });
        }

        return res.json(kh);
    } catch (error) {
        return res.status(500).json({
            message: `Error get customer email ${error.message}`,
        });
    }
};

const updateCustomerInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { ten, hinhanh = "", sdt = "" } = req.body;
        if (!ten || ten === "") {
            return res.status(400).json({ message: "Name is required" });
        }

        let uploadedResponse = null;
        if (hinhanh !== "") {
            uploadedResponse = await cloudinary.uploader.upload(hinhanh, {
                folder: "customer_avatar",
            });
        }

        const kh = await prisma.khachhang.findUnique({
            where: {
                id,
            },
        });
        if (!kh) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await prisma.khachhang.update({
            where: {
                id,
            },
            data: {
                ten,
                sdt,
                hinhanh: uploadedResponse?.url || kh.hinhanh,
            },
        });
        if (!kh) {
            return res.status(404).json({ message: "Customer not found" });
        }
        return res.json(kh);
    } catch (error) {
        return res.status(500).json({
            message: `Error update customer info ${error.message}`,
        });
    }
};

export {
    getAllCustomer,
    deleteCustomer,
    createCustomer,
    getCustomerById,
    getCustomerByEmail,
    updateCustomerInfo,
};
