import express from "express";

import { loginAccount } from "../controller/auth.controller.js";

const router = express.Router();
router.route("/").post(loginAccount);
export default router;
