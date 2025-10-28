import express from "express";
import { createSeasonTeam, getSeasonTeams } from "../controllers/seasonTeamController";

const router = express.Router();

router.post("/", createSeasonTeam);
router.get("/:seasonId", getSeasonTeams);

export default router;
