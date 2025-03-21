const express = require("express");
console.log("Hola Mundo")
const port = 8000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongodb:12345@cluster0.fyc2l.mongodb.net/?appName=Cluster0";
const db_mongo = "project_1"
const collection_mongo = "contacts"

app.get("/contacts", async (req, res)=>{
    const collection = await connectDB();
    if (!collection) return res.status(500).json({ error: "No se pudo conectar a la base de datos" });
  
    try {
      const data = await collection.findOne({});
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
});

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  

async function connectDB() {
    try {
      await client.connect();
      console.log(" Conectado a MongoDB Atlas");
      return client.db(db_mongo).collection(collection_mongo);
    } catch (error) {
      console.error(" Error al conectar a MongoDB:", error);
    }
  }
  


app.listen(port, ()=>{
    console.log("Puerto funcionando en" + port)
});