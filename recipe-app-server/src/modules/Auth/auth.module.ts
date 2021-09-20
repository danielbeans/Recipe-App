import { FirebaseApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ISignupCredentials from "./interfaces/auth-credentials.interface";

export async function createUser(
  app: FirebaseApp,
  { name, username, password, email }: ISignupCredentials
) {
  const auth = getAuth();
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const userId = auth.currentUser.uid;
  console.log(userId);
  // create a new document in which is associated with a user
}

export function loginUser({ username, password }) {}

export function logoutUser() {}
