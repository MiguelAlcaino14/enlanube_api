import { Request, Response } from "express";
import prisma from "../lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ESTADOS_VALIDOS = ["pendiente", "en_revision", "completada", "rechazada"] as const;

export async function createCotizacion(req: Request, res: Response) {
  const { nombre, email, telefono, empresa, servicio, detalle } = req.body;

  if (!nombre || !email || !servicio) {
    res.status(400).json({ error: "nombre, email y servicio son requeridos" });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "email inválido" });
    return;
  }

  const cotizacion = await prisma.cotizacion.create({
    data: { nombre, email, telefono, empresa, servicio, detalle },
  });

  res.status(201).json(cotizacion);
}

export async function getCotizaciones(_req: Request, res: Response) {
  const cotizaciones = await prisma.cotizacion.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(cotizaciones);
}

export async function updateEstado(req: Request, res: Response) {
  const { id } = req.params;
  const { estado } = req.body;

  if (!ESTADOS_VALIDOS.includes(estado)) {
    res.status(400).json({ error: `estado inválido. Valores permitidos: ${ESTADOS_VALIDOS.join(", ")}` });
    return;
  }

  const cotizacion = await prisma.cotizacion.update({
    where: { id: Number(id) },
    data: { estado },
  });

  res.json(cotizacion);
}
