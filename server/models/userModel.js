import mongoose from "mongoose";

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  return `${day}-${month}-${year}`;
}

const userSchema = new mongoose.Schema({
  Workspace_name: {
    type: String,
    required: true,
    unique: true,
  },
  user_name:{
    type: String,
    required: true,
  },
  created_on: {
    type: String,
    default: () => formatDate(new Date()),
    required: true,
  },
});

export default mongoose.model("User", userSchema);
