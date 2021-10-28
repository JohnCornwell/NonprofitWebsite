const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('program', {
    ProgID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "Name"
    },
    About: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'program',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProgID" },
        ]
      },
      {
        name: "Name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Name" },
        ]
      },
    ]
  });
};
