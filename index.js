// const express = require("express");
// console.log("Hola Mundo")
// const port = 8000;
// const app = express();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://mongodb:12345@cluster0.fyc2l.mongodb.net/?appName=Cluster0";
// const db_mongo = "project_1"
// const collection_mongo = "contacts"
// const { ObjectId } = require("mongodb");



// app.get("/contacts", async (req, res)=>{
//     const collection = await connectDB();
//     if (!collection) return res.status(500).json({ error: "No se pudo conectar a la base de datos" });
  
//     try {
//         const data = await collection.find().toArray();
//         res.json(data);
//     } catch (error) {
//       res.status(500).json({ error: "Error al obtener los datos" });
//     }
// });
// app.get("/contacts/:id", async (req, res)=>{

//     console.log(req.params.id)

//     const collection = await connectDB();
//     if (!collection) return res.status(500).json({ error: "No se pudo conectar a la base de datos" });
  
//     try {
//       const data = await collection.findOne({ _id: new ObjectId(req.params.id) });
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ error: "Error al obtener los datos" });
//     }
// });

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
  

// async function connectDB() {
//     try {
//       await client.connect();
//       console.log(" Conectado a MongoDB Atlas");
//       return client.db(db_mongo).collection(collection_mongo);
//     } catch (error) {
//       console.error(" Error al conectar a MongoDB:", error);
//     }
//   }
  


// app.listen(port, ()=>{
//     console.log("Puerto funcionando en" + port)
// });


import dotenv from 'dotenv'; 
dotenv.config(); 
const app = express();
import express from "express";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

console.log("Hola Mundo");

const port = process.env.PORT;
const uri = process.env.URI;
const db_mongo = process.env.DB_MONGO;
const collection_mongo = process.env.COLLECTION_MONGO;

const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverApi: ServerApiVersion.v1,
});


let collection;

async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB Atlas");
        collection = client.db(db_mongo).collection(collection_mongo);
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

connectDB();

app.get("/contacts", async (req, res) => {
    if (!collection) return res.status(500).json({ error: "No se pudo conectar a la base de datos" });

    try {
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});

app.get("/contacts/:id", async (req, res) => {
    if (!collection) return res.status(500).json({ error: "No se pudo conectar a la base de datos" });

    const id = parseInt(req.params.id); // Convertimos a número

    try {
        const data = await collection.findOne({ id: id }); // Buscamos por el campo id
        if (!data) return res.status(404).json({ error: "Contacto no encontrado" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});


app.listen(port, () => {
    console.log("Puerto funcionando en " + port);
});

process.on("SIGINT", async () => {
    console.log("Cerrando conexión con MongoDB...");
    await client.close();
    process.exit(0);
});
