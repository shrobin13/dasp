import app from "./app.ts";
import { env } from "./config/env.ts";
import { logger } from "./shared/logger.ts";

const PORT = env.PORT;

const main = async () => {
  try {
    await prisma.$connect();
    console.log(`DB connected successfully!`)

    app.listen(PORT, () => {
      logger.info({ port: PORT }, `API server is listening on port:PORT`);
    });
  } catch (error) {
    logger.error(`Error starting the server!, ${error}`);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
