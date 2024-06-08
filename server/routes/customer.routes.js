import express from "express";

import {
    getAllCustomer,
    deleteCustomer,
    createCustomer,
    getCustomerById,
} from "../controller/customer.controller.js";

const router = express.Router();
router.route("/").get(getAllCustomer);
router.route("/").post(createCustomer);
router.route("/:id").get(getCustomerById);
router.route("/:id").delete(deleteCustomer);

export default router;
