import React, { useEffect } from "react";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextPageWithLayout,
    PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useStateContext } from "@/context/StateContext";
import { ProductCard } from "@/components";
import { itemGenres } from "@/constants/itemGenres";
import { baseUrl } from "@/constants/url";

const DanhMucPage: NextPageWithLayout = ({ loai, products, giohang }: any) => {
    const router = useRouter();
    console.log(products);
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
            <div className="products-heading">
                <h2>{itemGenres[loai as keyof typeof itemGenres].name}</h2>
                <p>{itemGenres[loai as keyof typeof itemGenres].mota}</p>
            </div>
            <div className="products-container">
                {products?.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default DanhMucPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const loai = context.params?.loai as string;

    const products = await fetch(
        `${baseUrl}/store_products/genre/${loai}`
    ).then((res) => res.json());

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
            loai,
            products,
            giohang,
        },
    };
}
