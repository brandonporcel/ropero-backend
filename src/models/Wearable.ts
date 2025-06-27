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
        polyester: { type: Number },
        elastane: { type: Number },
      },
      { _id: false },
    ),
    required: false,
  },

  wash: { type: Array },
  // wash: {
  // ....
  //   maxTemperature: { type: Number }, // temperatura máxima en °C
  //   iron: { type: Boolean }, // se puede planchar
  //   handWash: { type: Boolean }, // se puede lavar a mano
  // },
});

export default mongoose.model("Wearable", WearableSchema);
