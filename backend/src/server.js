import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser"

const app = express();
const PORT = process.env.PORT || 3000;

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDB } from './lib/db.js';

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/auth" , userRoutes);
app.use("/api/user", chatRoutes);   





app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})
