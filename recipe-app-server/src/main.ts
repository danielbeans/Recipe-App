import "module-alias/register";
import express from "express";
import cors from "cors";
import config from "@config/env";
import { AuthRoutes } from "@routes/Auth.routes";
import { RecipeRoutes } from "@routes/Recipes.routes";
import { AUTH_ROUTES, RECIPE_ROUTES } from "@shared/routes";
import { connectDb } from "@util/database.utility";
import session from "express-session";

const app = express(); // creates new express application
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
    secret: config.session.secret,
  })
);
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  })
); // informs express to use the cors middleware (Cross Origin Request Sharing)
app.use(express.json()); // allows JSON responses to be read
express.urlencoded({ extended: false }); // allows urlencoded responses to be read
(async function main() {
  await connectDb(); // Before making any routes for the server, wait for DB to connect
  app.use(AUTH_ROUTES.BASE, AuthRoutes()); // setup routes for AuthService. Second argument must be a function EXECUTION rather than a reference.
  app.use(RECIPE_ROUTES.BASE, RecipeRoutes());
  app.listen(config.express.port, () =>
    console.log(`App running on http://localhost:${config.express.port}`)
  ); // tells express to listen on the port specified on localhost
})();
