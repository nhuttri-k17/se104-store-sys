import express from "express";

import {
    getAllProducts,
    createProduct,
    getProductDetail,
    updateProduct,
    deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();
router.route("/").get(getAllProducts);
router.route("/").post(createProduct);
router.route("/:id").get(getProductDetail);
router.route("/:id").patch(updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
