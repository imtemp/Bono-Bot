const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokedexSchema = new Schema({
    userID: { type: String, required: true},
    pokemon: { type: String, required: true}
});

module.exports = mongoose.model("Pokedex", PokedexSchema);