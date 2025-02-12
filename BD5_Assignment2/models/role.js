const { DataTypes, sequelize } = require("../lib/");

// const role = sequelize.define("role", {
//   title: { type: DataTypes.STRING },
// });

const role = sequelize.define("role", {
  title: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { role };
