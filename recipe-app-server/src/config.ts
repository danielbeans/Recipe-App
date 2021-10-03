import dotenv from "dotenv";
dotenv.config();
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
};
