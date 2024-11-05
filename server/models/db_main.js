import { Sequelize } from "sequelize";
import dbConfig from "../config/db_config.js";
import { initModels } from "./init_models.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});
const models = initModels(sequelize);

export { models, sequelize };
