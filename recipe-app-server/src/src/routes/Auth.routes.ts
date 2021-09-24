import router from "../router";
import { AuthController } from "../controllers/Auth.controller";

// BIND ROUTE TO A CONTROLLER METHOD
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
