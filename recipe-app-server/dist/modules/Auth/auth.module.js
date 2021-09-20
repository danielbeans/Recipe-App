"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
async function createUser(app, { name, username, password, email }) {
    const auth = auth_1.getAuth();
    const user = await auth_1.createUserWithEmailAndPassword(auth, email, password);
    const userId = auth.currentUser.uid;
    console.log(userId);
    // create a new document in which is associated with a user
}
exports.createUser = createUser;
function loginUser({ username, password }) { }
exports.loginUser = loginUser;
function logoutUser() { }
exports.logoutUser = logoutUser;
