import * as bookRepo from "../repositories/bookRepo.js";

export const createBook= async(data)=> {
  if (!data.title || !data.isbn) {
    throw { status: 400, message: "Missing required fields" };
  }

  return bookRepo.createBook(data);
};

export const getAllBooks= async()=>{
  return bookRepo.getAllBooks();
};

export const getBookById= async(id)=> {
  const book = await bookRepo.getBookById(Number(id));

  if (!book) {
    throw { status:404, message: "Book not found" };
  }
  return book;
};

export const updateBook = async (id, data)=> {
  const existing = await bookRepo.getBookById(Number(id));
  if (!existing) {
    throw {status: 404, message: "Book not found"};
  }
  return bookRepo.updateBook(Number(id), data);
};

export const deleteBook = async (id) => {
  const existing = await bookRepo.getBookById(Number(id));
  if (!existing) {
    throw {status:404, message: "Book not found"};
  }

  return bookRepo.deleteBook(Number(id));
};