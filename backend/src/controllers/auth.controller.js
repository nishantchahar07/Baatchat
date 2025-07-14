import e from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export async function signup(req ,  res) { 
    const {fullName , email ,  password} = req.body;

  try{
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6){
       return  res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailregex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email});
    if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const idx =  Math.floor(Math.random() * 100)+1;

    const randomProfilePicture = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newUser =  await User.create({
        fullName,
        email,
        password,
        profilePicture: randomProfilePicture,
       
    });

    const token = jwt.sign({userid : newUser._id}, process.env.JWT_SECRET, {
        expiresIn: '7d'});

     res.cookie('jwt', token, {
        httpOnly: true,  // prevent xss attacks
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 7 * 24 * 60 * 60 * 1000 ,// 7 days 
        sameSite: 'strict' // prevent CSRF attacks
    });


    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });


  }
  catch(error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

   

}

export async  function login(req, res) {
  res.send("Login endpoint");
}   

export function logout(req, res) {
  res.send("Logout endpoint");
}