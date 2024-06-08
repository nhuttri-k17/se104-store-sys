import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllStrategy = async (req, res) => {
    try {
        const all = await prisma.chienluoc.findMany();
        res.json(all);
    } catch (error) {
        res.status(500).json({
            message: `Error getting strategies ${error.message}`,
        });
    }
};

const getStrategyDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const strategy = await prisma.chienluoc.findUnique({
            where: {
                id,
            },
            include: {
                nguoidang: true,
            },
        });
        if (!strategy) {
            return res.status(404).json({ message: "Strategy not found" });
        }
        res.json(strategy);
    } catch (error) {
        res.status(500).json({
            message: `Error getting strategy detail ${error.message}`,
        });
    }
};

const createStrategy = async (req, res) => {
    try {
        const { ten, noidung, nhanvienId } = req.body;
        const strategy = await prisma.chienluoc.create({
            data: {
                ten,
                noidung,
                nhanvienId,
            },
        });
        if (!strategy) {
            return res.status(400).json({ message: "Create strategy failed" });
        }
        res.json(strategy);
    } catch (error) {
        res.status(500).json({
            message: `Error creating strategy ${error.message}`,
        });
    }
};

const updateStrategy = async (req, res) => {
    try {
        const { id } = req.params;
        const { ten, noidung } = req.body;
        const strategy = await prisma.chienluoc.update({
            where: {
                id,
            },
            data: {
                ten,
                noidung,
            },
        });
        if (!strategy) {
            return res.status(404).json({ message: "Strategy not found" });
        }
        res.json(strategy);
    } catch (error) {
        res.status(500).json({
            message: `Error updating strategy ${error.message}`,
        });
    }
};

const deleteStrategy = async (req, res) => {
    try {
        const { id } = req.params;
        const strategy = await prisma.chienluoc.delete({
            where: {
                id,
            },
        });
        if (!strategy) {
            return res.status(404).json({ message: "Strategy not found" });
        }
        res.json(strategy);
    } catch (error) {
        res.status(500).json({
            message: `Error deleting strategy ${error.message}`,
        });
    }
};

export {
    getAllStrategy,
    getStrategyDetail,
    createStrategy,
    updateStrategy,
    deleteStrategy,
};
