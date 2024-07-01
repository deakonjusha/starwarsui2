import { MongoClient, ObjectId } from "mongodb";

import express from "express";
import cors from "cors"



const app = express();
app.use(cors);
app.use(express.json());
const PORT = 3000;


//mongoose.connect('mongodb://localhost:27017/swapi',
  //  {useNewUrlParser: true, useUnifiedTopology: true});


    app.get('/api/planets', async (req,res)=> {
        console.log("---");
        const client = await MongoClient.connect('mongodb://localhost:27017/');
    const db = client.db('swapi');
    const collection = db.collection('planets');
    const planets = await collection.find({}).toArray();
    res.json(planets);
    });
  
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });


