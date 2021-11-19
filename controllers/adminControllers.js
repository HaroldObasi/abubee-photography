const User = require('../models/user')
const bcrypt = require('bcrypt')
const { signupValidator, signinValidator } = require('../validators')
const jwt = require('jsonwebtoken')

const signup = async(req, res) => {

    //getting validation object from the validator
    const validation = signupValidator(req.body)

    //returns error code if there is an error in validation
    if(validation.error){
        var errorMesssage = validation.error.details[0].message
        return res.send(errorMesssage)
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(hashedPassword)

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    //could replace Users.find(), with users.findOne()
    const existingUser = await User.find({ email: req.body.email })
    if (existingUser[0]){
        return res.status(400).send('Email already exists')
    }

    try{
        const user = await newUser.save();
        res.send(user)
    }

    catch(err){
        res.json(err)
    }
}

const signin = async(req, res) => {
    //getting validation object from the validator
    const validation = signinValidator(req.body)

    //returns error code if there is an error in validation
    if(validation.error){
        var errorMesssage = validation.error.details[0].message
        return res.status(400).send(errorMesssage)
    }

    // fetch user from database, Could combine the password checker with the email checker
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        return res.send("Email or Password is wrong")
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        return res.status(400).send("Password is wrong")
    }
    console.log("successful login")
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
    // res.cookie('auth', token, 
    //             {expires: new Date(Date.now() + 8 * 3600000)}
    //     )
    //     .send(user)
    // localStorage.setItem('auth', token)
    res.status(200).send({user: user || 'bland', token: token})
    
}

const signout = async() => {
    localStorage.removeItem('auth-token')
    res.send("success")
}


module.exports = {
    signup, signin, signout
}