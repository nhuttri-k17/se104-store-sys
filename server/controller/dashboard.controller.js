import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const totalSale = async () => {
    try {
        const result = await prisma.donhang.aggregate({
            _sum: {
                tonggiatri: true,
            },
        });
        return result._sum.tonggiatri ? result._sum.tonggiatri : 0;
    } catch (error) {
        console.error("Error aggregating total sale:", error);
    }
};

const monthSaleFromNow = async (setoff = 0) => {
    try {
        const startOfMonth = dayjs().subtract(setoff).startOf("month").toDate();
        const endOfMonth = dayjs().subtract(setoff).endOf("month").toDate();

        const result = await prisma.donhang.aggregate({
            where: {
                ngaylap: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
            _sum: {
                tonggiatri: true,
            },
        });
        return result._sum.tonggiatri ? result._sum.tonggiatri : 0;
    } catch (error) {
        console.error("Error aggregating total sale:", error);
    }
};

const monthOfYearSale = async () => {
    try {
        const res = [];
        for (let i = 0; i < 12; i++) {
            const start = dayjs()
                .startOf("year")
                .month(i)
                .startOf("month")
                .toDate();
            const end = dayjs()
                .startOf("year")
                .month(i)
                .endOf("month")
                .toDate();

            const response = await prisma.donhang.aggregate({
                _sum: {
                    tonggiatri: true,
                },
                where: {
                    AND: [
                        { ngaylap: { gte: start } },
                        { ngaylap: { lte: end } },
                    ],
                },
            });
            res.push({
                tonggiatri: response._sum.tonggiatri
                    ? response._sum.tonggiatri
                    : 0,
            });
        }

        return res;
    } catch (error) {
        console.error("Error aggregating total sale:", error);
    }
};

const totalCustomer = async () => {
    try {
        const result = await prisma.khachhang.count();
        return result;
    } catch (error) {
        console.error("Error aggregating total customer:", error);
    }
};

const newMonthCustomerFromNow = async (setoff = 0) => {
    try {
        const startOfMonth = dayjs().subtract(setoff).startOf("month").toDate();
        const endOfMonth = dayjs().subtract(setoff).endOf("month").toDate();

        const result = await prisma.khachhang.count({
            where: {
                ngaylap: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });
        return result;
    } catch (error) {
        console.error("Error aggregating customer", error);
    }
};

const topProductSale = async (setoff = 5) => {
    try {
        const result = await prisma.chitietdonhang.groupBy({
            by: ["sanphamId"],
            _sum: {
                tonggiatri: true,
            },
            orderBy: {
                _sum: {
                    tonggiatri: "desc",
                },
            },
            take: setoff,
        });
        const res = await Promise.all(
            result.map(async (item) => {
                const tmp = await prisma.sanpham.findUnique({
                    where: {
                        id: item.sanphamId,
                    },
                    include: {
                        details: true,
                    },
                });
                const { hinhanh, ...details } = tmp.details;
                return {
                    tonggiatri: item._sum.tonggiatri,
                    id: item.sanphamId,
                    // ...item,
                    ...details,
                };
            })
        );

        return res;
    } catch (error) {
        console.error("Error aggregating top product sale:", error);
    }
};
const totalRevenue = async (req, res) => {
    const total_sale = (await totalSale()) || 0;
    const last_month_sale = (await monthSaleFromNow(1)) || 0;
    const this_month_sale = (await monthSaleFromNow(0)) || 0;
    const year = (await monthOfYearSale()) || [];
    const customer = (await totalCustomer()) || 0;
    const this_month_customer = (await newMonthCustomerFromNow(0)) || 0;
    const top_product_sale = (await topProductSale()) || [];
    return res.json({
        total_sale,
        last_month_sale,
        this_month_sale,
        year,
        customer,
        this_month_customer,
        top_product_sale,
    });
};

export { totalRevenue };
