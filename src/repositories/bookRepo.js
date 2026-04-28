import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createBook= (data)=> {
  return prisma.book.create({ data });
};

export const getAllBooks= ()=> {
  return prisma.book.findMany();
};

export const getBookById= (id)=>{
  return prisma.book.findUnique({
    where: {id},
  });
};

export const updateBook= (id, data)=> {
  return prisma.book.update({
    where: {id},
    data,
  });
};

export const deleteBook= (id)=> {
  return prisma.book.delete({
    where: {id},
  });
};