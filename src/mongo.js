const URI = "mongodb://127.0.0.1:27017";
import { MongoClient } from 'mongodb';

export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }


 export async function executeDBOperation() {
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(URI);
        const db = mongoClient.db('store');
        const collection = db.collection('products');
        const products = await collection.find({}).toArray();
        console.log("products", products);

    } finally {
        await mongoClient.close();
    }
 }


executeDBOperation();