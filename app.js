import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;

app.use(express.json())

const users = [];

app.post('/register', async (req,res) => {


  try {
    const {email , password} = req.body;
    // find user
    const findUser = users.find((data) => email === data.email)
     if (findUser) {
        res.status(400).send('Wrong email or Password')
      }

      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      users.push({email, password: hashedPassword})
      console.log(users)
      res.status(201).send('Registered successfully!')
    }
     catch(err) {
        res.status(500).send({message: err.message})
     }
})

app.post('/login', async (req,res) => {

    try {
        const { email , password } = req.body;

        // find user
    const findUser = users.find((data) => email === data.email)
    if (!findUser) {
       res.status(400).send('Wrong email or Password')
     }

     const passwordMatch = await bcrypt.compare(password, findUser.password)
     if(passwordMatch) {
        res.status(200).send('Logged in Successfully')
     } else {
        res.status(400).send('Wrong email or Password')
     }
    } catch (err) {
        res.status(500).send({message: err.message})
    }

})

app.listen(port, () => {
    console.log('Started on Port 3000')
})