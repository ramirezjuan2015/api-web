const express = require("express");
const mongoose = require("mongoose");
const Exigir = require("../Medio/exigir");

const list = mongoose.model("Animal");

const router = express.Router();

router.use(Exigir);

router.get("/animal", async (req, res) => {
  try {
    const go = await list.aggregate([
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "animalId",
          as: "locations",
        },
      },
    ]);
    res.send(go);
    console.log(go);
  } catch (err) {
    res.status(422).send(console.log(err));
  }
});

/* router.get("/animal", async (req, res) => {
  const animals = await list
    .find({ userId: req.user._id })
    .populate("categoryId");

  res.send(animals);
}); */

router.post("/animal", async (req, res) => {
  const { categoryId, name } = req.body;

  if (!categoryId || !name) {
    return res.status(422).send({ error: "Must provide category or name" });
  }

  try {
    const lista = new list({ categoryId, name, userId: req.user._id });
    await lista.save();
    res.send(lista);
  } catch (err) {
    res.status(422).send({ error: "Invalid animal" });
  }
});

module.exports = router;