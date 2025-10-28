import { loggerInstance } from "../middlewares/logger";

type LogContext = "DB"
    | "AUTH"
    | "GAME"
    | "BLOCKCHAIN"
    | "SYSTEM"
    | "EVENT"
    | "CHAT"
    | "GAME_STATE"
    | "PHASE_HISTORY"
    | "USER"
    | "USER_PHASE_ACTION"
    | "USER_TEAM_ASSIGNMENT"
    | "USER_TOKEN"
    | "WEB3_CONTRACT"
    | "SEASON"
    | "SEASON_TEAM";

export const logInfo = (context: LogContext, message: string) => {
    loggerInstance.info(`[${context}] ${message}`);
};

export const logWarn = (context: LogContext, message: string) => {
    loggerInstance.warn(`[${context}] ${message}`);
};

export const logError = (context: LogContext, error: unknown) => {
    const errMsg =
        error instanceof Error
            ? `${error.message}\nStack: ${error.stack}`
            : JSON.stringify(error);
    loggerInstance.error(`[${context}] ${errMsg}`);
};

export const logDebug = (context: LogContext, message: string) => {
    loggerInstance.debug(`[${context}] ${message}`);
};
