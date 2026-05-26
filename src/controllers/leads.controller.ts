import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function createLead(req: Request, res: Response) {
  const { nombre, email, telefono, empresa, mensaje, servicio } = req.body;

  if (!nombre || !email) {
    res.status(400).json({ error: "nombre y email son requeridos" });
    return;
  }

  const lead = await prisma.lead.create({
    data: { nombre, email, telefono, empresa, mensaje, servicio },
  });

  res.status(201).json(lead);
}

export async function getLeads(_req: Request, res: Response) {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  res.json(leads);
}
