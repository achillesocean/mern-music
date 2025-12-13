import { Router } from "express";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/songController";

const router = Router();

// TODO: prefix all paths with '/api/songs' in index.ts

router.route("/").get(getSongs).post(createSong);
router.route("/:id").put(updateSong).delete(deleteSong);

export default router;
