const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donation', {
    DonationId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.STRING(15),
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
    Amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'donation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DonationId" },
        ]
      },
    ]
  });
};
