import express from "express";

import {
    getAllOrders,
    createOrder,
    getOrderDetail,
    updateOrder,
} from "../controller/order.controller.js";

const router = express.Router();

router.route("/").get(getAllOrders);
router.route("/").post(createOrder);
router.route("/:id").get(getOrderDetail);
router.route("/:id").patch(updateOrder);

export default router;
