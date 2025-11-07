// src/server.ts
import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${env.NODE_ENV}]`);
});
