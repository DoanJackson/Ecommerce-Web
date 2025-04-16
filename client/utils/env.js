import dotenv from "dotenv";
import process from "process";

dotenv.config();

function getEnv(key) {
  return process.env[key];
}

export { getEnv };
