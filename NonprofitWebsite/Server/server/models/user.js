const Sequelize = require('sequelize');
/* This model is the sequelize representation of the user table */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "Username"
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    MiddleName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UserType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "Username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Username" },
        ]
      },
    ]
  });
};
