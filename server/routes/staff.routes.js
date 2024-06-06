import express from "express";

import {
    getAllStaffs,
    createStaff,
    deleteStaff,
    updateStaff,
    getStaffDetail,
} from "../controller/staff.controller.js";

const router = express.Router();
router.route("/").get(getAllStaffs);
router.route("/").post(createStaff);
router.route("/:id").get(getStaffDetail);
router.route("/:id").delete(deleteStaff);
router.route("/:id").patch(updateStaff);

export default router;
