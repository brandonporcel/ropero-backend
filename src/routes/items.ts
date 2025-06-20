import { FastifyInstance, FastifyRequest } from "fastify";
import mongoose from "mongoose";
import Wearable from "../models/Wearable";
import User from "../models/User";

interface Params {
  userId: string;
}
interface GetGuarableParams {
  userId: string;
  wearableId: string;
}

const itemsRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    "/:userId/wearables",
    async (req: FastifyRequest<{ Params: Params }>, res) => {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ error: "Invalid userId" });
      }

      const items = await Wearable.find({ userId });
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

  fastify.get("/all", async () => {
    const users = await User.find({});
    return users;
  });

  // fastify.get(
  //   "/:userId",
  //   async (req: FastifyRequest<{ Params: GetGuarableParams }>, res) => {
  //     console.log("hola");
  //     const { userId } = req.params;

  //     if (!mongoose.Types.ObjectId.isValid(userId)) {
  //       return res.status(400).send({ error: "Invalid userId" });
  //     }

  //     // const item = await User.findOne({ id: userId });
  //     const item = await User.findById(userId);
  //     console.log(userId, item);
  //     return item;
  //   }
  // );
};

export default itemsRoutes;
