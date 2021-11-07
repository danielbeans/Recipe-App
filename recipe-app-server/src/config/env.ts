import dotenv from "dotenv";
dotenv.config();

enum NodeEnvTypes {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

export default {
  atlas: {
    password: process.env.ATLAS_PASSWORD,
    username: process.env.ATLAS_USERNAME,
    cluster: process.env.ATLAS_CLUSTER,
    dbname: process.env.ATLAS_DBNAME,
  },
  express: {
    port: process.env.PORT,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  },
  recipes: {
    app_id: process.env.RECIPES_APP_ID,
    app_key: process.env.RECIPES_APP_KEY,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  node_env: {
    isDevelopment: process.env.NODE_ENV === NodeEnvTypes.DEVELOPMENT,
  },
};
