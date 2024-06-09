import express from "express";

import { getAllAvailablePromo } from "../controller/promotion.controller.js";

const router = express.Router();
router.route("/").get(getAllAvailablePromo);

export default router;
