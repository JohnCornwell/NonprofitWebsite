const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
    EventID: {
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
    VolunteerNeed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DonationGoal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StartHour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StartMinute: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    EndHour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    EndMinute: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'event',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EventID" },
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
