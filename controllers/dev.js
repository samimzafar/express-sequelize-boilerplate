const { Devs, Projects, DevProjects, sequelize } = require("../models");
const ApiError = require("../utils/apiError");
const builtResponse = require("../utils/builtResponse");
module.exports = {
  create: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const { query: { name, projectName } } = req;
      let project = await Projects.findOne({
        where: {
          name: projectName
        },
        transaction
      });
      let savedDev = await Devs.findOne({
        where: { name },
        transaction
      });
      if (!savedDev) savedDev = await Devs.create({ name }, { transaction });
      const data = {
        fk_dev_id: savedDev.id,
        fk_project_id: project.id
      };
      const devProject = await DevProjects.create(data, { transaction });
      await transaction.commit();
      builtResponse(res, "devProject added successfully.", devProject);
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },

  findDevProject: async (req, res, next) => {
    try {
      const { query: { devId } } = req;
      let developer = await Devs.findOne({
        where: { id: devId },
        attributes: ['id', 'name'],
        include: [
          {
            model: DevProjects,
            as: "devProjects",
            attributes: ['id'],
            include: {
              model: Projects,
              as: "projects",
              attributes: ['id', 'name']
            }
          },
        ]
      });
      if (!developer) throw new ApiError(404,"Developer not found")
      builtResponse(res, "devProject added successfully.", developer);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};
