import { Router } from "express";
import { createLead, getLeads } from "../controllers/leads.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", createLead);
router.get("/", requireAuth, getLeads);

export default router;
