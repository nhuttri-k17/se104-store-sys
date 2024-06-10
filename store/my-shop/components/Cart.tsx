import React, { useRef } from "react";
import Link from "next/link";
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
    AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import clsx from "clsx";

import { useStateContext } from "../context/StateContext";
import CartItem from "./CartItem";

const Cart = () => {
    const cartRef = useRef<HTMLDivElement>(null);
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        setShowCart,
        showCart,
        toggleCartItemQuanitity,
        onRemove,
    } = useStateContext();
    const handleCheckout = async () => {};

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div
                className={clsx("h-[100dvh] w-dvw z-[-999] absolute", {
                    hidden: !showCart,
                })}
                onClick={() => setShowCart(false)}
            ></div>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className="heading">Giỏ hàng</span>
                    <span className="cart-num-items">
                        ({totalQuantities} sản phẩm)
                    </span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Giỏ hàng trống</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Tiếp tục mua sắm nào
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 &&
                        cartItems.map(
                            (item: any) =>
                                item && <CartItem key={item.id} item={item} />
                        )}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Tổng cộng:</h3>
                            <h3>{totalPrice} VND</h3>
                        </div>
                        <div className="btn-container">
                            <Link href={"/payment"}>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleCheckout}
                                >
                                    Mua ngay
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
