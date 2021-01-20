module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  return Todo;
};
