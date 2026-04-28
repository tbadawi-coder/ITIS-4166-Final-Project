import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};