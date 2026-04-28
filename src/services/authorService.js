import * as authorRepo from "../repositories/authorRepo.js";

export const createAuthor=async (data)=>{
  if (!data.name ||!data.bio) {
    throw {status: 400, message:"Missing required fields"};
  }
  return authorRepo.createAuthor(data);
};

export const getAllAuthors= async() =>{
  return authorRepo.getAllAuthors();
};

export const getAuthorById= async(id)=>{
  const author =await authorRepo.getAuthorById(Number(id));

  if(!author){
    throw {status: 404, message: "Author not found"};
  }

  return author;
};

export const updateAuthor = async (id, data)=>{
  const existing = await authorRepo.getAuthorById(Number(id));

  if(!existing){
    throw {status: 404, message: "Author not found"};
  }

  return authorRepo.updateAuthor(Number(id),data);
};

export const deleteAuthor =async (id)=>{
  const existing = await authorRepo.getAuthorById(Number(id));

  if(!existing){
    throw {status: 404, message:"Author not found"};
  }
  return authorRepo.deleteAuthor(Number(id));
};