require("./Modelo/usuario");
require("./Modelo/category");
require("./Modelo/animal");
require("./Modelo/location");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Rutas = require("./Rutas/autorizaciones");
const Permisos = require("./Rutas/animal");
const PermisosEsquema = require("./Rutas/category");
const Location = require("./Rutas/location");
const Exigir = require("./Medio/exigir");

const app = express();

app.use(bodyParser.json());
app.use(Rutas);
app.use(Permisos);
app.use(PermisosEsquema);
app.use(Location);

const mongoUri = "mongodb://localhost:27017/curso";

//const mongoUri = 'mongodb+srv://juanramirez:valentina1010@cluster0.nnbvd.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.set("port", process.env.PORT || 3000);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

//app.get('/', Exigir, (req, res) => {
// res.send(`Your email: ${req.user.email}`);
//});

app.get("/category", (req, res) => {
  Categorias.await({}, (err, categorias) => {
    res.status(422).send(categorias);
  });
});

app.listen(app.get("port"), () => {
  console.log(`conectado en el puerto ${app.get("port")}`);
});

module.exports = mongoose;