import React from "react";
import footerBanner from "@/constants/footerBanner";
import Image from "next/image";
import Link from "next/link";

const FooterBanner = () => {
    const {
        discount,
        largeText1,
        largeText2,
        saleTime,
        smallText,
        midText,
        desc,
        product,
        buttonText,
        image,
    } = footerBanner;
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smallText}</p>
                    <h3>{midText}</h3>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type="button">{buttonText}</button>
                    </Link>
                </div>

                <Image
                    src={image}
                    width={200}
                    height={200}
                    alt="headphones"
                    className="footer-banner-image"
                />
            </div>
        </div>
    );
};

export default FooterBanner;
