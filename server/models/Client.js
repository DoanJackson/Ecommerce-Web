import _sequelize from "sequelize";
const { Model } = _sequelize;

class Client extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Client",
      {
        id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        roleClient: {
          type: DataTypes.STRING(20),
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        address: {
          type: DataTypes.STRING(100),
        },
        balance: {
          type: DataTypes.DECIMAL(15, 2),
        },
        telPhone: {
          type: DataTypes.STRING(15),
        },
      },
      {
        tableName: "client",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "client_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
export default Client;
