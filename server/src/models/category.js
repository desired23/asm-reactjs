import mongoose from "mongoose";
import Product from "./product";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
    },
    description: {
      type: String
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: Product,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", categorySchema);
