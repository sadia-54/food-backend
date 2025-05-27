const userModal = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userModel = require('../models/userModel.js');


// login user
const loginUser = async (req, res) => {

    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials!"})
        }

        const token = createToken(user._id)
        res.json({success: true, token})


    } catch (error){
        console.log(error)
        return res.json({success: false, message: "Error"})
    }   

}

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body

    try{
    // checking user already exists
    const userExists = await userModel.findOne({email})
    if(userExists){
        return res.json({success: false, message: "User already exists"})
    }

    // validating email format and strong password
    if(!validator.isEmail(email)){
        return res.json({success: false, message: "Please enter a valid email"})
    }

    if(password.length < 8){
        return res.json({success: false, message: "Password must be strong, at least 8 characters"})
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success: true, token})

} catch (error){
    console.log(error)
    return res.json({success: false, message: "Error"})
}

}

module.exports = { loginUser, registerUser }