import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/index.routes.js';
import cors from 'cors'

const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(morgan('dev')); 
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;