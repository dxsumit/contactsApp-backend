const JWT = require('jsonwebtoken');
const {TOKEN_salt} = process.env 

const authorize = (req, res, next) => {

    // console.log(req.headers.authToken);
    const token = req.header('x-auth-token') || req.body.token || req.query.token;

    let myArray = token.split(" ");
    const myToken = myArray.pop();
    // console.log(myToken);
    
    if(!token) 
        return res.status(403).json({"Error": "Invalid User, token not found."});
    
    try{

        let user = JWT.verify(myToken, TOKEN_salt);
        console.log(user);
        next();
    }
    catch(error){
        return res.status(200).json({"Error": "Invalid User.. wrong token"});
    }

}

module.exports = authorize;


// token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVGhpcyBpcyB1c2VyIHh5ekBnbWFpbC5jb20iLCJpYXQiOjE2Nzc4NDE3NDYsImV4cCI6MTY3Nzg0NTM0Nn0.DcZo05JhEtyppRn1U3LAoWt83dZA5QpdRJ5mglILYPI

// "email":"xyz@gmail.com",
// "password": "johndoe123"



