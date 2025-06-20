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

const itemsRoutes = (fastify: FastifyInstance) => {
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
