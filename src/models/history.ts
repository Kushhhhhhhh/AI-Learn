import mongoose from "mongoose";

const historySchema = new mongoose.Schema({

  userId: { type: String, required: true },
  type: { type: String, required: true },
  query: { type: String, required: true },
  response: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }

}, {timestamps: true});

const History = mongoose.models.History || mongoose.model("History", historySchema);

export default History;