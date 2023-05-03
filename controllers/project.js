const { Projects, DevProjects, Devs } = require("../models");
const ApiError = require("../utils/apiError");
const moment = require("moment");
const { Op } = require("sequelize");
const builtResponse = require("../utils/builtResponse");
const catchAsyncHandler = require("../utils/catchAsyncHandler");
module.exports = {
  create: catchAsyncHandler(async (req, res, next) => {
    const {
      query: { name },
    } = req;
    let projectSaved = await Projects.create({
      name,
    });
    if (!projectSaved) next(new ApiError(404, "Project is not saved"));
    builtResponse(res, "Project added successfully", projectSaved);
  }),

  getAll: catchAsyncHandler(async (req, res, next) => {
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
    if (projectSaved.length == 0)
      next(new ApiError(404, "Project is not found"));
    builtResponse(res, "Project fetched successfully", projectSaved);
  }),

  getOne: catchAsyncHandler(async (req, res, next) => {
    const {
      params: { name },
    } = req;

    const startOfDay = moment().startOf("day").unix();

    const endOfDay = moment().endOf("day").unix();
    console.log(
      "🚀 ~ file: project.js:48 ~ getOne:catchAsyncHandler ~ endOfDay:",
      endOfDay
    );
    console.log(
      "🚀 ~ file: project.js:48 ~ getOne:catchAsyncHandler ~ currentTime:",
      moment().unix()
    );

    let projectSaved = await Projects.findOne({
      where: {
        name,
        createdAt: {
          [Op.gte]: [moment().unix()],
        },
      },
      attributes: ["name"],
      // include: [
      //   {
      //     model: DevProjects,
      //     as: "devProjects",
      //     attributes: ["id"],
      //     include: {
      //       model: Devs,
      //       as: "devs",
      //       attributes: ["name"],
      //     },
      //   },
      // ],
    });
    console.log(
      "🚀 ~ file: project.js:70 ~ getOne:catchAsyncHandler ~ projectSaved:",
      projectSaved
    );

    if (!projectSaved) {
      return next(new ApiError(404, "Project is not found"));
    }
    builtResponse(res, "Project Fetched successfully", projectSaved);
  }),
};
