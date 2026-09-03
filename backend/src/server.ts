import app from "./app.ts";
import { prisma } from "./lib/prisma.ts";

const PORT = 3000;

const main = async () => {
  try {
    await prisma.$connect();
    console.log(`DB connected successfully!`)

    app.listen(PORT, () => {
      console.log(`I am listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server!", error);

    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
