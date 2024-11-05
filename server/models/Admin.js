import _sequelize from "sequelize";
const { Model } = _sequelize;

class Admin extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Admin",
      {
        id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        tableName: "admin",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "admin_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
export default Admin;
