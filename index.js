import express from "express";
import dotenv from "dotenv";
import contactsRoutes from "./routes/contactsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/contacts", contactsRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
