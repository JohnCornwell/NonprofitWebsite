const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donates', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'UserID'
      }
    },
    DonationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donation',
        key: 'DonationId'
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