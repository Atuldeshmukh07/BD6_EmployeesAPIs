const { DataTypes, sequelize } = require("../lib/");

// const employee = sequelize.define("employee", {
//   name: { type: DataTypes.STRING },
//   email: { type: DataTypes.STRING },
// });
const employee = sequelize.define("employee", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = { employee };
