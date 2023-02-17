const { Projects, DevProjects, Devs } = require("../models");
module.exports = {
  create: async (req, res) => {
    try {
      const {
        query: { name },
      } = req;
      let projectSaved = await Projects.create({
        name,
      });
      return res.send({
        status: 200,
        success: true,
        message: "Project added successfully.",
        data: projectSaved,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(err.status || 500).send({
        error: err.message || "Something went wrong!",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      let projectSaved = await Projects.findAll({
        attributes: ["id", "name"],
        include: [
          {
            model: DevProjects,
            as: "devProjects",
            attributes: ["id"],
            include: {
              model: Devs,
              as: "devs",
              attributes: ["id", "name"],
            },
          },
        ],
      });
      return res.send({
        status: 200,
        success: true,
        message: "Project added successfully.",
        data: projectSaved,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(err.status || 500).send({
        error: err.message || "Something went wrong!",
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const {
        params: { name },
      } = req;
      console.log(name);
      let projectSaved = await Projects.findAll({
        where: { name },
        attributes: ["name"],
        include: [
          {
            model: DevProjects,
            as: "devProjects",
            attributes: ["id"],
            include: {
              model: Devs,
              as: "devs",
              attributes: ["name"],
            },
          },
        ],
      });
      return res.send({
        status: 200,
        success: true,
        message: "Project Fetched successfully.",
        data: projectSaved,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(err.status || 500).send({
        error: err.message || "Something went wrong!",
      });
    }
  },
};
