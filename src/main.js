import express from "express";
import { connectToCluster, URI } from "./mongo.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

let mongoClient = await connectToCluster(URI);
const db = mongoClient.db("store");
const collection = db.collection("products");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/products", async (req, res) => {
  const products = await collection.find({}).toArray();
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
