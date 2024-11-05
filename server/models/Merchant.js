import _sequelize from "sequelize";
const { Model } = _sequelize;

class Merchant extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Merchant",
      {
        id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        nameShop: {
          type: DataTypes.STRING(100),
        },
      },
      {
        tableName: "merchant",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "merchant_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
export default Merchant;
