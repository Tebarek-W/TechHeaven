const userModel = require("../models/userModels")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
try{
const {email, password, name} = req.body

const user = await userModel.findOne({email})

console.log("user",user)

if(user){
  throw new Error("Already user exists.")
}

if(!email){
  throw new error("please provide email")
}

if(!password){
  throw new error("please provide password")
}

if(!name){
  throw new error("please provide name")
}

const salt = bcrypt.genSaltSync(10);
const hashPassword = await bcrypt.hashSync(password, salt);

if(!hashPassword){
  throw new error("something is wrong")
}

const payload = {
  ...req.body,
  role : "GENERAL",
  password : hashPassword
}

const userData = new userModel(payload)
const saveUser = await userData.save()

res.status(201).json({
  data : saveUser,
  success : true,
  error : false,
  message : "User Created Succesfully!" 
})

}catch(err){
  res.json({
    message : err.message || err,
    error : true,
    success : false,
  })

}
}
module.exports = userSignUpController