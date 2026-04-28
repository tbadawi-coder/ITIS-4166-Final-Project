import * as loanService from "../services/loanService.js";

export const createLoan =async (req,res)=>{
  try {
    const loan =await loanService.createLoan(
      req.user.id,
      req.body.bookId
    );
    res.status(201).json(loan);
  }catch(err){
    res.status(err.status ||500).json({error: err.message});
  }
};

export const getAllLoans= async (req,res) =>{
  try{
    const loans= await loanService.getAllLoans();
    res.status(200).json(loans);
  }catch (err){
    res.status(500).json({ error: err.message });
  }
};

export const getLoanById = async (req, res) => {
  try{
    const loan = await loanService.getLoanById(
      req.params.id,
      req.user
    );
    res.status(200).json(loan);
  }catch (err){
    res.status(err.status ||500).json({error: err.message});
  }
};

export const returnLoan=async (req,res)=>{
  try{
    const loan = await loanService.returnLoan(req.params.id);
    res.status(200).json(loan);
  }catch (err){
    res.status(err.status || 500).json({error: err.message});
  }
};

export const deleteLoan = async (req,res)=>{
  try{
    const loan= await loanService.deleteLoan(req.params.id);
    res.status(200).json(loan);
  }catch (err){
    res.status(err.status ||500).json({error: err.message});
  }
};