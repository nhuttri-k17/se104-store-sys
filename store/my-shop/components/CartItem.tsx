import React, { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "@/context/StateContext";
import clsx from "clsx";
import { useSession } from "next-auth/react";

const CartItem = ({ item }) => {
    const { data: session } = useSession();
    const { toggleCartItemQuanitity, onRemove } = useStateContext();

    useEffect(() => {
        fetch(
            `http://localhost:8080/store_customers/cart_update/${session?.user.giohangId}`,
            {
                method: "POST",
                body: JSON.stringify({
                    productId: item.id,
                    quantity: item.soluong,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }, [item.soluong]);

    return (
        <div className="product">
            <img
                width={50}
                height={50}
                src={item.hinhanh}
                className="cart-product-image"
            />
            <div className="item-desc">
                <div className="flex top">
                    <h5>{item.ten}</h5>
                    <h4>{item.gia} VND</h4>
                </div>
                <div className="flex bottom">
                    <div className="flex justify-between items-center">
                        <p className="quantity-desc">
                            <span
                                className={clsx({
                                    "text-[#ccc]": item.soluong === 1,
                                    minus: item.soluong > 1,
                                })}
                                onClick={async () => {
                                    toggleCartItemQuanitity(item.id, "dec");
                                }}
                            >
                                <AiOutlineMinus />
                            </span>
                            <span className="num" onClick={() => {}}>
                                {item.soluong}
                            </span>
                            <span
                                className={clsx({
                                    "text-[#ccc]": item.soluong === item.conlai,
                                    plus: item.soluong < item.conlai,
                                })}
                                onClick={async () => {
                                    toggleCartItemQuanitity(item.id, "inc");
                                }}
                            >
                                <AiOutlinePlus />
                            </span>
                        </p>
                        <p>còn : {item.conlai}</p>
                        <button
                            type="button"
                            className="remove-item"
                            onClick={async () => {
                                onRemove(item);
                                await fetch(
                                    `http://localhost:8080/store_customers/cart_item/${session?.user.giohangId}`,
                                    {
                                        method: "POST",
                                        body: JSON.stringify({
                                            productId: item.id,
                                        }),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                );
                            }}
                        >
                            <TiDeleteOutline />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
