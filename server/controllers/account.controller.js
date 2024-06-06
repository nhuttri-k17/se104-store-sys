import { PrismaClient } from "@prisma/client";
import pkg from "bcryptjs";
const { hash, compare } = pkg;

const prisma = new PrismaClient();

const getAllAccounts = async (req, res) => {
    try {
        const all = await prisma.taikhoan.findMany();
        const allWithoutPasswords = all.map(({ password, ...rest }) => rest);
        res.json(allWithoutPasswords);
    } catch (error) {
        res.status(500).json({
            message: `Error getting accounts ${error.message}`,
        });
    }
};

const getEmptyAccount = async (req, res) => {
    try {
        const empty = await prisma.taikhoan.findMany({
            where: {
                nhanvienId: null,
            },
        });

        const emptyWithoutPasswords = empty.map(
            ({ password, ...rest }) => rest
        );
        res.json(emptyWithoutPasswords);
    } catch (error) {
        res.status(500).json({
            message: `Error getting empty account ${error.message}`,
        });
    }
};

const getAccountBasedOnStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await prisma.taikhoan.findFirst({
            where: {
                nhanvienId: id,
            },
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const { password: p, ...accountWithoutPassword } = account;
        res.json(accountWithoutPassword);
    } catch (error) {
        res.status(500).json({
            message: `Error get account of staff ${error.message}`,
        });
    }
};

const createAccount = async (req, res) => {
    try {
        const { ten, email, password } = req.body;
        const existAccount = await prisma.taikhoan.findFirst({
            where: {
                email,
            },
        });
        if (existAccount) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        // const hashedPassword = await hash(password, 12);

        const account = await prisma.taikhoan.create({
            data: {
                ten,
                email,
                password, // : hashedPassword,
            },
        });
        const { password: p, ...accountWithoutPassword } = account;
        res.json(accountWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: `Error creating ${error.message}` });
    }
};

const getAccountDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await prisma.taikhoan.findUnique({
            where: {
                id,
            },
        });
        res.json(account);
    } catch (error) {
        res.status(500).json({
            message: `Error get accout detail ${error.message}`,
        });
    }
};

const changePasswordAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const account = await prisma.taikhoan.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({
            message: `Error changing password ${error.message}`,
        });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await prisma.taikhoan.delete({
            where: {
                id,
            },
        });
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: `Error delete acc ${error.message}` });
    }
};

export {
    getAllAccounts,
    getAccountBasedOnStaff,
    createAccount,
    getAccountDetail,
    changePasswordAccount,
    deleteAccount,
    getEmptyAccount,
};
