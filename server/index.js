import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ingestRouter from './routes/ingest.js';
import askRouter from './routes/ask.js';

dotenv.config();

const app = express();
app.use(cors(
    ['https://codebase-nav.onrender.com', 'http://localhost:5173']
));
app.use(express.json());
app.use('/ingest', ingestRouter);    
app.use('/ask', askRouter);

app.get('/', (req, res) => {
  res.send('🚀Codebase navigator backend running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`💚 Server is running on port ${PORT}`);
});


