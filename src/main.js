import express from "express";
import { connectToCluster, URI } from "./mongo.js";

const app = express();
const port = 3000;
let mongoClient = await connectToCluster(URI);
const db = mongoClient.db("store");
const collection = db.collection("products");

app.get("/", async (req, res) => {
  const products = await collection.find({}).toArray();
  console.log(products);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
