const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const User = require('./models/userModel');
const Product = require('./models/productModel');


const mongoose = require('mongoose');



app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.set('views')
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) =>{
    res.render('about');
});

app.post('/register', async(req, res) => {
    


     try {
         const user = await User.create(req.body)

         res.json(user)

    }catch(err){
        console.log(err)
    }   
})

app.post('/product', async(req, res)=> {

    res.send('I got your request,Thank You. ')

    try{
        const user = await Product.create(req.body)

        
    }catch(err){
        console.log(err)
    }
})

app.get('/login', async(req, res)  => {


    const email = req.body.email 
    const password = req.body.password
//   const { email, password } = req.body

  const logUsers = await User.find(  {email: email } )

  res.json(logUsers)
})

// Database connection

const dbURI = 'mongodb+srv://minukiweerarathne:omqlLROR6CRYOtjg@cluster0.clysmqu.mongodb.net/coding?retryWrites=true&w=majority';

// mongoose.connect(db_link)
 mongoose.connect(dbURI)
.then((result) => {
    console.log('Database connected :)')
})


.catch((err)=>{
 console.log(err)
})

app.listen(3000, () => {
    console.log("Your app is running ...")
});