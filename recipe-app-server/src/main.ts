import express, { Request } from "express";
import cors from "cors";
import config from "./config";
import { AuthRoutes } from "./routes/Auth.routes";
import { connectDb } from "./util/database.utility";
import { verifyJwt } from "./middleware/verify-jwt.middleware";
const app = express(); // creates new express application
app.use(cors()); // informs express to use the cors middleware (Cross Origin Request Sharing)
app.use(express.json()); // allows JSON responses to be read
express.urlencoded({ extended: false }); // allows urlencoded responses to be read
// interface IRequest extends Request {
//   user: { user_id: string; email: string; iat: number; exp: number };
// }
(async function main() {
  await connectDb(); // Before making any routes for the server, wait for DB to connect
  app.get("/", verifyJwt, (req, res) => {
    console.log(req.user);
    res.status(200).send("Hello, authenticated user!");
  });
  app.use("/auth", AuthRoutes()); // setup routes for AuthService. Second argument must be a function EXECUTION rather than a reference.
  app.listen(config.express.port, () =>
    console.log(`App running on http://localhost:${config.express.port}`)
  ); // tells express to listen on the port specified on localhost
})();
