import _sequelize from "sequelize";
const { Model } = _sequelize;

class Users extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Users",
      {
        id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(100),
        },
      },
      {
        tableName: "users",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            unique: true,
            fields: [{ name: "email" }],
          },
        ],
      }
    );
  }
}
export default Users;
