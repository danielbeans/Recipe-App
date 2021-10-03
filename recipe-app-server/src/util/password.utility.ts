import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10); // generate salt for hashing
    return bcrypt.hash(password, salt); // return hashed password
  } catch (err) {
    console.error(err); // replace this with actual error handling
  }
}

export async function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
