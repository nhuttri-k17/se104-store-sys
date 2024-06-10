import React from "react";
import Link from "next/link";
import { ProductProp } from "../interface/model";
import { itemGenres } from "@/constants/itemGenres";

const ProductCard = ({
    product: { id, ten, gia, hinhanh, loai, soluong },
}: {
    product: ProductProp;
}) => {
    return (
        <div className="px-1">
            <Link href={`/product/${id}`}>
                <div className="product-card">
                    <img
                        src={hinhanh}
                        className="product-image p-2 size-[200px] object-fit"
                    />
                    <div className="flex flex-col gap-1 justify-between px-2 py-1">
                        <p className="product-name">{ten}</p>{" "}
                        <p className="product-name text-sm text-[#aaa] ">
                            {itemGenres[loai as keyof typeof itemGenres].name}
                        </p>
                    </div>
                    <div className="flex justify-between px-2 py-1 items-end">
                        <p className="product-price px-2">{gia} VND</p>
                        <p className="text-[0.75rem]">còn {soluong}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
