import express from "express";

import {
    deleteProduct,
    updateProduct,
    addNewProduct,
    getAllProducts,
    getProductDetail,
} from "../controller/store.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/").post(addNewProduct);
router.route("/:id").get(getProductDetail);
router.route("/:id").patch(updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
