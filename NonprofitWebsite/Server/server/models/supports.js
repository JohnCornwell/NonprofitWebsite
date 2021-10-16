const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supports', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'UserID'
      }
    },
    OrgID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'OrgID'
      }
    }
  }, {
    sequelize,
    tableName: 'supports',
    timestamps: false,
    indexes: [
      {
        name: "UserID",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "SupportsOrgId",
        using: "BTREE",
        fields: [
          { name: "OrgID" },
        ]
      },
    ]
  });
};
