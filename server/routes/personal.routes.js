import express from "express";

import { getIdentity } from "../controller/personal.controller.js";

const router = express.Router();
router.route("/").post(getIdentity);

export default router;
