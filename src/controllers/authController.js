import * as authService from "../services/authService.js";

export const signup = async (req, res) => {
  try{
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (err){
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try{
    const token= await authService.login(req.body);
    res.status(200).json(token);
  } catch (err){
    res.status(err.status || 500).json({ error: err.message });
  }
};