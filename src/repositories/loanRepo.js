import {PrismaClient} from "../generated/prisma/index.js";

const prisma= new PrismaClient();

export const createLoan=(data)=> {
  return prisma.loan.create({ data });
};

export const getAllLoans=()=>{
  return prisma.loan.findMany();
};

export const getLoanById=(id)=>{
  return prisma.loan.findUnique({
    where: {id},
  });
};

export const updateLoan=(id,data) =>{
  return prisma.loan.update({
    where: {id},
    data,
  });
};

export const deleteLoan=(id) =>{
  return prisma.loan.delete({
    where:{id},
  });
};