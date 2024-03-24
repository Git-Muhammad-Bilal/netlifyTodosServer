const Users = require('../modals/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()



exports.createUser = async (req, res) => {
    const { email, password } = req?.body
    try {
        let existingUser = await Users.findOne({ email: email })
      
    if (existingUser?.email) {
      res.send({ error: 'user already exist' })
    } else {
    
      let hashedPassword = await bcrypt.hash(password, 12);
      let newUser = await Users.create({ email, password: hashedPassword })
      let newJwtToken = jwt.sign({ ...newUser }, process.env.ACCESS_SECRET_KEY)
  
      res.send({ jwtToken: newJwtToken, email: existingUser?.email })
  
    }
  } catch (error) {
      res.status(400).send(error?.message)
    }
    
  }
  
  
  exports.getUser = async (req, res) => {
    let { email, password } = req.body;
    try {
      let curUser = await Users.findOne({ email: email })
      console.log(curUser,'asdfasdfasd', password);
      
      const matchPaasword = curUser?.password && await bcrypt.compare(password, curUser.password)
      if (!curUser) {
        return res.status(200).send({ error: 'email does not exist or email is incorrect' })
        
    }
    if (!matchPaasword) {
      return res.status(201).send({ error: 'incorrect pssword' })
      
    }

    let newJwtToken = jwt.sign({ ...curUser }, process.env.ACCESS_SECRET_KEY)
    res.status(200).send({ jwtToken: newJwtToken, email: curUser.email })

  } catch (error) {
    res.status(404).send(error?.message)
  }

}


