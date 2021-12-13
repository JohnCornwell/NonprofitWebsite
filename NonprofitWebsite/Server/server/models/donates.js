const Sequelize = require('sequelize');
/* This model is the sequelize representation of the donates table */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donates', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'UserID'
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
    tableName: 'donates',
    timestamps: false,
    indexes: [
      {
        name: "DonatesUserID",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "DonatesDonationID",
        using: "BTREE",
        fields: [
          { name: "DonationID" },
        ]
      },
    ]
  });
};
