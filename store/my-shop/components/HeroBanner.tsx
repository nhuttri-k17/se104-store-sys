import React from "react";
import Link from "next/link";
import heroBanner from "@/constants/heroBanner";
import Image from "next/image";

const HeroBanner = () => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <Image
                    src={heroBanner.image}
                    width={200}
                    height={200}
                    alt="headphones"
                    className="hero-banner-image"
                />

                <div>
                    <Link href={`/product/${heroBanner.product}`}>
                        <button type="button">{heroBanner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Mô tả</h5>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
