const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  pokedex: [
    {
      name: {
        type: String,
        required: true,
      },
      sprite: {
        type: Object,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
