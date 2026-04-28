import * as loanRepo from "../repositories/loanRepo.js";
import {PrismaClient } from "../generated/prisma/index.js";

const prisma= new PrismaClient();

export const createLoan= async(userId,bookId) =>{
  const book = await prisma.book.findUnique({
    where: {id: Number(bookId)},
  });

  if(!book){
    throw {status: 404, message: "Book not found"};
  }
  if(book.copiesAvailable <= 0){
    throw {status: 400, message: "Book not available"};
  }

  //decrease the copies
  await prisma.book.update({
    where: {id: Number(bookId)},
    data: {
      copiesAvailable: book.copiesAvailable - 1,
    },
  });

  return loanRepo.createLoan({
    userId,
    bookId: Number(bookId),
  });
};

export const getAllLoans= async()=>{
  return loanRepo.getAllLoans();
};

export const getLoanById=async (id,user)=>{
  const loan = await loanRepo.getLoanById(Number(id));
  if(!loan){
    throw {status: 404, message: "Loan not found"};
  }

  if(user.role !== "admin" && loan.userId !== user.id){
    throw {status: 403, message: "Forbidden"};
  }

  return loan;
};

export const returnLoan = async (id) => {
  const loan = await loanRepo.getLoanById(Number(id));
  if (!loan){
    throw {status: 404, message: "Loan not found"};
  }

  //increase the copies
  await prisma.book.update({
    where: {id: loan.bookId},
    data: {
      copiesAvailable: {
        increment: 1,
      },
    },
  });

  return loanRepo.updateLoan(Number(id), {
    status: "returned",
    returnDate: new Date(),
  });
};

export const deleteLoan = async (id) => {
  const loan= await loanRepo.getLoanById(Number(id));
  if(!loan){
    throw {status: 404, message: "Loan not found"};
  }

  return loanRepo.deleteLoan(Number(id));
};