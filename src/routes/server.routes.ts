import express from "express";
import {
  addServer,
  trackServer,
  getServers,
} from "../controllers/serverController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/add", authMiddleware, addServer);
router.get("/track", authMiddleware, trackServer);
router.get("/", authMiddleware, getServers);

export default router;
