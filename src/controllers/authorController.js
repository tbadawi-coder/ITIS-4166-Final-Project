import * as authorService from "../services/authorService.js";

export const createAuthor=async(req,res)=>{
  try {
    const author=await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(err.status ||500).json({error: err.message});
  }
};

export const getAllAuthors= async (req,res) => {
  try{
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch(err){
    res.status(500).json({error: err.message});
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    res.status(200).json(author);
  } catch (err) {
    res.status(err.status || 500).json({error: err.message});
  }
};

export const updateAuthor= async(req, res) => {
  try{
    const author = await authorService.updateAuthor(req.params.id, req.body);
    res.status(200).json(author);
  } catch (err){
    res.status(err.status ||500).json({error: err.message});
  }
};

export const deleteAuthor= async(req, res)=>{
  try{
    const author = await authorService.deleteAuthor(req.params.id);
    res.status(200).json(author);
  } catch (err){
    res.status(err.status ||500).json({error: err.message});
  }
};