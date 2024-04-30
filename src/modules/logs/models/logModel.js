import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  eventType: { type: String, enum: ["login", "logout"], required: true },
  // Timestamp:{type:Date,default:Date.now}
  createAt:{type:Date,default:Date.now}
});

const LogModel = mongoose.model('Log', logSchema);
export default LogModel;
