import { useStateContext } from "@/context/StateContext";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import clsx from "clsx";

import toast from "react-hot-toast";
import { format } from "date-fns";
import {
    FormHelperText,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import { validateName, validatePhoneNumber } from "@/lib/validateForm";
import { is, se } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { baseUrl } from "@/constants/url";

const Profile: NextPageWithLayout = ({ giohang, khachhang, orders }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [edit, setEdit] = useState(false);

    const [fields, setFields] = useState({
        ten: khachhang.ten,
        sdt: khachhang.sdt,
    });

    const [error, setError] = useState({
        ten: "",
        sdt: "",
    });

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        },
    });

    useEffect(() => {
        if (status !== "authenticated") {
            router.push("/");
        }
        console.log("status", status);
    }, [status]);

    const handleChangeTen = (value: string) => {
        setFields({ ...fields, ten: value });
        const err = validateName(value);
        setError({ ...error, ten: err });
    };

    const handleChangeSDT = (value: string) => {
        setFields({ ...fields, sdt: value });
        const err = validatePhoneNumber(value);
        setError({ ...error, sdt: err });
    };

    const validateForm = () => {
        const errTen = validateName(fields.ten);
        const errSDT = validatePhoneNumber(fields.sdt);

        setError({ ten: errTen, sdt: errSDT });

        if (errTen === "" && errSDT === "") {
            return true;
        }
        return false;
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            const res = await fetch(
                `${baseUrl}/store_customers/profile/${khachhang.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ten: fields.ten,
                        sdt: fields.sdt,
                    }),
                }
            );

            if (res.ok) {
                toast("Cập nhật thành công", { icon: "🎉" });
                router.push("/profile");
            } else {
                const err = await res.json();
                setFields({ ten: khachhang.ten, sdt: khachhang.sdt });
                toast("Cập nhật thất bại" + err.message, { icon: "❌" });
            }
            setEdit(false);
            setIsLoading(false);
        } else {
            setEdit(true);
            toast("Vui lòng kiểm tra lại thông tin", { icon: "❌" });
        }
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

    return (
        <div className=" m-10">
            {isLoading && (
                <div className="z-[9999] bg-[#eee] absolute w-dvw h-dvh flex justify-center items-center opacity-90">
                    <CircularProgress />
                </div>
            )}
            <form
                onSubmit={!edit ? onSubmit : (e) => e.preventDefault()}
                style={{
                    borderRadius: "0.125rem",
                    paddingBottom: "2rem",
                }}
            >
                {/* <div className="bg-white p- 3 shadow-sm rounded-sm pb-8"> */}
                <div>
                    <div className="flex items-center space-x-2 pb-3 font-semibold text-gray-900 leading-8">
                        <span className="text-[#f02d34]">
                            <svg
                                className="h-[2rem]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </span>
                        <h2 className="tracking-wide text-[2rem]">
                            Thông tin cá nhân
                        </h2>
                    </div>
                </div>
                <div className="text-gray-700 ">
                    <div className="grid md:grid-cols-2 items-center text-sm">
                        <div className="grid grid-cols-2 w-full px-6 py-10">
                            <Typography
                                className="px-4 py-4 mt-2"
                                sx={{
                                    fontSize: "1.15rem",
                                    fontWeight: "semibold",
                                    // gridTemplateColumns: "1fr 1fr",
                                }}
                            >
                                Tên
                            </Typography>
                            <div>
                                <span className="error text-[#f02d34] px-4">
                                    {error["ten"]}
                                </span>
                                <TextField
                                    disabled={!edit}
                                    onChange={(e) =>
                                        handleChangeTen(e.target.value)
                                    }
                                    sx={{
                                        paddingInline: "1rem",
                                        "& .MuiInputBase-input": {
                                            fontSize: "1.15rem",
                                        },
                                    }}
                                    defaultValue={fields.ten}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2  px-6 py-10">
                            <Typography
                                className="px-4 py-4 mt-2"
                                sx={{
                                    fontSize: "1.15rem",
                                    fontWeight: "semibold",
                                }}
                            >
                                Thông tin liên hệ
                            </Typography>
                            <div>
                                <span className="error text-[#f02d34] px-4">
                                    {error["sdt"]}
                                </span>
                                <TextField
                                    disabled={!edit}
                                    type="number"
                                    sx={{
                                        paddingInline: "1rem",
                                        "& .MuiInputBase-input": {
                                            fontSize: "1.15rem",
                                        },
                                    }}
                                    onChange={(e) =>
                                        handleChangeSDT(e.target.value)
                                    }
                                    defaultValue={
                                        fields.sdt?.length > 0
                                            ? fields.sdt
                                            : "chưa có"
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 px-6 py-10">
                            <Typography
                                className="px-4 py-4 mt-2"
                                sx={{
                                    fontSize: "1.15rem",
                                    fontWeight: "semibold",
                                }}
                            >
                                Email
                            </Typography>
                            <TextField
                                disabled={true}
                                sx={{
                                    paddingInline: "1rem",
                                    "& .MuiInputBase-input": {
                                        fontSize: "1.15rem",
                                    },
                                }}
                                defaultValue={khachhang.email}
                            />
                        </div>
                        <div className="grid grid-cols-2 px-6 py-10">
                            <Typography
                                className="px-4 py-4 mt-2"
                                sx={{
                                    fontSize: "1.15rem",
                                    fontWeight: "semibold",
                                }}
                            >
                                Ngày lập
                            </Typography>
                            <TextField
                                disabled={true}
                                sx={{
                                    paddingInline: "1rem",
                                    "& .MuiInputBase-input": {
                                        fontSize: "1.15rem",
                                    },
                                }}
                                defaultValue={
                                    khachhang.ngaylap
                                        ? format(
                                              new Date(khachhang.ngaylap),
                                              "dd-MM-yyyy"
                                          )
                                        : ""
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-end justify-end">
                        <button
                            onClick={() => setEdit(!edit)}
                            type="submit"
                            className="flex mx-6 my-8 justify-center al rounded-md bg-[#f02d34] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#cb4e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da6b6e]"
                        >
                            <Typography
                                className="p-2 px-4"
                                sx={{
                                    fontSize: "1.15rem",
                                    fontWeight: "semibold",
                                }}
                            >
                                {!edit ? "Chỉnh sửa" : "Lưu"}
                            </Typography>
                        </button>
                    </div>
                </div>
            </form>
            <div className="my-4"></div>
            <div className="bg-white p-3 shadow-sm rounded-sm">
                <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-[#f02d34]">
                            <svg
                                className="h-[2rem]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </span>
                        <h2 className="tracking-wide text-[2rem]">
                            Đơn hàng gần đây
                        </h2>
                    </div>
                    <ul className="list-inside space-y-2 p-10">
                        {orders.map((order: any) => (
                            <div key={order.id} className="border p-5">
                                <div className="flex justify-between pb-3 items-center">
                                    <p className="text-[1.2rem] font-bold">
                                        Đơn hàng: {order.id}
                                    </p>
                                    <p className="text-[1.2rem]">
                                        Ngày đặt:{" "}
                                        {order.ngaylap ? (
                                            <>
                                                {format(
                                                    new Date(order.ngaylap),
                                                    "dd-MM-yyyy"
                                                )}
                                            </>
                                        ) : (
                                            <>Undefined Date</>
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
                                                src={
                                                    item.sanpham.details.hinhanh
                                                }
                                                alt=""
                                                className="size-[64px]"
                                            />
                                            <p className="text-[1.6rem]">
                                                {item.sanpham.details.ten}
                                            </p>
                                        </div>
                                        <p className="text-[1.2rem]">
                                            số lượng: {item.soluong}
                                        </p>
                                        <p className="text-[1.6rem]">
                                            giá: {item.tonggiatri} VND
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import { GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    const sessionData = session ? session.user : null;

    const orders = await fetch(
        `${baseUrl}/store_customers/orders/${sessionData?.id}?setoff=5`
    ).then((res) => res.json());

    const khachhang = await fetch(
        `${baseUrl}/store_customers/${sessionData?.email}`
    ).then((res) => res.json());

    let giohang = [];
    if (sessionData) {
        giohang = await fetch(
            `${baseUrl}/store_customers/cart/${sessionData.giohangId}`
        ).then((res) => res.json());
    }

    return {
        props: {
            giohang,
            khachhang,
            orders,
        },
    };
}
