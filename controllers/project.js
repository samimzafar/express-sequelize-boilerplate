const { Projects } = require("../models");
module.exports = {
 create: async (req, res) => {
  try {
   const { query: { name } } = req;
   let projectSaved = await Projects.create({
    name
   });
   return res.send({
    status: 200,
    success: true,
    message: "Project added successfully.",
    data: { projectSaved },
   });
  } catch (err) {
   console.log(err.message);
   return res
    .status(err.status || 500)
    .send({
     error: err.message || "Something went wrong!"
    });
  }
 },
};
