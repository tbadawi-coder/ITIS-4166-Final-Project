import * as bookService from "../services/bookService.js";

export const createBook= async (req, res)=>{
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(err.status || 500).json({error: err.message});
  }
};

export const getAllBooks= async (req, res)=>{
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const getBookById= async (req, res) =>{
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(err.status || 500).json({error: err.message});
  }
};

export const updateBook = async (req, res)=> {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json(book);
  } catch (err) {
    res.status(err.status || 500).json({error: err.message});
  }
};

export const deleteBook= async (req, res)=>{
  try {
    const book = await bookService.deleteBook(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(err.status || 500).json({error: err.message});
  }
};