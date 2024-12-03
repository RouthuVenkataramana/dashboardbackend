const connection = require('../connections/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');




const signup = (req, res) => {
    var password=req.body.password;
   connection.query('SELECT *  FROM `signup` WHERE email="'+req.body.email+'"',(err,row)=>{
    if(!err && row.length>0 ){ 
        res.status(409).send('email already existed');
    }
    else if(err){
        res.status(500).send('internal server error');
        console.log(err)
    }
    else{                
      bcrypt.genSalt(10,(err,salt)=>{
          if(err){
              res.status(500).send('Internal server error');
              console.log(err)
          }
          else{
               bcrypt.hash(password,salt,(err,hassedpasword)=>{
                  if(err){
                      res.status(500).send('Internal server error');
                      console.log(err) 
                  }
                  else{
                      connection.query('INSERT INTO `signup`(name,email,password,role) values("'+req.body.username+'","'+req.body.email+'","'+hassedpasword+'","'+req.body.role+'")',(err,row)=>{
                          if(!err){
                              res.status(200).send(row);
                          }
                          else{
                              res.status(500).send('Interal server Error...');
                              console.log(err)
                          }
                  })
                  }
               })
          }
      })    
    } 
   })
  }



// Login Controller
const login = (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM `signup` WHERE email = ?', [email], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (rows.length > 0) {
            const user = rows[0];
            // Check password
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    process.env.JWT_SECRET || "Hippocloud_wellcome",
                    { expiresIn: '5d' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production', // Only secure in production
                });

                return res.json({ loginStatus: true, token });
            }

            return res.status(401).json({ message: 'Invalid Password' });
        }

        return res.status(401).json({ message: 'Invalid Email' });
    });
};




// Protected Route Controller
const protectedroute = (req, res) => {
    res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
};


module.exports = { login, signup, protectedroute};
