import Image from "next/image";
import { Inter } from "next/font/google";
import { FooterBanner, HeroBanner, ProductCard } from "@/components";
import { ProductProp } from "@/interface/model";
const inter = Inter({ subsets: ["latin"] });
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useStateContext } from "@/context/StateContext";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { baseUrl } from "@/constants/url";

export default function Home({
    products,
    giohang,
}: {
    products: ProductProp[];
    giohang: any[];
}) {
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
                    }) => {
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
                giohang.reduce((acc, { soluong }) => acc + soluong, 0)
            );
            setTotalPrice(
                giohang.reduce(
                    (acc, { soluong, details: { gia } }) => acc + soluong * gia,
                    0
                )
            );
        }
    }, [giohang]);

    return (
        <div>
            <HeroBanner />
            <div className="products-heading">
                <h2>Sản phẩm</h2>
                <p>
                    Cửa hàng mỹ phẩm Gloss & Glam là điểm đến lý tưởng cho những
                    ai yêu thích làm đẹp và chăm sóc da. Với không gian sang
                    trọng và hiện đại, Gloss & Glam mang đến cho khách hàng trải
                    nghiệm mua sắm thoải mái và đẳng cấp. Cửa hàng cung cấp một
                    loạt sản phẩm đa dạng từ các thương hiệu nổi tiếng trên thế
                    giới, bao gồm son môi, phấn nền, kem dưỡng da, và nhiều sản
                    phẩm khác. Đội ngũ nhân viên chuyên nghiệp và nhiệt tình sẵn
                    sàng tư vấn và giúp bạn tìm ra những sản phẩm phù hợp nhất
                    với nhu cầu và phong cách cá nhân. Gloss & Glam không chỉ là
                    nơi mua sắm mỹ phẩm mà còn là nơi bạn có thể khám phá và thử
                    nghiệm những xu hướng làm đẹp mới nhất, giúp bạn tự tin tỏa
                    sáng mỗi ngày.
                </p>
            </div>
            <div className="products-container">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <FooterBanner />
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const products = await fetch(`${baseUrl}/store_products`).then((res) =>
        res.json()
    );
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

    // const session = null;
    return {
        props: {
            products,
            giohang,
        },
    };
}
