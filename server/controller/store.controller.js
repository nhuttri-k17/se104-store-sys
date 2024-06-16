import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const itemGenres = {
    "mong-tay-gia": "Móng tay giả",
    "dong-ho": "Đồng hồ",
    "trang-suc": "Trang sức",
    nhan: "Nhẫn",
    "vong-tay": "Vòng tay",
    "khuyen-tai": "Khuyên tai",
};

const getAllProducts = async (req, res) => {
    try {
        const storage = await prisma.sanpham.findMany({
            where: {
                tinhtrang: "đang bán",
                xoa: false,
            },
        });

        storage.forEach(async (storeProduct) => {
            const product = await prisma.sanphamcuahang.findFirst({
                where: {
                    id: storeProduct.id,
                },
            });
            if (!product) {
                await prisma.sanphamcuahang.create({
                    data: {
                        id: storeProduct.id,
                        soluong: 0,
                    },
                });
            }
        });

        await prisma.sanphamcuahang.deleteMany({
            where: {
                sanphamkho: {
                    xoa: true,
                },
            },
        });

        await prisma.sanphamcuahang.deleteMany({
            where: {
                sanphamkho: {
                    tinhtrang: "chưa bán",
                },
                soluong: 0,
            },
        });

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

        const count = await prisma.sanphamcuahang.count({
            where: {
                sanphamkho: {
                    details: query,
                },
            },
        });

        const all = await prisma.sanphamcuahang.findMany({
            where: {
                sanphamkho: {
                    details: query,
                },
            },
            take: _end - _start,
            skip: parseInt(_start, 10),
            orderBy: {
                sanphamkho: {
                    details: {
                        [_sort]: _order,
                    },
                },
            },
            include: {
                sanphamkho: {
                    include: {
                        details: true,
                    },
                },
            },
        });

        const pro = all.map((product) => ({
            ...product.sanphamkho.details,
            id: product.id,
            soluong: product.soluong,
            tinhtrang: product.sanphamkho.tinhtrang,
        }));
        res.setHeader("x-total-count", count.toString());
        res.setHeader("Access-Control-Expose-Headers", "x-total-count");
        return res.status(200).json(pro);
    } catch (error) {
        return res.status(500).json({
            message: `Error get store products ${error.message}`,
        });
    }
};

const getAllProductsWithoutQuery = async (req, res) => {
    try {
        const storage = await prisma.sanpham.findMany({
            where: {
                tinhtrang: "đang bán",
                xoa: false,
            },
        });

        storage.forEach(async (storeProduct) => {
            const product = await prisma.sanphamcuahang.findFirst({
                where: {
                    id: storeProduct.id,
                },
            });
            if (!product) {
                await prisma.sanphamcuahang.create({
                    data: {
                        id: storeProduct.id,
                        soluong: 0,
                    },
                });
            }
        });

        await prisma.sanphamcuahang.deleteMany({
            where: {
                sanphamkho: {
                    xoa: true,
                },
            },
        });

        await prisma.sanphamcuahang.deleteMany({
            where: {
                sanphamkho: {
                    tinhtrang: "chưa bán",
                },
                soluong: 0,
            },
        });

        const all = await prisma.sanphamcuahang.findMany({
            include: {
                sanphamkho: {
                    include: {
                        details: true,
                    },
                },
            },
        });

        const pro = all.map((product) => ({
            ...product.sanphamkho.details,
            soluong: product.soluong,
            tinhtrang: product.sanphamkho.tinhtrang,
            id: product.id,
        }));

        return res.json(pro);
    } catch (error) {
        return res.status(500).json({
            message: `Error get store products ${error.message}`,
        });
    }
};

const getAllProductsWithQuery = async (req, res) => {
    try {
        const { q } = req.query;
        const products = await prisma.sanphamcuahang.findMany({
            where: {
                sanphamkho: {
                    details: {
                        ten: {
                            contains: q,
                        },
                    },
                },
            },
            include: {
                sanphamkho: {
                    include: {
                        details: true,
                    },
                },
            },
        });

        if (products.length === 0) return res.json([]);

        const pro = products.map((product) => ({
            ...product.sanphamkho.details,
            soluong: product.soluong,
            tinhtrang: product.sanphamkho.tinhtrang,
            id: product.id,
        }));
        return res.json(pro);
    } catch (error) {
        return res.status(500).json({
            message: `Error get store products ${error.message}`,
        });
    }
};

const getProductBasedOnGenre = async (req, res) => {
    try {
        const { loai } = req.params;
        const products = await prisma.sanphamcuahang.findMany({
            where: {
                sanphamkho: {
                    details: {
                        loai: loai,
                    },
                },
            },
            include: {
                sanphamkho: {
                    include: {
                        details: true,
                    },
                },
            },
        });
        const pro = products.map((product) => ({
            ...product.sanphamkho.details,
            soluong: product.soluong,
            tinhtrang: product.sanphamkho.tinhtrang,
            id: product.id,
        }));
        return res.json(pro);
    } catch (error) {
        return res.status(500).json({
            message: `Error get store products ${error.message}`,
        });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.sanphamcuahang.findFirst({
            where: {
                id,
            },
            include: {
                sanphamkho: {
                    include: {
                        details: true,
                    },
                },
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const pro = {
            ...product.sanphamkho.details,
            slkho: product.sanphamkho.soluong,
            soluong: product.soluong,
            tinhtrang: product.sanphamkho.tinhtrang,
            id: product.id,
        };
        return res.json(pro);
    } catch (error) {
        return res.status(500).json({
            message: `Error get product detail ${error.message}`,
        });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const store = await primsa.sanphamcuahang.findFirst({
            where: {
                tinhtrang: "đang bán",
            },
        });
        if (store) {
            return res.status(404).json({ message: "Product has existed" });
        }
        const pro = await primsa.sanphamcuahang.create({
            data: {
                id,
                soluong: 0,
            },
        });
        if (!pro) {
            return res.status(404).json({ message: "Failed to add" });
        }
        return res.json(pro);
    } catch (error) {
        return res.status(500).json({
            message: `Error adding product from shop ${error.message}`,
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
            nhaphang = "0",
        } = req.body;

        const product = await prisma.sanpham.findFirst({
            where: {
                id,
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

        if (product.soluong < parseInt(nhaphang, 10)) {
            return res.status(404).json({ message: "Not enough products" });
        }

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await prisma.sanpham.update({
            where: {
                id,
            },
            data: {
                soluong: {
                    decrement: parseInt(nhaphang, 10),
                },
            },
        });

        await prisma.sanphamcuahang.update({
            where: {
                id,
            },
            data: {
                soluong: parseInt(soluong, 10) + parseInt(nhaphang, 10),
            },
        });

        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: `Error updating products ${error.message}`,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.sanphamcuahang.delete({
            where: {
                id,
            },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const sto = await prisma.sanpham.update({
            where: {
                id,
            },
            data: {
                soluong: {
                    increment: product.soluong,
                },
                tinhtrang: "chưa bán",
            },
        });
        if (!sto) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: `Error deleting products ${error.message}`,
        });
    }
};

export {
    deleteProduct,
    updateProduct,
    addNewProduct,
    getAllProducts,
    getProductDetail,
    getAllProductsWithoutQuery,
    getAllProductsWithQuery,
    getProductBasedOnGenre,
};
