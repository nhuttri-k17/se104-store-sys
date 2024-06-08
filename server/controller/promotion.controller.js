import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const getAllPromotions = async (req, res) => {
    try {
        const all = await prisma.khuyenmai.findMany({
            where: {
                tinhtrang: true,
            },
        });
        res.json(all);
    } catch (error) {
        res.status(500).json({
            message: `Error getting promo ${error.message}`,
        });
    }
};

const getAllAvailablePromo = async (req, res) => {
    try {
        const today = dayjs().toDate();
        const all = await prisma.khuyenmai.findMany({
            where: {
                tinhtrang: true,
                AND: [
                    {
                        ngaybatdau: {
                            lte: today,
                        },
                    },
                    {
                        ngayketthuc: {
                            gte: today,
                        },
                    },
                ],
            },
        });
        res.json(all);
    } catch (error) {
        res.status(500).json({
            message: `Error getting available promo ${error.message}`,
        });
    }
};

const getPromotionDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await prisma.khuyenmai.findUnique({
            where: {
                id,
                tinhtrang: true,
            },
        });
        if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }
        res.json(promotion);
    } catch (error) {
        res.status(500).json({
            message: `Error getting promo detail ${error.message}`,
        });
    }
};

const createPromotion = async (req, res) => {
    try {
        const { ten, ngaybatdau, ngayketthuc, giatri } = req.body;
        const promotion = await prisma.khuyenmai.create({
            data: {
                ten,
                ngaybatdau,
                ngayketthuc,
                giatri: parseInt(giatri, 10),
                tinhtrang: true,
            },
        });
        res.json(promotion);
    } catch (error) {
        res.status(500).json({
            message: `Error creating promo ${error.message}`,
        });
    }
};

const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const { ten, ngaybatdau, ngayketthuc, giatri } = req.body;
        const promotion = await prisma.khuyenmai.update({
            where: {
                id,
            },
            data: {
                ten,
                ngaybatdau,
                ngayketthuc,
                giatri: parseInt(giatri, 10),
            },
        });
        res.json(promotion);
    } catch (error) {
        res.status(500).json({
            message: `Error updating promo ${error.message}`,
        });
    }
};

const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await prisma.khuyenmai.update({
            where: {
                id,
            },
            data: {
                tinhtrang: false,
            },
        });
        res.json(promotion);
    } catch (error) {
        res.status(500).json({
            message: `Error deleting promo ${error.message}`,
        });
    }
};

export {
    getAllPromotions,
    getPromotionDetail,
    createPromotion,
    updatePromotion,
    deletePromotion,
    getAllAvailablePromo,
};
