const express = require("express");
const mongoose = require("mongoose");
const Exigir = require("../Medio/exigir");

const list = mongoose.model("Category");

const router = express.Router();

router.use(Exigir);

router.get("/category", async (req, res) => {
  try {
    const categoria = await list.aggregate([
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: "animals",
          localField: "_id",
          foreignField: "categoryId",
          as: "animals",
        },
      },
    ]);
    res.send(categoria);
  } catch (err) {
    res.status(422).send(console.log(err));
  }
});

router.post("/category", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).send({ error: "Must provide a name " });
  }

  try {
    const lista = new list({ name, userId: req.user._id });
    await lista.save();
    res.send(lista);
  } catch (err) {
    res.status(422).send({ error: "Invalid category" });
  }
});

module.exports = router;