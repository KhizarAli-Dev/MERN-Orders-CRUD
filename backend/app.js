import express from "express";
import cors from "cors";
const app = express();

// Routes
import productRoute from "./routes/productRoute.js";

// Costom Middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/product", productRoute);

export default app;
