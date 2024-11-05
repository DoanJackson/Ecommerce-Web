import _Users from "./User.js";
import _Client from "./Client.js";
import _Admin from "./Admin.js";
import _ClientNormal from "./Client_normal.js";
import _Merchant from "./Merchant.js";
import _Goods from "./Goods.js";
import { DataTypes } from "sequelize";

function initModels(sequelize) {
  const Users = _Users.init(sequelize, DataTypes);
  const Admin = _Admin.init(sequelize, DataTypes);
  const Client = _Client.init(sequelize, DataTypes);
  const ClientNormal = _ClientNormal.init(sequelize, DataTypes);
  const Merchant = _Merchant.init(sequelize, DataTypes);
  const Goods = _Goods.init(sequelize, DataTypes);

  return {
    Users,
    Admin,
    Client,
    ClientNormal,
    Merchant,
    Goods,
  };
}

export { initModels };
