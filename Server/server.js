import app from './src/app.js';
import connectDB from './src/db/mongoose.js';
import dotenv from "dotenv";
import { connectVectorStore } from "./src/modules/ai/rag/vectorStore.js";

dotenv.config();


await connectDB();
await connectVectorStore();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});