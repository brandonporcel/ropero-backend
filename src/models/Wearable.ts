import mongoose from "mongoose";

const WearableSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: Number, required: true },
  thumbnail: String,
  description: { type: String, required: false },
  slug: String,
  order: { type: Number, required: false },
  sizes: {
    type: new mongoose.Schema(
      {
        rise: { type: Number },
        waist: { type: Number },
        sleeves: { type: Number },
        botamaga: { type: Number },
        total_large: { type: Number },
        total_width: { type: Number },
        shoulders_width: { type: Number },
      },
      { _id: false },
    ),
    required: false,
  },
  composition: {
    type: new mongoose.Schema(
      {
        cotton: { type: Number },
        recycledCotton: { type: Number },
        polyester: { type: Number },
        nylon: { type: Number },
        elastane: { type: Number },
        polyamide: { type: Number },
        viscose: { type: Number },
        liningPolyester: { type: Number },
        liningViscose: { type: Number },
        liningCupro: { type: Number },
        denim: { type: Number },
      },
      { _id: false },
    ),
    required: false,
  },
  wash: { type: Array },
  label: { type: String, required: false },
});

export default mongoose.model("Wearable", WearableSchema);
