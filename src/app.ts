import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import leadsRoutes from "./routes/leads.routes";
import cotizacionesRoutes from "./routes/cotizaciones.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/leads", leadsRoutes);
app.use("/api/cotizaciones", cotizacionesRoutes);

app.use(errorHandler);

export default app;
