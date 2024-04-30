import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const RoleModel = mongoose.model("role", roleSchema);

export default RoleModel;
