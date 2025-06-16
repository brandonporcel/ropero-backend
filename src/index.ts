import Fastify from "fastify";
import mongoose from "mongoose";
import "dotenv/config";

import itemsRoutes from "./routes/items";

const fastify = Fastify({ logger: true });

fastify.register(
  async (apiScope) => {
    apiScope.register(itemsRoutes, { prefix: "/items" });
  },
  { prefix: "/api" }
);

(async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    await mongoose.connect(mongoUri);
    fastify.log.info("MongoDB connected");

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
