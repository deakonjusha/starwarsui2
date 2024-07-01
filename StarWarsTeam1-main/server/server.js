import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
// app.use(cors);
app.use(express.json());
const PORT = 3000;
// dotenv.config();

app.get("/", async (req, res) => {
  res.json([""]);
});

app.get("/api/planets", async (req, res) => {
  //   console.log("---");
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("planets");
  const planets = await collection.find({}).toArray();
  res.json(planets);
});

app.get("/api/characters", async (req, res) => {
  //   console.log("---");
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("characters");
  const characters = await collection.find({}).toArray();
  res.json(characters);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


