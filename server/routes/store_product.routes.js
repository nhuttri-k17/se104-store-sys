import express from "express";
import {
    getAllProductsWithoutQuery,
    getAllProductsWithQuery,
    getProductDetail,
    getProductBasedOnGenre,
    deleteProduct,
} from "../controller/store.controller.js";

const router = express.Router();

router.route("/").get(getAllProductsWithoutQuery);
router.route("/search").get(getAllProductsWithQuery);
router.route("/:id").get(getProductDetail);
router.route("/genre/:loai").get(getProductBasedOnGenre);
// router.route("/:id").delete(deleteProduct);

export default router;
