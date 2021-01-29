module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Actor = sequelize.define("Actor", {
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    isKiller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    foundKiller: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foundRoom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hasMoved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
