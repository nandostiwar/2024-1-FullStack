const Countrie = require('../Models/Countrie');

const CountrieController = {};

CountrieController.getCountrie = async (req, res) => {
  try {
    const countries = await Countrie.find();
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries", error);
    res.status(500).json({ message: "Error fetching countries" });
  }
};

module.exports = CountrieController;