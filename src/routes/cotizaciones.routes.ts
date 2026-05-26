import { Router } from "express";
import {
  createCotizacion,
  getCotizaciones,
  updateEstado,
} from "../controllers/cotizaciones.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", createCotizacion);
router.get("/", requireAuth, getCotizaciones);
router.patch("/:id/estado", requireAuth, updateEstado);

export default router;
