import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, soluong) => {
        let checkProductInCart = cartItems.find(
            (item) => item?.id === product.id
        );

        if (
            checkProductInCart &&
            checkProductInCart.soluong + soluong <= product.soluong
        ) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct.id === product.id)
                    return {
                        ...cartProduct,
                        soluong: cartProduct.soluong + soluong,
                    };
            });
            setCartItems(updatedCartItems);

            setTotalPrice(
                (prevTotalPrice) => prevTotalPrice + product.gia * soluong
            );
            setTotalQuantities(
                (prevTotalQuantities) => prevTotalQuantities + soluong
            );
            toast.success(
                `${soluong} ${product.ten} đã được thêm vào giỏ hàng`
            );
        } else if (!checkProductInCart && soluong <= product.soluong) {
            checkProductInCart = {
                id: product.id,
                ten: product.ten,
                gia: product.gia,
                soluong: soluong,
                hinhanh: product.hinhanh,
                conlai: product.soluong,
            };
            setCartItems([...cartItems, { ...checkProductInCart }]);

            setTotalPrice(
                (prevTotalPrice) =>
                    prevTotalPrice + checkProductInCart.gia * soluong
            );
            setTotalQuantities(
                (prevTotalQuantities) => prevTotalQuantities + soluong
            );
            toast.success(
                `${soluong} ${product.ten} đã được thêm vào giỏ hàng`
            );
        } else {
            toast.error(
                `Số lượng ${product.ten} trong giỏ hàng vượt quá mức cho phép.`
            );
        }
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item.id === product.id);
        const newCartItems = cartItems.filter((item) => item.id !== product.id);

        setTotalPrice(
            (prevTotalPrice) =>
                prevTotalPrice - foundProduct.gia * foundProduct.soluong
        );
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities - foundProduct.soluong
        );
        setCartItems(newCartItems);
    };

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item.id === id);
        index = cartItems.findIndex((product) => product.id === id);
        const newCartItems = cartItems.filter((item) => item.id !== id);
        let i = 0;
        if (value === "inc") {
            i = foundProduct.soluong < foundProduct.conlai ? 1 : 0;
        } else if (value === "dec") {
            i = foundProduct.soluong > 1 ? -1 : 0;
        }
        const temp = [...newCartItems];
        temp.splice(index, 0, {
            ...foundProduct,
            soluong: foundProduct.soluong + i,
        });
        setCartItems([...temp]);
        setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + foundProduct.gia * i
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + i);
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    };

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
