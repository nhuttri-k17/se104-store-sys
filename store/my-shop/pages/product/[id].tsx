import { ProductCard } from "@/components";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useStateContext } from "@/context/StateContext";
import { TextField } from "@mui/material";
import toast, { Toast } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { baseUrl } from "@/constants/url";
import { GetServerSidePropsContext } from "next";

const FONT_SIZE = 9;
const DEFAULT_INPUT_WIDTH = 20;

const ProdcutDetail = ({
    product,
    products,
    giohang,
}: {
    product: any;
    products: any;
    giohang: any;
}) => {
    const [index, setIndex] = useState(1);
    const [isHolding, setIsHolding] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    let holdInterval: NodeJS.Timeout;
    const [intervalId, setIntervalId] = useState(120);

    const { data: session } = useSession();
    const user = session?.user;
    const onAddCartProductOnDB = async (product: any, soluong: number) => {
        if (user) {
            await fetch(
                `${baseUrl}/store_customers/cart_add/${user.giohangId}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        productId: product.id,
                        quantity: soluong,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    };

    const [inputWidth, setInputWidth] = useState(DEFAULT_INPUT_WIDTH);

    useEffect(() => {
        if (index.toString().length * FONT_SIZE > DEFAULT_INPUT_WIDTH) {
            setInputWidth((index.toString().length + 1) * FONT_SIZE);
        } else {
            setInputWidth(DEFAULT_INPUT_WIDTH);
        }
    }, [index]);

    useEffect(() => {
        setIndex(1);
    }, [product?.id]);

    useEffect(() => {
        if (isHolding !== 0) {
            holdInterval = setInterval(() => {
                isHolding > 0
                    ? setIndex(index < product?.soluong ? index + 1 : index)
                    : setIndex(index > 1 ? index - 1 : index);
                setIsHolding(isHolding > 0 ? isHolding + 1 : isHolding - 1);
                setIntervalId(intervalId > 5 ? intervalId - 5 : intervalId);
            }, intervalId);
        }

        return () => {
            clearInterval(holdInterval);
        };
    }, [isHolding]);

    const handleBuyNow = () => {
        setShowCart(true);
    };

    const { setCartItems, setTotalPrice, setTotalQuantities } =
        useStateContext();

    useEffect(() => {
        if (giohang) {
            setCartItems([
                ...giohang.map(
                    ({
                        sanphamId,
                        soluong,
                        conlai,
                        details: { gia, hinhanh, ten },
                    }: any) => {
                        return {
                            id: sanphamId,
                            soluong: soluong,
                            gia: gia,
                            ten: ten,
                            hinhanh: hinhanh,
                            conlai: conlai,
                        };
                    }
                ),
            ]);
            setTotalQuantities(
                giohang.reduce(
                    (acc: number, { soluong }: { soluong: number }) =>
                        acc + soluong,
                    0
                )
            );
            setTotalPrice(
                giohang.reduce(
                    (acc: number, { soluong, details: { gia } }: any) =>
                        acc + soluong * gia,
                    0
                )
            );
        }
    }, [giohang]);

    return (
        <div>
            <div className="product-detail-container">
                <div className="">
                    <div className="image-container">
                        <img
                            src={product?.hinhanh}
                            className="product-detail-image"
                        />
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1 className="text-[4rem] font-bold">{product?.ten}</h1>
                    <h4 className="text-[2rem] font-medium">Mô tả </h4>
                    <p className="text-[1rem] font-medium">{product?.mota}</p>
                    <p className="price">{product?.gia} VND</p>
                    <p className="text-[1rem]">Còn lại: {product?.soluong}</p>
                    <div className="quantity">
                        <h3>Số lượng:</h3>
                        <div className="quantity-desc">
                            <span
                                onClick={() => {
                                    setIndex(index > 1 ? index - 1 : index);
                                }}
                                className="minus user-select-none pointer-events-auto"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    setIsHolding(-1);
                                }}
                                onMouseLeave={(e) => {
                                    e.preventDefault();
                                    clearInterval(holdInterval);
                                    setIsHolding(0);
                                    setIntervalId(120);
                                }}
                                onMouseUp={(e) => {
                                    e.preventDefault();
                                    clearInterval(holdInterval);
                                    setIsHolding(0);
                                    setIntervalId(120);
                                }}
                            >
                                <AiOutlineMinus />
                            </span>
                            {/* <span className="num">{index}</span> */}
                            <TextField
                                variant="standard"
                                type="number"
                                fullWidth
                                className="num p-2"
                                value={index}
                                maxRows={product?.soluong.toString().length}
                                minRows={1}
                                onChange={(e) => {
                                    setIndex(
                                        Number(e.target.value) > product.soluong
                                            ? product.soluong
                                            : Number(e.target.value)
                                    );
                                }}
                                sx={{
                                    border: "none",
                                    width: `${inputWidth + 10}px`,
                                    padding: "8px",
                                }}
                                InputProps={{
                                    style: {
                                        border: "none", // Remove the border
                                        width: `${inputWidth + 10}px`, // Adjust padding to visually adjust the width
                                    },
                                    disableUnderline: true,
                                }}
                            />
                            <span
                                onClick={() => {
                                    setIndex(
                                        index < product?.soluong
                                            ? index + 1
                                            : index
                                    );
                                }}
                                className="plus"
                                onMouseLeave={(e) => {
                                    e.preventDefault();
                                    clearInterval(holdInterval);
                                    setIsHolding(0);
                                    setIntervalId(120);
                                }}
                                onMouseUp={(e) => {
                                    e.preventDefault();
                                    clearInterval(holdInterval);
                                    setIsHolding(0);
                                    setIntervalId(120);
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    setIsHolding(1);
                                }}
                            >
                                <AiOutlinePlus />
                            </span>
                        </div>
                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={() => {
                                if (session?.user) {
                                    console.log(session);
                                    onAdd(product, index);
                                    onAddCartProductOnDB(product, index);
                                } else {
                                    toast(
                                        "Vui lòng đăng nhập để thực hiện tính năng"
                                    );
                                }
                            }}
                        >
                            Thêm vào giỏ
                        </button>
                        <button
                            type="button"
                            className="buy-now"
                            onClick={() => {
                                if (session?.user) {
                                    handleBuyNow();
                                } else {
                                    toast("Vui lòng đăng nhập để mua hàng");
                                }
                            }}
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>Quan tâm</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item: any) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdcutDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const product = await await fetch(
        `${baseUrl}/store_products/${context.params?.id}`
    ).then((res) => res.json());
    const products = await fetch(`${baseUrl}/store_products`).then((res) =>
        res.json()
    );

    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    const sessionData = session ? session.user : null;

    let giohang = [];
    if (sessionData) {
        giohang = await fetch(
            `${baseUrl}/store_customers/cart/${sessionData.giohangId}`
        ).then((res) => res.json());
    }

    return {
        props: {
            giohang,
            products,
            product,
        },
    };
}
