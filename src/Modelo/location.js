const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locationId: {
    type: String,
    required: true
  },
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
  },
});

mongoose.model("Location", locationSchema);