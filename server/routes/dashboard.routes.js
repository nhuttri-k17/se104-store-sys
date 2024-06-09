import express from "express";

import { totalRevenue } from "../controller/dashboard.controller.js";

const router = express.Router();

router.route("/").get(totalRevenue);

export default router;
