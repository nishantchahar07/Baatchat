import express from 'express';
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3000;

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

app.use(express.json());

app.use("/api/auth", authRoutes);





app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})
