import Fastify from "fastify";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "@fastify/cors";

import itemsRoutes from "./routes/items";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: true,
});

fastify.register(
  async (apiScope) => {
    apiScope.register(itemsRoutes);
  },
  { prefix: "/api" }
);

(async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    await mongoose.connect(mongoUri);
    fastify.log.info("MongoDB connected");

    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
