import mongoose from "mongoose";
import app from "./app.js";

const DB = "mongodb://localhost:27017/sample"
mongoose
  .connect(DB)
  .then((res) => console.log("Server connected"))
  .catch((err) => console.log(err));

app.listen(8000, () => console.log("Mongodb Server is running"));