import express from "express";

// import {
//     upsertCustomer,
//     loginCustomerAccount,
//     registerCustomerAccount,
// } from "../controller/auth.controller.js";
// import { getOrderOfCustomer } from "../controller/order.controller.js";
// import {
//     getCustomerByEmail,
//     updateCustomerInfo,
// } from "../controller/customer.controller.js";
import {
    onAddCart,
    updateCart,
    getCartDetail,
    clearCart,
    removeItem,
} from "../controller/cart.controller.js";

const router = express.Router();
// router.route("/login").post(loginCustomerAccount);
// router.route("/register").post(registerCustomerAccount);
// router.route("/").post(upsertCustomer);
// router.route("/:email").get(getCustomerByEmail);
// router.route("/orders/:id").get(getOrderOfCustomer);
router.route("/cart/:giohangId").get(getCartDetail);
router.route("/cart/:giohangId").delete(clearCart);
router.route("/cart_item/:giohangId").post(removeItem);
router.route("/cart_add/:giohangId").post(onAddCart);
router.route("/cart_update/:giohangId").post(updateCart);
// router.route("/profile/:id").post(updateCustomerInfo);
export default router;
