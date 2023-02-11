const User = require("../models/user");

async function getRandomPokemon(req, res) {
  // get ID
  const { id } = req.params;

  // Find user and roll pokemon to insert to Pokedex
  try {
    let user = await User.findOne({ discordId: id });
    if (!user) {
      user = new User({
        discordId: id,
        pokedex: [],
      });
    }

    // Get total number of pokemon to get all possibilities
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
    );
    const data = await response.json();
    const totalPokemon = data.count;
    const pokemonPosition = Math.floor(Math.random() * totalPokemon + 1);
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonPosition}`
    );
    const pokemonData = await pokemonResponse.json();
    const randomPokemon =
      pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    const pokemonToStore = {
      name: randomPokemon,
      sprite: pokemonData.sprites,
      position: pokemonPosition,
    };
    user.pokedex.push(pokemonToStore);
    await user.save();

    console.log(`${pokemonToStore.name} has been added to ${user.discordId}`);

    res.json(pokemonToStore);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error");
  }
}

module.exports = {
  getRandomPokemon: getRandomPokemon,
};
