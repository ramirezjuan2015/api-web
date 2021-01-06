const express = require("express");
const mongoose = require("mongoose");
const Exigir = require("../Medio/exigir");

const list = mongoose.model("Location");

const router = express.Router();

router.use(Exigir);

router.get("/location", async (req, res) => {
  try {
    const animals = await list.find();
    res.send(animals);
  } catch (err) {
    res.status(422).send(console.log(err));
  }
});

router.post("/location", async (req, res) => {
  const { locationId, animalId } = req.body;

  if (!locationId || !animalId) {
    return res.status(422).send({ error: "Debe proporcionar ubicación" });
  }

  try {
    const lista = new list({ locationId, animalId, userId: req.user._id });
    await lista.save();
    res.send(lista);
  } catch (err) {
    res.status(422).send({ error: "Locación inválida" });

  }
});

module.exports = router;