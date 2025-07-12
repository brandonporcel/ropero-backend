import { FastifyInstance, FastifyRequest } from "fastify";

import User from "../models/User";
import Wearable from "../models/Wearable";

interface Params {
  username: string;
}
interface GetGuarableParams {
  username: string;
  wearableSlug: string;
}

interface CreateWearableBody {
  userId: string;
  type: number;
  thumbnail: string;
  wash: string[];
}

interface DeleteWearableBody {
  ids: string[];
}

const itemsRoutes = (fastify: FastifyInstance) => {
  fastify.get("/ping", async (_req, res) => {
    return res.send({ message: "pong 🏓", timestamp: Date.now() });
  });

  fastify.post(
    "/create",
    async (req: FastifyRequest<{ Body: CreateWearableBody }>, res) => {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Body is empty" });
      }
      if (
        !req.body.userId ||
        !req.body.type ||
        !req.body.thumbnail ||
        !req.body.wash
      ) {
        return res.status(400).send({ error: "Body is incomplete" });
      }

      await Wearable.create(req.body);

      return res.send({ message: "wearable created" });
    },
  );

  fastify.delete(
    "/delete",
    async (req: FastifyRequest<{ Body: DeleteWearableBody }>, res) => {
      if (!req.body) {
        return res.status(400).send({ error: "Body is empty" });
      }
      if (req.body.ids.length === 0) {
        return res.status(400).send({ error: "Add ids" });
      }

      await Wearable.deleteMany({ _id: { $in: req.body.ids } });
      return res.send({ message: "wearables deleted" });
    },
  );

  fastify.get(
    "/:username/wearables",
    async (req: FastifyRequest<{ Params: Params }>, res) => {
      const { username } = req.params;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }

      const items = await Wearable.find({ userId: user.id });
      return items;
    },
  );

  fastify.get(
    "/:username/:wearableSlug",
    async (req: FastifyRequest<{ Params: GetGuarableParams }>, res) => {
      const { username, wearableSlug } = req.params;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }

      const item = await Wearable.findOne({
        slug: wearableSlug,
        userId: user.id,
      });
      return item;
    },
  );
};

export default itemsRoutes;
