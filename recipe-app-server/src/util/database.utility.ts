import mongoose from "mongoose";
import config from "../config";
export const connectDb = async () => {
  const uri = `mongodb+srv://${config.atlas.username}:${config.atlas.password}@${config.atlas.cluster}/${config.atlas.dbname}?retryWrites=true&w=majority`;
  mongoose.Promise = global.Promise;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
};
