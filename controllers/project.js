const { Projects, DevProjects, Devs } = require("../models");
const ApiError = require("../utils/apiError");
const builtResponse = require("../utils/builtResponse");
module.exports = {
  create: async (req, res, next) => {
    try {
      const {
        query: { name },
      } = req;
      let projectSaved = await Projects.create({
        name,
      });

      builtResponse(res, "Project added successfully", projectSaved);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
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
      builtResponse(res, "Project fetched successfully", projectSaved);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
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
      if (projectSaved.length == 0) {
        throw new ApiError(404, "Project is not found");
      }
      builtResponse(res, "Project Fetched successfully", projectSaved);
    } catch (err) {
      next(err);
    }
  },
};
