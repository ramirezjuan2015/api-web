const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const AnimalSchema = Schema({
  name: {
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    unique: true,
    categoryId: ObjectId,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Animal", AnimalSchema);
