import { PrismaClient } from "@prisma/client";
import pkg from "bcryptjs";
const { hash, compare } = pkg;

const prisma = new PrismaClient();

const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await prisma.taikhoan.findFirst({
            where: {
                email,
            },
        });

        // const hashedPassword = await hash(password, 12);
        const isPasswordValid = await compare(password, account.password);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        } else if (account.password !== password) {
            //} else if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is incorrect" });
        }
        const { password: p, ...accountWithoutPassword } = account;
        res.json(accountWithoutPassword);
    } catch (error) {
        res.status(500).json({
            message: `Error auth for login ${error.message}`,
        });
    }
};

const loginCustomerAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await prisma.taikhoankhachhang.findFirst({
            where: {
                email,
            },
            include: {
                khachhang: true,
            },
        });

        const isPasswordValid = await compare(password, account.password);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        } else if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const { password: p, ...accountWithoutPassword } = account;
        res.json(accountWithoutPassword);
    } catch (error) {
        res.status(500).json({
            message: `Error auth for login ${error.message}`,
        });
    }
};

const registerCustomerAccount = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existedAccount = await prisma.taikhoankhachhang.findFirst({
            where: {
                email,
            },
        });

        if (existedAccount) {
            return res.status(400).json({ message: "Account existed" });
        }
        const customer = await prisma.khachhang.create({
            data: {
                email,
                ten: name,
            },
        });

        const hashedPassword = await hash(password, 12);

        const account = await prisma.taikhoankhachhang.create({
            data: {
                email,
                password: hashedPassword,
                ten: name,
                khachhangId: customer.id,
            },
        });
        res.json(account);
    } catch (error) {
        res.status(500).json({
            message: `Error register customer account ${error.message}`,
        });
    }
};

const upsertCustomer = async (req, res) => {
    try {
        const { email, name } = req.body;
        const customer = await prisma.khachhang.upsert({
            where: {
                email,
            },
            update: {
                ten: name,
            },
            create: {
                email,
                ten: name,
            },
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({
            message: `Error upsert customer ${error.message}`,
        });
    }
};

export {
    loginAccount,
    upsertCustomer,
    loginCustomerAccount,
    registerCustomerAccount,
};
