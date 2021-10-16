const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hosts', {
    OrgID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'OrgID'
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
    tableName: 'hosts',
    timestamps: false,
    indexes: [
      {
        name: "HostsOrgID",
        using: "BTREE",
        fields: [
          { name: "OrgID" },
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
