import { ProductCard } from "@/components";
import { baseUrl } from "@/constants/url";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import React from "react";

const SearchPage: NextPageWithLayout = ({ q, products }: any) => {
    console.log(products);
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

    try {
        const res = await fetch(`${baseUrl}/store_products/search?q=${q}`);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const products = await res.json();

        return {
            props: { q, products },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: { q, products: [] }, // Return empty products array in case of error
        };
    }
}
