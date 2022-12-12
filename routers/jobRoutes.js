import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJob,
  showStats,
  updateJob,
} from "../controllers/jobsController.js";

import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/test-user.js";

// all jobs routes only for logged in user
router.use(authenticateUser);

router.route("/").get(getAllJob).post(testUser, createJob);
router.route("/stats").get(showStats);

router.route("/:id").patch(updateJob).delete(testUser, deleteJob);

export default router;
