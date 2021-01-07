const express = require("express");
const mongoose = require("mongoose");
const Exigir = require("../Medio/exigir");

const locationModel = mongoose.model("Location");

const router = express.Router();

router.use(Exigir);

router.get("/location", async (req, res) => {
  try {
    const location = await locationModel.find();
    res.send(location);
  } catch (err) {
    res.status(422).send(console.log(err));
  }
});

router.post("/location", async (req, res) => {
  const { animalId, markers } = req.body;

  if (!animalId) {
    return res.status(422).send({ error: "Debe proporcionar animal id" });
  }

  if (!markers) {
    return res.status(422).send({ error: "Locaciones necesitadas" });
  }

  if (!markers.length) {
    return res.status(422).send({ error: "Necesita mas de una locación" });
  }
  try {
    const location = new locationModel({
      animalId,
      markers,
    });
    await location.save();
    res.send(location);
  } catch (err) {
    res.status(422).send({ error: "Locación inválida" });
  }
});

module.exports = router;
