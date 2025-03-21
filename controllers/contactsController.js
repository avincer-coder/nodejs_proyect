import { connectDB } from "../config/database.js";
import { ObjectId } from "mongodb";

let collection;

async function initCollection() {
    const db = await connectDB();
    collection = db.collection(process.env.COLLECTION_MONGO);
}

initCollection();

export const getAllContacts = async (req, res) => {
    try {
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};

export const getContactById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const data = await collection.findOne({ id: id });
        if (!data) return res.status(404).json({ error: "Contacto no encontrado" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};
