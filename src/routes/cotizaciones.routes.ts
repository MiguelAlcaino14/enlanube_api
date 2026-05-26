import { Router } from "express";
import {
  createCotizacion,
  getCotizaciones,
  updateEstado,
} from "../controllers/cotizaciones.controller";

const router = Router();

router.post("/", createCotizacion);
router.get("/", getCotizaciones);
router.patch("/:id/estado", updateEstado);

export default router;
