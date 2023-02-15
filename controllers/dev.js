const { Devs, Projects, DevProjects, sequelize } = require("../models");
module.exports = {

 create: async (req, res) => {
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
   return res.send({
    status: 200,
    success: true,
    message: "devProject added successfully.",
    data: devProject,
   });
  } catch (err) {
   await transaction.rollback();
   console.log(err);
   return res
    .status(err.status || 500)
    .send(err.message || "Something went wrong!");
  }
 },

 findDevProject: async (req, res) => {
  try {
   const { query: { devId } } = req;
   const developer = await Devs.findOne({
    where: { id: devId },
    attributes: ['id', 'name'],
    include: [
     {
      model: DevProjects,
      as: "devProjects",
      attributes: ['id'],
      where: {
       fk_dev_id: devId,
      },
      include: {
       model: Projects,
       as: "projects",
       attributes: ['id', 'name']
      }
     },
    ]
   });
   return res.send({
    status: 200,
    success: true,
    message: "devProject added successfully.",
    data: developer,
   });
  } catch (err) {
   console.log(err);
   return res
    .status(err.status || 500)
    .send(err.message || "Something went wrong!");
  }
 }
};
