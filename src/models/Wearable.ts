import mongoose from "mongoose";

const WearableSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: Number, required: true },
  thumbnail: String,
  description: { type: String, required: false },
  slug: String,
  order: { type: Number, required: false },
});

export default mongoose.model("Wearable", WearableSchema);
