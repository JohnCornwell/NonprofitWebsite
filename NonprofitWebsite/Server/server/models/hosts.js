const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hosts', {
    ProgID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'program',
        key: 'ProgID'
      }
    },
    EventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'event',
        key: 'EventID'
      }
    }
  }, {
    sequelize,
    tableName: 'hosts',
    timestamps: false,
    indexes: [
      {
        name: "HostsProgID",
        using: "BTREE",
        fields: [
          { name: "ProgID" },
        ]
      },
      {
        name: "HostsEventID",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
    ]
  });
};
