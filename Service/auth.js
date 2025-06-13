// const sessionidtousermap = new Map();
const jwt= require('jsonwebtoken');
const secret= "soumya12";

function getSession(token) {
    if (!token ) return null;
 return jwt.verify(token, secret);
}

function setSession(user) {
 return jwt.sign({id: user.id,
    name: user.name,
    email: user.email,
    createdby: user.createdby
  
 }, secret);
}

module.exports = {
 getSession,
 setSession,
};
