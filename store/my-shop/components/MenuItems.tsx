import { ClickAwayListener } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenuItems = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Or some placeholder content that matches the server-rendered output
    }
    const items = [
        {
            name: "Nhẫn",
            link: "/danh-muc/nhan",
        },
        {
            name: "Đồng hồ",
            link: "/danh-muc/dong-ho",
        },
        {
            name: "Khuyên tai",
            link: "/danh-muc/khuyen-tai",
        },
        {
            name: "Móng tay giả",
            link: "/danh-muc/mong-tay-gia",
        },
        {
            name: "Trang sức",
            link: "/danh-muc/trang-suc",
        },

        {
            name: "Vòng tay",
            link: "/danh-muc/vong-tay",
        },
    ];
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <span className="relative hover:cursor-pointer">
                <span
                    onClick={() => setOpen(!open)}
                    className={clsx("text-[1.5rem] ps-8", {
                        "font-bold": router.pathname.includes("/danh-muc"),
                    })}
                >
                    <span>Danh mục</span>
                </span>
                <div
                    className={clsx(
                        " bg-white absolute right-0 mt-2 origin-top-right rounded-md shadow-lg md:w-48", // w-full
                        {
                            hidden: !open,
                        }
                    )}
                >
                    <div className="py-2 bg-white text-[#999] rounded-sm border border-main-color shadow-sm">
                        {items.map((item, index) => (
                            <div onClick={() => setOpen(false)}>
                                <Link
                                    key={index}
                                    className="block px-4 py-2 mt-2 text-[1.5rem] bg-white md:mt-0 focus:text-gray-900 hover:bg-[#eee] focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href={item.link}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </span>
        </ClickAwayListener>
    );
};
export default MenuItems;
