import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import leadsRoutes from "./routes/leads.routes";
import cotizacionesRoutes from "./routes/cotizaciones.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origen no permitido — ${origin}`));
      }
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/leads", leadsRoutes);
app.use("/api/cotizaciones", cotizacionesRoutes);

app.use(errorHandler);

export default app;
