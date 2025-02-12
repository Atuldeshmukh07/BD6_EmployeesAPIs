const { DataTypes, sequelize } = require("../lib/");

// const department = sequelize.define("department", {
//   name: DataTypes.STRING,
// });

const department = sequelize.define("department", {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { department };
