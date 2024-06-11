import React, { FormEvent, use, useEffect, useState } from "react";
import { signIn, useSession, signOut, getCsrfToken } from "next-auth/react";
import NextAuth from "next-auth/next";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import toast from "react-hot-toast";
import clsx from "clsx";
import { validateEmail, validatePassword } from "@/lib/validateForm";
import { pageUrl } from "@/constants/url";

const LoginPage: NextPageWithLayout = () => {
    const router = useRouter();
    const sess = useSession();

    const [field, setField] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (sess.status === "authenticated") {
            router.push("/");
        }
    }, [sess.status]);

    const handChangeEmail = (f: string, value: string) => {
        setField({
            ...field,
            [f]: value,
        });
        const errorEmail = validateEmail(field["email"]);
        setError({ ...error, email: errorEmail });
    };

    const handChangePassword = (f: string, value: string) => {
        setField({
            ...field,
            [f]: value,
        });
        const errorPassword = validatePassword(field["password"]);
        setError({ ...error, password: errorPassword });
    };

    const handleValidateForm = () => {
        const errorEmail = validateEmail(field["email"]);
        const errorPassword = validatePassword(field["password"]);

        setError({ email: errorEmail, password: errorPassword });

        if (errorEmail === "" && errorPassword === "") {
            return true;
        }
        return false;
    };

    const logIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!handleValidateForm()) {
            return;
        }
        await signIn("credentials", {
            email: field.email,
            password: field.password,
            redirect: false,
        }).then((callback) => {
            if (callback?.error) {
                toast("Tài khoản hoặc mật khẩu không hợp lệ", {
                    style: { backgroundColor: "#f02d34", color: "#fff" },
                });
            } else {
                router.push("/");
            }
        });
    };

    if (sess.status === "loading") return <div>Loading...</div>;

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Đăng nhập
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={logIn} method="post">
                    <div>
                        <label
                            form="email"
                            className={clsx(
                                "block text-sm font-medium leading-6 ",
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
                                autoComplete="off"
                                required
                                value={field.email}
                                onChange={(e) =>
                                    handChangeEmail("email", e.target.value)
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
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                value={field.password}
                                onChange={(e) =>
                                    handChangePassword(
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
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#f02d34] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#cb4e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da6b6e]"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Chưa có tài khoản?{" "}
                    <a
                        href={`/register`}
                        className="font-semibold leading-6 text-[#f02d34] hover:text-[#cb4e52]"
                    >
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page: React.ReactNode) {
    return <div>{page}</div>;
};

export default LoginPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const user = null;
    return {
        props: {},
    };
}
