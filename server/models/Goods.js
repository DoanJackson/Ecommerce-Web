import _sequelize from "sequelize";
const { Model } = _sequelize;

class Goods extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Goods",
      {
        id_good: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
        },
        quantity: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        numberSold: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        cost: {
          type: DataTypes.DECIMAL(15, 2),
        },
        type: {
          type: DataTypes.STRING(20),
          field: "type",
        },
        id_merchant: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        tableName: "goods",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "goods_pkey",
            unique: true,
            fields: [{ name: "id_good" }],
          },
        ],
      }
    );
  }
}
export default Goods;
