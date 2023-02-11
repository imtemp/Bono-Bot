const User = require("../models/user");

async function getPokedex(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findOne({ discordId: id });
    if (!user) {
      let user1 = new User({
        discordId: id,
        pokedex: [],
      });
      return res.json(user1.pokedex);
    }
    user.pokedex.sort((x, y) => {
      return x.position - y.position;
    });
    res.json(user.pokedex);
  } catch (err) {
    res.status(500).send("Error");
  }
}

module.exports = {
  getPokedex: getPokedex,
};
