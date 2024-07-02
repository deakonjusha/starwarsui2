import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

app.get("/", async (req, res) => {
  res.json([""]);
});

app.get("/api/planets", async (req, res) => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("planets");
  const planets = await collection.find({}).toArray();
  res.json(planets);
});

app.get("/api/characters", async (req, res) => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("characters");
  const characters = await collection.find({}).toArray();
  res.json(characters);
});

app.get("/api/films", async (req, res) => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("films");
  const films = await collection.find({}).toArray();
  res.json(films);
});

app.get("/api/characters/:id", async (req, res) => {
  let cid = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("characters");
  const character = await collection.find({ id: cid }).toArray();
  res.json(character);
});

app.get("/api/films/:id", async (req, res) => {
  let cid = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("films");
  const film = await collection.find({ id: cid }).toArray();
  res.json(film);
});

app.get("/api/planets/:id", async (req, res) => {
  let cid = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("planets");
  const planet = await collection.find({ id: cid }).toArray();
  res.json(planet);
});

app.get("/api/films/:id/characters", async (req, res) => {
  let id = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("films_characters");
  const characters = await collection
    .aggregate([
      {
        $lookup: {
          from: "characters",
          localField: "character_id",
          foreignField: "id",
          as: "data",
        },
      },
      {
        $match: {
          film_id: id,
        },
      },
    ])
    .toArray();
  res.json(characters);
});

app.get("/api/films/:id/planets", async (req, res) => {
  let id = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("films_planets");
  const planets = await collection
    .aggregate([
      {
        $lookup: {
          from: "planets",
          localField: "planet_id",
          foreignField: "id",
          as: "data",
        },
      },
      {
        $match: {
          film_id: id,
        },
      },
    ])
    .toArray();
  res.json(planets);
});

app.get("/api/characters/:id/films", async (req, res) => {
  let id = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("films_characters");
  const films = await collection
    .aggregate([
      {
        $lookup: {
          from: "films",
          localField: "film_id",
          foreignField: "id",
          as: "data",
        },
      },
      {
        $match: {
          character_id: id,
        },
      },
    ])
    .toArray();
  res.json(films);
});

app.get("/api/characters/:id/planets", async (req, res) => {
  let cid = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("characters");
  const films = await collection.find({ id: cid }).toArray();
  res.json(films);
});

app.get("/api/planets/:id/films", async (req, res) => {
  let id = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("films_planets");
  const films = await collection
    .aggregate([
      {
        $lookup: {
          from: "films",
          localField: "film_id",
          foreignField: "id",
          as: "data",
        },
      },
      {
        $match: {
          planet_id: id,
        },
      },
    ])
    .toArray();
  res.json(films);
});

app.get("/api/planets/:id/characters", async (req, res) => {
  let id = parseInt(req.params.id);
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("characters");
  const characters = await collection.find({ homeworld: id }).toArray();
  res.json(characters);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
