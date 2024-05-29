import User from '../models/userModel.js';
import { signup } from '../models/userModel.js';
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }


// login a user
export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
};

// signup a user
export const signupUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
      const user = await User.signup(name, email, password)
      const token = createToken(user._id)

      res.status(200).json({name: user.name, email: user.email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
};
