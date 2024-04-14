import dotEnv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbconnecxion from './database/connexion.js';
import userRoutes from './routes/userRoutes.js';
import treeRoutes from './routes/treeRoutes.js';
import memberRoutes from './routes/memberRoutes.js';

dotEnv.config();
dbconnecxion();


const Port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tree', treeRoutes);
app.use('/api/v1/member', memberRoutes);



app.listen(Port, () => {
  console.log(`Listen to request at port ${Port}!`);
});