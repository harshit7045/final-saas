import bcrypt from "bcrypt";
import userModel from "./userModel.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;


const userController = {
  createUser: async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        email: email,
        password: hashedPassword,
        name: name,
        walletBalance: 100,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  signinUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = sign({user:user.email},process.env.SECRET_KEY ,{expiresIn:"7d"});
      return res.cookie('tokenjwt', token, { httpOnly: false, secure: false, sameSite:'none' }).status(200).send({message:"Login Success",user:user, token:token});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }   
  },
  getUser: async (req, res) => {
    const email = req.user.user;
    try {
      const user = await userModel.findOne({ email: email });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateWalletBalance: async (req, res) => {
    const amount = req.body.amount/200;
    const email = req.user.user;
    try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      user.walletBalance += amount;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deductBalence: async (req, res, next) => {
    const amount = 5;
    const email = req.user.user;

    try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if ((user.walletBalance - amount) < 0) {
        return res.status(400).json({ error: "Insufficient Balance" });
      }

      user.walletBalance -= amount;
      await user.save();
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

export default userController;
