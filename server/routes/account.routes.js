import express from "express";

import {
    getAllAccounts,
    createAccount,
    getAccountDetail,
    changePasswordAccount,
    deleteAccount,
    getEmptyAccount,
    getAccountBasedOnStaff,
} from "../controller/account.controller.js";

const router = express.Router();
router.route("/").get(getAllAccounts);
router.route("/").post(createAccount);
router.route("/staff/:id").get(getAccountBasedOnStaff);
router.route("/empty").get(getEmptyAccount);
router.route("/:id").get(getAccountDetail);
router.route("/:id").patch(changePasswordAccount);
router.route("/:id").delete(deleteAccount);

export default router;
