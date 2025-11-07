import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import userTokenRoutes from "./routes/userTokenRoutes";
import seasonRoutes from "./routes/seasonRoutes";
import seasonTeamRoutes from "./routes/seasonTeamRoutes";
import authRoutes from "./routes/authRoutes";
import userTeamAssignmentRoutes from "./routes/userTeamAssignmentRoutes";
import gameStateRoutes from "./routes/gameStateRoutes";
import phaseHistoryRoutes from "./routes/phaseHistoryRoutes";
import web3ContractRoutes from "./routes/web3ContractRoutes";
import activityEventRoutes from "./routes/activityEventRoutes";
import chatRoutes from "./routes/chatRoutes";
import userPhaseActionRoutes from "./routes/userPhaseActionRoutes";
import { env } from "./config/env";
import { logger } from "./middlewares/logger";
import { setupSecurity } from "./middlewares/security";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);
setupSecurity(app);

// Endpoint de salud
app.get("/health", (_, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server operational",
        environment: env.NODE_ENV,
        port: env.PORT,
    });
});

// Ejemplo de error controlado
app.get("/error-test", () => {
    const err = new Error("Forced error example");
    (err as any).statusCode = 400;
    throw err;
});

// Rutas principales
app.use("/users", userRoutes);
app.use("/user-tokens", userTokenRoutes);
app.use("/seasons", seasonRoutes);
app.use("/season-teams", seasonTeamRoutes);
app.use("/auth", authRoutes);
app.use("/user-team-assignment", userTeamAssignmentRoutes);
app.use("/game-states", gameStateRoutes);
app.use("/phase-history", phaseHistoryRoutes);
app.use("/contracts", web3ContractRoutes);
app.use("/events", activityEventRoutes);
app.use("/chats", chatRoutes);
app.use("/user-phase-actions", userPhaseActionRoutes);

// Middleware de manejo global de errores (AL FINAL)
app.use(errorHandler);

export default app;