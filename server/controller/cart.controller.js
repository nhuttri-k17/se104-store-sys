import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const onAddCart = async (req, res) => {
    try {
        const { giohangId } = req.params;
        const { productId, quantity } = req.body;

        const existedCart = await prisma.chitietgiohang.findFirst({
            where: {
                giohangId: giohangId,
                sanphamId: productId,
            },
            include: {
                sanpham: true,
            },
        });

        if (existedCart) {
            if (
                existedCart.sanpham.soluong < parseInt(quantity, 10) ||
                existedCart.soluong > existedCart.sanpham.soluong ||
                existedCart.soluong + parseInt(quantity, 10) >
                    existedCart.sanpham.soluong
            ) {
                const cart = await prisma.chitietgiohang.update({
                    where: {
                        giohangId_sanphamId: {
                            giohangId: giohangId,
                            sanphamId: productId,
                        },
                    },
                    data: {
                        soluong: existedCart.sanpham.soluong,
                    },
                });

                return res
                    .status(400)
                    .json({ message: "Product out of stock", ...cart });
            }

            const cart = await prisma.chitietgiohang.update({
                where: {
                    giohangId_sanphamId: {
                        giohangId: giohangId,
                        sanphamId: productId,
                    },
                },
                data: {
                    soluong: {
                        increment: parseInt(quantity, 10),
                    },
                },
            });
            return res.json(cart);
        } else {
            const product = await prisma.sanphamcuahang.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product.soluong < parseInt(quantity, 10)) {
                return res
                    .status(400)
                    .json({ message: "Product out of stock", ...product });
            }

            const cart = await prisma.chitietgiohang.create({
                data: {
                    soluong: parseInt(quantity, 10),
                    sanphamId: productId,
                    giohangId: giohangId,
                },
            });
            return res.json(cart);
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error add cart ${error.message}`,
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { giohangId } = req.params;
        const { productId, quantity } = req.body;

        console.log(giohangId, productId, quantity);

        const existedCart = await prisma.chitietgiohang.findFirst({
            where: {
                giohangId: giohangId,
                sanphamId: productId,
            },
            include: {
                sanpham: true,
            },
        });

        if (!existedCart) {
            return res.status(404).json([]);
        }

        if (existedCart.sanpham.soluong < parseInt(quantity, 10)) {
            const cart = await prisma.chitietgiohang.update({
                where: {
                    giohangId_sanphamId: {
                        giohangId: giohangId,
                        sanphamId: productId,
                    },
                },
                data: {
                    soluong: existedCart.sanpham.soluong,
                },
            });

            return res
                .status(400)
                .json({ message: "Product out of stock", ...cart });
        }

        const cart = await prisma.chitietgiohang.update({
            where: {
                giohangId_sanphamId: {
                    giohangId: giohangId,
                    sanphamId: productId,
                },
            },
            data: {
                soluong: parseInt(quantity, 10),
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: `Error update cart ${err.message}`,
        });
    }
};

const getCartDetail = async (req, res) => {
    try {
        const { giohangId } = req.params;

        const cart = await prisma.chitietgiohang.findMany({
            where: {
                giohangId,
            },
            include: {
                sanpham: {
                    include: {
                        sanphamkho: {
                            include: {
                                details: true,
                            },
                        },
                    },
                },
            },
        });

        if (cart.length === 0) {
            return res.status(404).json([]);
        }

        const cartItems = cart
            .map((item) => {
                return {
                    sanphamId: item.sanphamId,
                    soluong: item.soluong,
                    conlai: item.sanpham.soluong,
                    details: {
                        ...item.sanpham.sanphamkho.details,
                    },
                };
            })
            .filter((item) => item.soluong > 0);

        return res.json(cartItems);
    } catch (error) {
        return res.status(500).json({
            message: `Error get cart detail ${error.message}`,
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const { giohangId } = req.params;
        const cart = await prisma.chitietgiohang.deleteMany({
            where: {
                giohangId,
            },
        });
        return res.json(cart);
    } catch {
        return res.status(500).json({
            message: `Error clear cart detail ${error.message}`,
        });
    }
};

const removeItem = async (req, res) => {
    try {
        const { giohangId } = req.params;
        const { productId } = req.body;
        const cart = await prisma.chitietgiohang.delete({
            where: {
                giohangId_sanphamId: {
                    giohangId,
                    sanphamId: productId,
                },
            },
        });
        return res.json(cart);
    } catch (error) {
        return res.status(500).json({
            message: `Error remove item ${error.message}`,
        });
    }
};

export { onAddCart, updateCart, getCartDetail, clearCart, removeItem };
