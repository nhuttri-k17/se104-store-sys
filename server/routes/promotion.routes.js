import express from "express";

import {
    getAllPromotions,
    getPromotionDetail,
    createPromotion,
    updatePromotion,
    deletePromotion,
} from "../controller/promotion.controller.js";

const router = express.Router();

router.route("/").get(getAllPromotions);
router.route("/").post(createPromotion);
router.route("/:id").get(getPromotionDetail);
router.route("/:id").patch(updatePromotion);
router.route("/:id").delete(deletePromotion);

export default router;
