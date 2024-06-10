import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.donhang.findMany({
            include: {
                chitietdonhang: true,
            },
        });
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({
            message: `Error getting orders ${error.message}`,
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const { khachhangId, chitietdonhang = [], khuyenmaiId } = req.body;
        // console.log(khachhangId, chitietdonhang, khuyenmaiId);
        console.log(req.body);

        if (!khachhangId || chitietdonhang.length === 0) {
            const messagess = !khachhangId
                ? "Customer ID is required"
                : "No product in order";
            let mess = "";
            if (!khachhangId) mess += "miss khachhangId";
            if (chitietdonhang.length === 0) mess += "miss chitietdonhang";
            return res.status(400).json({
                message: `Invalid order data ${messagess}, ${mess}}`,
            });
        }

        if (
            chitietdonhang.some(
                (item) => !item.id || !item.soluong || !item.gia
            )
        ) {
            return res.status(400).json({
                message:
                    "Invalid order data missing data from order details, please check id, soluong or gia fields",
            });
        }

        chitietdonhang.forEach(async (item) => {
            const check = await prisma.sanphamcuahang.findFirst({
                where: {
                    id: item.id,
                    soluong: {
                        lt: item.soluong,
                    },
                },
            });

            if (check) {
                return res.status(400).json({ message: "Not enough product" });
            }
            await prisma.sanphamcuahang.update({
                where: {
                    id: item.id,
                },
                data: {
                    soluong: {
                        decrement: item.soluong,
                    },
                },
            });
        });
        let discount = 100;
        const today = dayjs().toDate();
        if (khuyenmaiId) {
            const promo = await prisma.khuyenmai.findUnique({
                where: {
                    id: khuyenmaiId,
                    AND: [
                        { ngaybatdau: { lte: today } },
                        { ngayketthuc: { gte: today } },
                        { tinhtrang: true },
                    ],
                },
            });

            discount = promo ? 100 - promo.giatri : 100;
        }

        const order = await prisma.donhang.create({
            data: {
                khachhangId,
                tonggiatri:
                    (chitietdonhang.reduce(
                        (total, item) => total + item.gia * item.soluong,
                        0
                    ) *
                        discount) /
                    100,
                tinhtrang: "Chưa xử lý",
                khuyenmaiId,
            },
        });

        if (!order) {
            return res.status(400).json({ message: "Error creating orer" });
        }

        await prisma.chitietdonhang.createMany({
            data: chitietdonhang.map((item) => ({
                sanphamId: item.id,
                soluong: item.soluong,
                tonggiatri: (item.gia * item.soluong * discount) / 100,
                donhangId: order.id,
            })),
        });

        return res.json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Error creating order ${error.message}`,
        });
    }
};

const getOrderDetail = async (req, res) => {
    try {
        {
            const { id } = req.params;
            const order = await prisma.donhang.findUnique({
                where: {
                    id,
                },
                include: {
                    chitietdonhang: {
                        include: {
                            sanpham: {
                                include: {
                                    details: true,
                                },
                            },
                        },
                    },
                    khachhang: true,
                    khuyenmai: true,
                },
            });

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            const response = {
                id: order.id,
                khachhang: order.khachhang,
                khuyenmaiId: order.khuyenmaiId,
                khuyenmaigiatri: order.khuyenmai?.giatri,
                ngaylap: order.ngaylap,
                tonggiatri: order.tonggiatri,
                tinhtrang: order.tinhtrang,

                chitietdonhang: order.chitietdonhang.map((detail) => ({
                    sanphamId: detail.sanpham.id,
                    soluong: detail.soluong,
                    tonggiatri: detail.tonggiatri,
                    ten: detail.sanpham.details.ten,
                    loai: detail.sanpham.details.loai,
                })),
            };

            return res.json(response);
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error getting order detail ${error.message}`,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { tinhtrang } = req.body;
        const order = await prisma.donhang.update({
            where: {
                id,
            },
            data: {
                tinhtrang,
            },
        });
        return res.json(order);
    } catch (error) {
        return res.status(500).json({
            message: `Error updating order ${error.message}`,
        });
    }
};

const getOrderOfCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { setoff } = req.query;

        const query = {
            where: {
                khachhangId: id,
            },
            include: {
                chitietdonhang: {
                    include: {
                        sanpham: {
                            include: {
                                details: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                ngaylap: "desc",
            },
        };

        if (setoff !== null && setoff !== undefined) {
            query.take = parseInt(setoff, 10);
        }

        const orders = await prisma.donhang.findMany(query);

        if (orders.length === 0) {
            return res.status(404).json([]);
        }

        return res.json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Error getting order of customer ${error.message}`,
        });
    }
};

export {
    getAllOrders,
    createOrder,
    getOrderDetail,
    updateOrder,
    getOrderOfCustomer,
};
