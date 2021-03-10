import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/post.js';


const app = express();

app.use(bodyParser.json({limit: "30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
app.use(cors());





// const CONNECTION_URL = "mongodb+srv://abhay:nopassword@cluster0.cn0tx.mongodb.net/<dbname>?retryWrites=true&w=majority";
// app.use('/posts',postRoutes);
// const PORT = process.env.PORT ||5001;
// const CONNECTION_URL = "mongodb://localhost:27017/memory_project"

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> app.listen(PORT,()=> console.log('Server is running cool!')))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);

