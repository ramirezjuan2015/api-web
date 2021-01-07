const mongoose = require("mongoose");

const Marker = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const locationSchema = new mongoose.Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
  },
  markers: [Marker],
});

mongoose.model("Location", locationSchema);
