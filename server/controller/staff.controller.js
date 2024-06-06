import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const getAllStaffs = async (req, res) => {
    try {
        const all = await prisma.nhanvien.findMany({
            where: {
                xoa: false,
            },
        });
        res.json(all);
    } catch (error) {
        res.status(500).json({
            message: `Error getting staff ${error.message}`,
        });
    }
};

const getStaffDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const acc = await prisma.taikhoan.findFirst({
            where: {
                nhanvienId: id,
            },
        });

        const staff = await prisma.nhanvien.findUnique({
            where: {
                id,
                xoa: false,
            },
        });
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.json({ ...staff, email: acc.email });
    } catch (error) {
        res.status(500).json({
            message: `Error getting staff detail ${error.message}`,
        });
    }
};

const createStaff = async (req, res) => {
    try {
        const { ten, taiKhoanId, vaitro, hinhanh } = req.body;
        const existStaff = await prisma.taikhoan.findFirst({
            where: {
                id: taiKhoanId,
            },
        });
        if (existStaff && existStaff.nhanvienId) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        let uploadedResponse = null;
        if (hinhanh !== "") {
            uploadedResponse = await cloudinary.uploader.upload(hinhanh, {
                folder: "staff_avatar",
            });
        }

        const staff = await prisma.nhanvien.create({
            data: {
                ten,
                vaitro,
                hinhanh: uploadedResponse?.url || "",
            },
        });
        if (!staff) {
            return res.status(400).json({ message: "Create staff failed" });
        }
        const assignAccount = await prisma.taikhoan.update({
            where: {
                id: taiKhoanId,
            },
            data: {
                nhanvienId: staff.id,
            },
        });
        if (!assignAccount) {
            return res.status(400).json({ message: "Assign account failed" });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({
            message: `Error creating staff ${error.message}`,
        });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        const staff = await prisma.nhanvien.findFirst({
            where: {
                id,
            },
        });

        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        if (staff.vaitro == "admin") {
            return res.status(400).json({ message: "Cannot delete admin" });
        }
        await prisma.nhanvien.update({
            where: {
                id,
            },
            data: {
                xoa: true,
            },
        });

        const account = await prisma.taikhoan.update({
            where: {
                nhanvienId: id,
            },
            data: {
                nhanvienId: null,
            },
        });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({
            message: `Error deleting staff ${error.message}`,
        });
    }
};

const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { ten, vaitro, hinhanh } = req.body;

        let uploadedResponse = null;

        const staff = await prisma.nhanvien.findFirst({
            where: {
                id,
            },
        });

        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        if (hinhanh !== "" || hinhanh !== staff.hinhanh) {
            uploadedResponse = await cloudinary.uploader.upload(hinhanh, {
                folder: "staff_avatar",
            });
        }

        await prisma.nhanvien.update({
            where: {
                id,
            },
            data: {
                ten,
                vaitro,
                hinhanh: uploadedResponse?.url || staff.hinhanh,
            },
        });
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({
            message: `Error updating staff ${error.message}`,
        });
    }
};

export { getAllStaffs, createStaff, deleteStaff, updateStaff, getStaffDetail };
