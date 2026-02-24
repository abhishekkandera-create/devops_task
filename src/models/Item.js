const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, default: 1, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);