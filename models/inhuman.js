module.exports = (sequelize, DataTypes) => {
  const Actors = sequelize.define("Actors", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,40],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1,40],
      },
    },
  });
  return Actors;
};
