const { Students, Banks, StudentBanks } = require("../models");

module.exports = {
  add: async (req, res) => {
    try {
      const { name, semester, bank } = req.body;
      const bankInfo = await Banks.findOne({
        where: {
          name: bank,
        },
      });
      const savedStudent = await Students.create({ name, semester });
      const studentBankPayLoad = {
        fk_student_Id: savedStudent.id,
        fk_bank_Id: bankInfo.id,
      };
      await StudentBanks.create(studentBankPayLoad);
      return res.status(200).json(savedStudent);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },

  getOne: async (req, res) => {
    try {
      const bankInfo = await Banks.findAll({
        where: {
          name: "mcb",
        },
      });
      return res.status(200).json(bankInfo);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
