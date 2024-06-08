import express from "express";
import {
    getAllStrategy,
    getStrategyDetail,
    createStrategy,
    updateStrategy,
    deleteStrategy,
} from "../controller/strategy.controller.js";

const router = express.Router();

router.route("/").get(getAllStrategy);
router.route("/").post(createStrategy);
router.route("/:id").get(getStrategyDetail);
router.route("/:id").patch(updateStrategy);
router.route("/:id").delete(deleteStrategy);

export default router;
