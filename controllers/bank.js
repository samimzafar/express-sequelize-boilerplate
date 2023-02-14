const { Students, Banks } = require("../models");

module.exports = {
  add: async (req, res) => {
    try {
      const savedBank = await Banks.create(req.body);
      return res.status(200).json(savedBank);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },

  getAll: async (req, res) => {
    try {
      const bankInfo = await Banks.findAll({
        attributes: ["name", "location"],
      });
      return res.status(200).json(bankInfo);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },

  getOne: async (req, res) => {
    try {
      const bankName = req.params.name;
      let bankInfo = await Banks.findOne({
        where: {
          name: bankName,
        },
        attributes: ["id", "name", "location"],
        include: {
          model: Students,
          as: "students",
          attributes: ["name", "semester"],
          through: {
            attributes: [],
          },
        },
      });
      bankInfo = {
        ...bankInfo.toJSON(),
        no_of_stds: bankInfo.students.length,
      };
      return res.status(200).json(bankInfo);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
