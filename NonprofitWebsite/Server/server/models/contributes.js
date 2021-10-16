const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contributes', {
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
    }
  }, {
    sequelize,
    tableName: 'contributes',
    timestamps: false,
    indexes: [
      {
        name: "ContributesUserID",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "ContributesEventID",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
    ]
  });
};
