import React, { use, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart, Searchbar } from "./";
import { useStateContext } from "@/context/StateContext";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import MenuItems from "./MenuItems";

const Navbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const { showCart, setShowCart, totalQuantities, routePath } =
        useStateContext();

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
                <MenuItems />
                {session && (
                    <Link
                        href={"/order"}
                        className={clsx("text-[1.5rem] ps-8", {
                            "font-bold": router.pathname === "/order",
                        })}
                    >
                        Đơn hàng
                    </Link>
                )}
                {session && (
                    <Link
                        href={"/profile"}
                        className={clsx("text-[1.5rem] ps-8", {
                            "font-bold": router.pathname === "/profile",
                        })}
                    >
                        Hồ sơ
                    </Link>
                )}
            </p>
            <Searchbar />
            {session ? (
                <div className="flex gap-2 items-center">
                    <button
                        type="button"
                        className="cart-icon relative pe-32"
                        onClick={() => setShowCart(true)}
                    >
                        <AiOutlineShopping />
                        <span className="cart-item-qty me-32">
                            {totalQuantities}
                        </span>
                    </button>
                    <button
                        onClick={() => signOut()}
                        className="flex my-2 me-16 justify-center rounded-md bg-[#f02d34] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#cb4e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da6b6e]"
                    >
                        Đăng xuất
                    </button>
                </div>
            ) : (
                <Link
                    href={"/login"}
                    className="flex my-2 me-32 justify-center rounded-md bg-[#f02d34] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#cb4e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da6b6e]"
                >
                    Đăng nhập
                </Link>
            )}

            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;
