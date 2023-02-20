const fs = require("fs");
const path = require("path");
const { camelCase, lowerFirst, forEach } = require("lodash");
const basename = path.basename(__filename);
const controller = {};

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});
forEach(files, (file) => {
  const validationFileDir = path.join(__dirname, file);
  let name = lowerFirst(camelCase(file));
  controller[name.slice(0, -2)] = require(validationFileDir);
});
module.exports = controller;

