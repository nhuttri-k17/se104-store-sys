import { ProductCard } from "@/components";
import { baseUrl } from "@/constants/url";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import React, { useEffect } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { useStateContext } from "@/context/StateContext";

const SearchPage: NextPageWithLayout = ({ q, products, giohang }: any) => {
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

    if (products.length === 0) {
        return (
            <div className="products-heading">
                <p
                    className="text-[40px] font-bold"
                    style={{
                        fontSize: "40px",
                        fontWeight: "800",
                    }}
                >
                    Không tìm thấy sản phẩm {q}
                </p>
            </div>
        );
    }
    return (
        <div>
            <div className="products-heading">
                <h2> Sản phẩm {q}</h2>
            </div>
            <div className="products-container">
                {products?.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { q } = context.query;
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

    try {
        const res = await fetch(`${baseUrl}/store_products/search?q=${q}`);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const products = await res.json();

        return {
            props: { q, products, giohang },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: { q, products: [], giohang }, // Return empty products array in case of error
        };
    }
}
