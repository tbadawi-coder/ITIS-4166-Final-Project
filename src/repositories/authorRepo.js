import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createAuthor= (data)=>{
  return prisma.author.create({ data });
};

export const getAllAuthors=()=> {
  return prisma.author.findMany();
};

export const getAuthorById= (id)=> {
  return prisma.author.findUnique({
    where: {id},
  });
};

export const updateAuthor= (id,data)=> {
  return prisma.author.update({
    where: {id },
    data,
  });
};

export const deleteAuthor =(id)=>{
  return prisma.author.delete({
    where: {id},
  });
};