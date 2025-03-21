const express = require("express");
console.log("Hola Mundo")
const port = 8000;
const app = express();
app.listen(port, ()=>{
    console.log("Puerto funcionando en" + port)
});
