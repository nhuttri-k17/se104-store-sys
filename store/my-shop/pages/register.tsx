import { baseUrl, pageUrl } from "@/constants/url";
import {
    validateEmail,
    validateName,
    validatePassword,
    validatePhoneNumber,
} from "@/lib/validateForm";
import clsx from "clsx";
import { NextPageWithLayout } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Register: NextPageWithLayout = () => {
    const router = useRouter();
    const sess = useSession();
    const [field, setField] = useState({
        email: "",
        password: "",
        name: "",
        sdt: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        name: "",
        sdt: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (sess.status === "authenticated") {
            router.push("/");
        }
    }, [sess.status]);

    const handleChangeEmail = (f: string = "email", value: string) => {
        setField({
            ...field,
            [f]: value,
        });
        const errorEmail = validateEmail(value);
        setError({ ...error, email: errorEmail });
    };

    const handleChangeSDT = (value: string) => {
        setField({ ...field, sdt: value });
        const err = validatePhoneNumber(value);
        setError({ ...error, sdt: err });
    };

    const handleChangePassword = (f: string = "password", value: string) => {
        setField({
            ...field,
            [f]: value,
        });
        const errorPassword = validatePassword(value);
        setError({ ...error, password: errorPassword });
    };

    const handleChangeName = (f: string = "name", value: string) => {
        setField({
            ...field,
            [f]: value,
        });
        const errorName = validateName(value);
        setError({ ...error, name: errorName });
    };

    const handleChangeConfirmPassword = (
        f: string = "confirmPassword",
        value: string
    ) => {
        setField({
            ...field,
            [f]: value,
        });
        const errorConfirmPassword =
            field["password"] !== value ? "Mật khẩu không khớp" : "";
        setError({ ...error, confirmPassword: errorConfirmPassword });
    };

    const handleValidateForm = () => {
        const errorEmail = validateEmail(field["email"]);
        const errorPassword = validatePassword(field["password"]);
        const errorName = validateName(field["name"]);
        const errorSDT = validatePhoneNumber(field["sdt"]);
        const errorConfirmPassword =
            field["password"] !== field["confirmPassword"]
                ? "Mật khẩu không khớp"
                : "";

        setError({
            ...error,
            email: errorEmail,
            password: errorPassword,
            name: errorName,
            sdt: errorSDT,
            confirmPassword: errorConfirmPassword,
        });

        if (
            errorEmail === "" &&
            errorPassword === "" &&
            errorName === "" &&
            errorConfirmPassword === ""
        ) {
            return true;
        }
        return false;
    };

    const signUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!handleValidateForm()) {
            toast.error("Vui lòng kiểm tra lại thông tin");
            return;
        }
        const res = await fetch(`${baseUrl}/store_customers/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: field.email,
                name: field.name,
                password: field.password,
            }),
        });
        if (res.ok) {
            toast.success("Đăng ký thành công");
            router.push("/login");
        } else {
            const err = await res.json();
            console.log(err.message);
            toast.error("Tài khoản đã tồn tại");
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Đăng ký tài khoản
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={signUp}>
                    <div>
                        <label
                            form="name"
                            className={clsx(
                                "block text-sm font-medium leading-6",
                                {
                                    "text-[#f02d34]": error["name"] !== "",
                                    "text-gray-900": error["name"] === "",
                                }
                            )}
                        >
                            Tên hiển thị
                        </label>
                        <div className="mt-2">
                            <input
                                type="name"
                                id="name"
                                name="name"
                                // autoComplete="name"
                                required
                                value={field.name}
                                onChange={(e) =>
                                    handleChangeName("name", e.target.value)
                                }
                                className={clsx(
                                    "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                )}
                            />
                            <span className="error text-[#f02d34]">
                                {error["name"]}
                            </span>
                        </div>
                        <label
                            form="sdt"
                            className={clsx(
                                "block text-sm font-medium leading-6",
                                {
                                    "text-[#f02d34]": error["sdt"] !== "",
                                    "text-gray-900": error["sdt"] === "",
                                }
                            )}
                        >
                            Số điện thoại
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="sdt"
                                name="sdt"
                                // autoComplete="name"
                                required
                                value={field.sdt}
                                onChange={(e) =>
                                    handleChangeSDT(e.target.value)
                                }
                                className={clsx(
                                    "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                )}
                            />
                            <span className="error text-[#f02d34]">
                                {error["sdt"]}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label
                            form="email"
                            className={clsx(
                                "block text-sm font-medium leading-6",
                                {
                                    "text-[#f02d34]": error["email"] !== "",
                                    "text-gray-900": error["email"] === "",
                                }
                            )}
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                // autoComplete="email"
                                required
                                value={field.email}
                                onChange={(e) =>
                                    handleChangeEmail("email", e.target.value)
                                }
                                className={clsx(
                                    "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                )}
                            />
                            <span className="error text-[#f02d34]">
                                {error["email"]}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <label
                                form="password"
                                className={clsx(
                                    "block text-sm font-medium leading-6",
                                    {
                                        "text-[#f02d34]":
                                            error["password"] !== "",
                                        "text-gray-900":
                                            error["password"] === "",
                                    }
                                )}
                            >
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                // autoComplete="current-password"
                                required
                                value={field.password}
                                onChange={(e) =>
                                    handleChangePassword(
                                        "password",
                                        e.target.value
                                    )
                                }
                                className={clsx(
                                    "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                )}
                            />
                            <span className="error text-[#f02d34]">
                                {error["password"]}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <label
                                form="confirmPassword"
                                className={clsx(
                                    "block text-sm font-medium leading-6",
                                    {
                                        "text-[#f02d34]":
                                            error["confirmPassword"] !== "",
                                        "text-gray-900":
                                            error["confirmPassword"] === "",
                                    }
                                )}
                            >
                                Xác nhận mật khẩu
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                // autoComplete="current-password"
                                required
                                value={field.confirmPassword}
                                onChange={(e) =>
                                    handleChangeConfirmPassword(
                                        "confirmPassword",
                                        e.target.value
                                    )
                                }
                                className={clsx(
                                    "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                )}
                            />
                            <span className="error text-[#f02d34]">
                                {error["confirmPassword"]}
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#f02d34] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#cb4e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f02d34]"
                        >
                            Đăng ký
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Đã có tài khoản?{" "}
                    <a
                        href={`${pageUrl}/login`}
                        className="font-semibold leading-6 text-[#f02d34] hover:text-[#cb4e52]"
                    >
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;

Register.getLayout = function getLayout(page: React.ReactNode) {
    return <div>{page}</div>;
};
