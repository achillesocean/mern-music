import { Router } from "express";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getSong,
} from "../controllers/songController";

const router = Router();

// all paths are prefixed with "/api/songs"

router.route("/").get(getSongs).post(createSong);
router.route("/:id").get(getSong).put(updateSong).delete(deleteSong);

export default router;
