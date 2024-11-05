import _sequelize from "sequelize";
const { Model } = _sequelize;

class ClientNormal extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "ClientNormal",
      {
        id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        tableName: "clientnormal",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "clientnormal_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
export default ClientNormal;
