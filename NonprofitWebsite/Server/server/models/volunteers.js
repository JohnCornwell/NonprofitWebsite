const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('volunteers', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'UserID'
      }
    },
    EventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event',
        key: 'EventID'
      }
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Slot: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'volunteers',
    timestamps: false,
    indexes: [
      {
        name: "VolunteersUserID",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "VolunteersEventID",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
    ]
  });
};