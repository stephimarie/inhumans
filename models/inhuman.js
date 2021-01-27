module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Actor = sequelize.define("Actor", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    imageData: {
      type: DataTypes.BLOB("long"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("now()"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("now()"),
    },
  });

  return Actor;
};
