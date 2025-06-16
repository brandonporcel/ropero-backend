import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: Number, required: true },
  order: { type: Number, required: true },
  description: { type: String, required: false },
  thumbnail: String,
});

export default mongoose.model("Item", ItemSchema);
