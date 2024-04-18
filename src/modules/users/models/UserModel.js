import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  qrCode: { type: String, default: "" },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: Boolean, default: false },
  ci: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
