const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('needs', {
    EventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event',
        key: 'EventID'
      }
    },
    DonationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donation',
        key: 'DonationID'
      }
    }
  }, {
    sequelize,
    tableName: 'needs',
    timestamps: false,
    indexes: [
      {
        name: "NeedsEventID",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
      {
        name: "NeedsDonationID",
        using: "BTREE",
        fields: [
          { name: "DonationID" },
        ]
      },
    ]
  });
};
