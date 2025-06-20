import { FastifyInstance, FastifyRequest } from "fastify";
import mongoose from "mongoose";
import Wearable from "../models/Wearable";
import User from "../models/User";

interface Params {
  username: string;
}
interface GetGuarableParams {
  userId: string;
  wearableId: string;
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
    }
  );

  fastify.get(
    "/:userId/wearables/:wearableId",
    async (req: FastifyRequest<{ Params: GetGuarableParams }>, res) => {
      const { userId, wearableId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ error: "Invalid userId" });
      }

      if (!mongoose.Types.ObjectId.isValid(wearableId)) {
        return res.status(400).send({ error: "Invalid wearableId" });
      }

      const item = await Wearable.findOne({ id: wearableId, userId });
      return item;
    }
  );
};

export default itemsRoutes;
