import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const {
            _end,
            _order,
            _start,
            _sort,
            ten_like = "",
            loai = "",
        } = req.query;

        const query = {};

        if (loai !== "") {
            query.loai = loai;
        }

        if (ten_like) {
            query.ten = { contains: ten_like };
        }

        try {
            const count = await prisma.sanpham.count({
                where: {
                    xoa: false,
                    details: {
                        ...query,
                    },
                },
            });

            const all = await prisma.sanpham.findMany({
                where: {
                    xoa: false,
                    details: {
                        ...query,
                    },
                },
                take: _end - _start,
                skip: parseInt(_start, 10),
                orderBy: {
                    [_sort]: _order,
                },
                include: {
                    details: true,
                },
            });
            const pro = all.map((product) => ({
                ...product.details,
                ...product,
            }));
            res.setHeader("x-total-count", count.toString());
            res.setHeader("Access-Control-Expose-Headers", "x-total-count");
            res.status(200).json(pro);
        } catch (error) {
            res.status(500).json({
                message: `Error get product from storage ${error.message}`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error get product from storage ${error.message}`,
        });
    }
};
const createProduct = async (req, res) => {
    try {
        const { ten, loai, hinhanh, gia, mota, soluong } = req.body;
        const tinhtrang = "chưa bán";
        const product = await prisma.sanpham.create({
            data: {
                soluong: parseInt(soluong, 10),
                tinhtrang,
                detailId: randomUUID(),
            },
            include: {
                details: true,
            },
        });
        if (!product) {
            return res
                .status(400)
                .json({ message: "Create product detail failed" });
        }
        const hinhanhUrl = await cloudinary.uploader.upload(hinhanh, {
            folder: "products",
        });

        await prisma.sanphamdetail.create({
            data: {
                id: product.detailId,
                ten,
                loai,
                hinhanh: hinhanhUrl.url,
                gia: parseInt(gia, 10),
                mota,
            },
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: `Error creating products ${error.message}`,
        });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.sanpham.findUnique({
            where: {
                id,
                xoa: false,
            },
            include: {
                details: true,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ ...product.details, ...product });
    } catch (error) {
        res.status(500).json({
            message: `Error getting product detail ${error.message}`,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            ten,
            gia,
            mota,
            loai,
            hinhanh,
            soluong = "0",
            tinhtrang,
            nhapkho = "0",
            xuatkho = "0",
        } = req.body;
        const product = await prisma.sanpham.update({
            where: {
                id,
            },
            data: {
                soluong: parseInt(soluong, 10) + parseInt(nhapkho, 10),
                tinhtrang,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productDetail = await prisma.sanphamdetail.findFirst({
            where: {
                id: product.detailId,
            },
        });

        if (!productDetail) {
            return res
                .status(404)
                .json({ message: "Product detail not found" });
        }

        let hinhanhUrl = null;
        if (hinhanh !== productDetail.hinhanh && hinhanh !== "") {
            hinhanhUrl = await cloudinary.uploader.upload(hinhanh, {
                folder: "products",
            });
        }

        await prisma.sanphamdetail.update({
            where: {
                id: product.detailId,
            },
            data: {
                ten,
                gia: parseInt(gia, 10),
                mota,
                hinhanh: hinhanhUrl?.url || productDetail.hinhanh,
                loai,
            },
        });

        const store = await prisma.sanphamcuahang.findFirst({
            where: {
                id,
            },
        });

        let pro = null;
        if (!store && tinhtrang === "đang bán") {
            await prisma.sanphamcuahang.create({
                data: {
                    id,
                    soluong: parseInt(xuatkho, 10),
                },
            });
            pro = await prisma.sanpham.update({
                where: {
                    id,
                },
                data: {
                    soluong: product.soluong - parseInt(xuatkho, 10),
                },
                include: {
                    details: true,
                },
            });
            const { details, ...rest } = pro;
            res.json({ ...details, ...rest });
        } else if (store && tinhtrang === "đang bán") {
            await prisma.sanphamcuahang.update({
                where: {
                    id,
                },
                data: {
                    soluong: parseInt(xuatkho, 10) + store.soluong,
                },
            });
            pro = await prisma.sanpham.update({
                where: {
                    id,
                },
                data: {
                    soluong: product.soluong - parseInt(xuatkho, 10),
                },
                include: {
                    details: true,
                },
            });
            const { details, ...rest } = pro;
            res.json({ ...details, ...rest });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: `Error updating product ${error.message}`,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const st = await prisma.sanphamcuahang.findFirst({
            where: {
                id,
            },
        });
        if (st) {
            await prisma.sanphamcuahang.delete({
                where: {
                    id,
                },
            });
        }

        const product = await prisma.sanpham.update({
            where: {
                id,
            },
            data: {
                xoa: true,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: `Error deleting products ${error.message}`,
        });
    }
};

export {
    getAllProducts,
    createProduct,
    getProductDetail,
    updateProduct,
    deleteProduct,
};
