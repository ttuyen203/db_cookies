import mongoose from "mongoose";

const cookieSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Cookie", cookieSchema);
