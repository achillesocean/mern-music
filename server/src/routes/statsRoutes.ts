import { Router } from "express";
import { getStats } from "../controllers/statsController";

const router = Router();

router.get("/", getStats); // GET /api/stats

export default router;
