import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10); // generate salt for hashing
  return bcrypt.hash(password, salt); // return hashed password
}

export async function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
