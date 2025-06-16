import { FastifyInstance } from "fastify";
import Item from "../models/Item";

const itemsRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", async (_req, _res) => {
    const items = await Item.find({});
    return items;
  });

  fastify.get("/:id", async (req: any, _res) => {
    const item = await Item.findById(req.params.id);
    return item;
  });
};

export default itemsRoutes;
