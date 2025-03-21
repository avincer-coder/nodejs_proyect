import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverApi: ServerApiVersion.v1,
});

export async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB Atlas");
        return client.db(process.env.DB_MONGO);
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}
