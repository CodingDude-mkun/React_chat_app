import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { path } from "path";

import authRoute from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import connectToMongoDB from "./DB/connectToMondoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running at ${PORT} `);
});
