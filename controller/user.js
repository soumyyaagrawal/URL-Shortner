const { v4: uuidv4 } = require('uuid');
const User= require('../model/user');
const url = require('../model/url');
const {setSession} = require('../Service/auth');

async function signup(req, res) {
    const {name, email, password}= req.body;    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    await User.create({
        name,
        email,
        password,
    })
    res.render("login");
}

async function login(req, res) {
    const { email, password}= req.body;    
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const user= await User.findOne({
       
        email,
        password,
    })

    if (!user) {
        return res.status(400).render("login", { error: 'Invalid credentials' });
    } else {
        // const sessionId = uuidv4();
        const token= setSession(user);
         res.cookie('sessionId', token);
        // return res.json({token})
        const cookievalue= req.cookies.sessionId;
        const allurl = await url.find({createdBy: req.user.id}); 

      
        return res.status(200).render("home",{userid:cookievalue, uid:allurl});}


    }




module.exports = {
    signup, login
};