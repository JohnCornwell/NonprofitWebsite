const Sequelize = require('sequelize');
/* This model is the sequelize representation of the needs table */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('needs', {
    EventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'event',
        key: 'EventID'
      }
    },
    DonationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
