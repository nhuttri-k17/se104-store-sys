import React, { use, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useStateContext } from "@/context/StateContext";
import clsx from "clsx";

const OrderPage: NextPageWithLayout = ({
    orders,
    sessionData,
    giohang,
}: any) => {
    const router = useRouter();
    const { setCartItems, setTotalPrice, setTotalQuantities, setShowCart } =
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
                    }: {
                        sanphamId: String;
                        soluong: Number;
                        conlai: Number;
                        details: {
                            gia: Number;
                            hinhanh: String;
                            ten: String;
                        };
                    }) => {
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
                    (
                        acc: number,
                        {
                            soluong,
                            details: { gia },
                        }: { soluong: number; details: { gia: number } }
                    ) => acc + soluong * gia,
                    0
                )
            );
        }
    }, [giohang]);
    const [orderState, setOrderState] = useState(
        orders.map((order: any) => order)
    );
    const huyDon = async (id: string, index: number) => {
        const res = confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
        if (res) {
            const newOrders = [...orderState];
            newOrders[index].tinhtrang = "Hủy";
            setOrderState(newOrders);
            console.log(newOrders);

            await fetch(`http://localhost:8080/api/v1/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tinhtrang: "Hủy",
                }),
            });
        }
    };

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        },
    });

    console.log(orders);

    if (status === "loading") return <div>Loading...</div>;

    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <Typography variant="h4" className="py-10">
                    Lịch sử đơn hàng
                </Typography>
                <button
                    type="button"
                    className={clsx(
                        "flex py-4 me-16 justify-center rounded-md px-12 text-xl font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#f02d34] hover:bg-[#cb4e52] focus-visible:outline-[#da6b6e]"
                    )}
                    onClick={() => {
                        setShowCart(true);
                    }}
                >
                    Đặt đơn
                </button>
            </div>
            <div>
                <div className="flex flex-col gap-1">
                    {orders.map((order: any, index: number) => (
                        <div key={order.id} className="border p-5">
                            <div className="flex justify-between pb-3 items-center">
                                <div className="flex gap-4 items-center">
                                    <p className="text-[1.2rem] font-bold">
                                        Đơn hàng: {order.id}
                                    </p>
                                    <button
                                        type="button"
                                        disabled={order.tinhtrang === "Hủy"}
                                        className={clsx(
                                            "flex py-2 me-16 justify-center rounded-md  px-8 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ",
                                            {
                                                "bg-[#f02d34] hover:bg-[#cb4e52] focus-visible:outline-[#da6b6e]":
                                                    order.tinhtrang !== "Hủy",
                                                "bg-[#ccc]":
                                                    order.tinhtrang === "Hủy",
                                            }
                                        )}
                                        onClick={() => {
                                            if (order.tinhtrang !== "Hủy")
                                                huyDon(order.id, index);
                                        }}
                                    >
                                        Hủy đơn
                                    </button>
                                </div>
                                <p className="text-[1.2rem]">
                                    Ngày đặt:{" "}
                                    {format(
                                        new Date(order.ngaylap),
                                        "dd-MM-yyyy"
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between pb-5 items-center">
                                <p className="text-[1.2rem] font-medium">
                                    Tổng tiền: {order.tonggiatri} VND
                                </p>
                                <p>Trạng thái: {order.tinhtrang}</p>
                            </div>

                            {order?.chitietdonhang.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between py-2 px-10 items-center"
                                >
                                    <div className="flex justify-between gap-5 items-center">
                                        <img
                                            src={item.sanpham.details.hinhanh}
                                            alt=""
                                            className="size-[64px]"
                                        />
                                        <p className="text-[1.6rem]">
                                            {item.sanpham.details.ten}
                                        </p>
                                    </div>
                                    <p className="text-[1.3rem] w-min-[150px] text-right">
                                        số lượng: {item.soluong}
                                    </p>
                                    <p className="text-[1.6rem]">
                                        giá: {item.tonggiatri} VND
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;

import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { baseUrl } from "@/constants/url";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    const sessionData = session ? session.user : null;

    const orders = await fetch(
        `${baseUrl}/store_customers/orders/${sessionData?.id}`
    ).then((res) => res.json());

    let giohang = [];
    if (sessionData) {
        giohang = await fetch(
            `${baseUrl}/store_customers/cart/${sessionData.giohangId}`
        ).then((res) => res.json());
    }

    return {
        props: { orders, sessionData, giohang },
    };
};
