const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function create(req, res, next) {
    try {
        const takenUser = await User.findOne({username: req.body.username})
        if(takenUser) {
            res.status(400).json("username already exists")
        } else {
            const user = await User.create(req.body)
            const token = createJWT({ 
                name: user.name,
                username: user.username,
                password: user.password,
                _id: user._id,
                lastLogin: user.lastLogin
            })
            res.json(token)
        }
    } catch (error) {
        res.status(400).json("unable to process request")
    }
}

async function logIn(req, res, next) {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user){
            res.status(422).json("username or password is incorrect")
            return
        }
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.json(createJWT({ 
                name: user.name,
                username: user.username,
                password: user.password,
                _id: user._id,
                lastLogin: user.lastLogin
            }))
        } else {
            res.status(422).json("username or password is incorrect")
            return
        }
    } catch (error) {
        res.status(422).json("unable to process request")
        throw error
    }
}

function checkToken(req, res) {
    res.json(req.exp)
}

module.exports = {
    create,
    logIn,
    checkToken
}
