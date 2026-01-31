import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRouter from './routes/blog.route.js';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173",
    credentials: true,
}))
mongoose.connect(MONGO).then(()=>{
    console.log("connect to mongodb");
}).catch((err)=>{
    console.log(err);
});


app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);


app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`)
});

app.get('/', (req, res) => {
  res.send('hi everyone on my server');
});