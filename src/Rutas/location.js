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
  const { animalId, locations } = req.body;

  if (!animalId) {
    return res.status(422).send({ error: "Debe proporcionar " });
  }

  if (!locations) {
    return res.status(422).send({ error: "Locaciones necesitadas" })
  }

  if (locations.len)
    try {
      const location = new locationModel({ locationId, animalId, userId: req.user._id });
      await location.save();
      res.send(location);
    } catch (err) {
      res.status(422).send({ error: "Locación inválida" });

    }
});

module.exports = router;