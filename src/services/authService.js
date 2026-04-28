import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createUser, findUserByEmail} from "../repositories/userRepo.js";

const SALT_ROUNDS = 10;

export const signup= async ({ name, email, password }) => {
  const existingUser= await findUserByEmail(email);
  if (existingUser){
    throw { status: 409, message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role: "member",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const login= async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw {status: 401, message: "Invalid credentials"};
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw {status: 401, message: "Invalid credentials"};
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};