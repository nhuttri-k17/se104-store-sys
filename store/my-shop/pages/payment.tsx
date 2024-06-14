import React, { FormEvent, useEffect, useState } from "react";
import {
    Select,
    TextField,
    MenuItem,
    Typography,
    CircularProgress,
} from "@mui/material";

import { useStateContext } from "@/context/StateContext";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { set } from "date-fns";
import { NextPageWithLayout } from "next";
import { baseUrl } from "@/constants/url";
import Link from "next/link";
import { Footer } from "@/components";

const Payment: NextPageWithLayout = ({ promotions }: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        },
    });
    const [sdt, setSdt] = useState(
        session?.user?.sdt !== "" ? session?.user?.sdt : "09312456231"
    );
    const [diachi, setDiachi] = useState(
        session?.user?.diachi !== "" ? session?.user?.diachi : "Hà Nội"
    );
    useEffect(() => {
        if (status !== "authenticated") {
            router.push("/login");
        }
        console.log("status", status);
    }, [status]);

    const [promotion, setPromotion] = useState(promotions[0]);
    const {
        cartItems,
        setShowCart,
        totalPrice,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
    } = useStateContext();

    useEffect(() => {
        setShowCart(false);
        setIsLoading(false);
        if (cartItems.length < 1) {
            router.push("/");
        }
        console.log("cartItems", cartItems);
    }, []);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const body = {
            khachhangId: session?.user?.id,
            chitietdonhang: cartItems.map((item: any) => ({
                id: item.id,
                soluong: item.soluong,
                gia: item.gia,
            })),
            khuyenmaiId: promotion?.id,
        };
        console.log("submit");

        const response = await fetch(`${baseUrl}/api/v1/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data2 = await response.json();
        console.log(data2);
        setIsLoading(false);
        if (response.ok) {
            alert("Đặt hàng thành công");
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);
            await fetch(
                `${baseUrl}/store_customers/cart/${session?.user?.giohangId}`,
                {
                    method: "DELETE",
                }
            );

            router.push("/");
        } else {
            alert("Đặt hàng thất bại" + response.statusText);
        }
    };
    const onSubmit2 = async () => {
        setIsLoading(true);
        const body = {
            khachhangId: session?.user?.id,
            chitietdonhang: cartItems.map((item: any) => ({
                id: item.id,
                soluong: item.soluong,
                gia: item.gia,
            })),
            khuyenmaiId: promotion?.id,
        };
        console.log("submit");

        const response = await fetch(`${baseUrl}/api/v1/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data2 = await response.json();
        console.log(data2);
        setIsLoading(false);
        if (response.ok) {
            alert("Đặt hàng thành công");
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);
            await fetch(
                `${baseUrl}/store_customers/cart/${session?.user?.giohangId}`,
                {
                    method: "DELETE",
                }
            );

            router.push("/");
        } else {
            alert("Đặt hàng thất bại" + response.statusText);
        }
    };
    return (
        <div className="grid grid-cols-2 py-4 rounded-r-md">
            {isLoading && (
                <div className="z-[9999] bg-[#eee] absolute w-dvw h-dvh flex justify-center items-center opacity-90">
                    <CircularProgress />
                </div>
            )}
            <div className="bg-slate-300 h-dvh flex flex-col p-10 justify-center">
                <h2 className="text-[1.5rem] font-medium text-[#829493]">
                    Thanh toán
                </h2>
                <p className="text-[2rem] font-medium">
                    Tổng cộng:{" "}
                    {(totalPrice * (promotion ? 100 - promotion.giatri : 100)) /
                        100}{" "}
                    VND
                </p>
                <div className="py-5 border-b-2">
                    <div className="border-b-2 pb-5">
                        {cartItems.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex gap-2 justify-between py-2"
                            >
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={item.hinhanh}
                                        alt="hinhanh"
                                        className="inline-block flex-1   size-[32px]"
                                    />
                                    <div className="flex flex-col ps-2">
                                        <span className="inline-block font-bold">
                                            {item.ten}
                                        </span>
                                        <span className="inline-block">
                                            Số lượng: {item.soluong}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-[1.2rem] font-bold">
                                    {item.gia * item.soluong} VND
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-5 justify-between flex">
                        <p className="font-bold">Tổng giá trị: </p>
                        <p className="font-bold">{totalPrice} VND</p>
                    </div>
                    <div className="flex justify-between py-5">
                        <p className="font-bold">Mã giảm giá:</p>
                        {promotion ? (
                            <p className="font-bold">{promotion?.giatri}%</p>
                        ) : (
                            <p className="font-bold">Không có mã giảm giá</p>
                        )}
                    </div>
                </div>
                <div className="text-[1rem] font-bold flex justify-between">
                    <p>Tổng hóa đơn: </p>
                    <p>
                        {" "}
                        {(totalPrice *
                            (promotion ? 100 - promotion.giatri : 100)) /
                            100}{" "}
                        VND
                    </p>
                </div>
            </div>
            <div className="h-dvh rounded-l-sm flex flex-col justify-center p-10">
                <Typography className="text-[1.1rem] py-10">
                    Vui lòng nhập thông tin để hoàn tất đơn hàng
                </Typography>
                {/* <form onSubmit={onSubmit}> */}
                <div>
                    <div className="w-full">
                        <Typography className="text-[#11142d] text-[16px] my-[10px] font-[700]">
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            disabled={true}
                            defaultValue={session?.user?.email}
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                        />
                    </div>
                    <div className="w-full">
                        <Typography className="text-[#11142d] text-[16px] my-[10px] font-[700]">
                            Số điện thoại
                        </Typography>
                        <TextField
                            fullWidth
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                            type="number"
                            color="info"
                            variant="outlined"
                        />
                    </div>
                    <div className="w-full">
                        <Typography className="text-[#11142d] text-[16px] my-[10px] font-[700]">
                            Nhập địa chỉ
                        </Typography>
                        <TextField
                            fullWidth
                            value={diachi}
                            onChange={(e) => setDiachi(e.target.value)}
                            type="text"
                            color="info"
                            variant="outlined"
                        />
                    </div>
                    <div className="w-full">
                        <Typography className="text-[#11142d] text-[16px] my-[10px] font-[700]">
                            Áp dụng mã khuyến mãi
                        </Typography>
                        <Select
                            variant="outlined"
                            color="info"
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            value={promotion}
                            sx={{
                                "& .MuiInputBase-input": {
                                    color: "#11142d",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgba(0,0,0,0.23)", // Border color when not focused
                                    },
                                },
                            }}
                            onChange={(e) => {
                                setPromotion(e.target.value);
                            }}
                            className="text-[#11142d] text-[16px] font-[700]"
                        >
                            {promotions.map((item: any) => (
                                <MenuItem
                                    key={item.id}
                                    value={item}
                                    className=""
                                >
                                    {item.ten} ({item.giatri}%)
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="btn-container">
                        <button
                            disabled={cartItems.length < 1}
                            // type="submit"
                            type="button"
                            onClick={() => {
                                onSubmit2();
                            }}
                            className={clsx("btn", {
                                "cursor-none": cartItems.length < 1,
                            })}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentNavbar = () => {
    const router = useRouter();
    return (
        <div className="navbar-container fixed items-center z-9999 bg-[#fff] shadow-sm">
            <p className="logo ps-32">
                <Link
                    href={"/"}
                    className={clsx("text-[1.5rem]", {
                        "font-bold": router.pathname === "/",
                    })}
                >
                    Trang chủ
                </Link>
            </p>
        </div>
    );
};

Payment.getLayout = function getLayout(page) {
    return (
        <div>
            <header>
                {" "}
                <PaymentNavbar />
            </header>
            <main> {page}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Payment;

export const getServerSideProps = async () => {
    const promotions = await fetch(`${baseUrl}/store_promotions`).then((res) =>
        res.json()
    );
    return {
        props: { promotions },
    };
};
