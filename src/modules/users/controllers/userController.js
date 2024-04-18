import { ObjectId } from "mongodb";
import { connectDatabase } from "../../../config/database.js";

// console.log('Inside the getUserData controller');
export async function getAllUsers(req, res) { 
  
  try {
    const db = await connectDatabase();
    const users = await db.collection("users").find().toArray();
    // console.log('users::: ', users);

    
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
  }
}
