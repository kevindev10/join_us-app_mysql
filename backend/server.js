
const express = require('express')
const dotenv= require('dotenv').config()
const {faker} = require('@faker-js/faker')
const knex = require('knex')
const mysql = require('mysql2');
const cors = require('cors')



const PORT = process.env.PORT  || 8000
const app = express()
app.use(cors())
 app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const db = knex({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'qwerty123',
    database : 'join_us'
  }
});





app.get('/', (req, res) =>{
   res.status(200).json({msg : 'Welcome to the join us app backend'})
})


app.get('/count', (req, res) =>{
   db('users').count('* as COUNT').then(data => {
    countArray = data[0]
    res.status(200).json({countArray})
  })
    
})



app.post('/user', (req, res) =>{
   
    db('users')
    .insert(req.body) 
    .onConflict('email')
    .ignore()
    .then(data =>{
       db('users').count('* as COUNT').then(data => {
          countArray = data[0]
          res.status(200).json({countArray})
        })
   
    }) 

})


 
  
  














// const createRandomUser = () =>{
//   let user = {
    
//     email: faker.internet.email(),
//     created_at: faker.date.past(),

//   }

//   return user
// }





//  let usersFaker = [];

//  Array.from({ length:500 }).forEach(() => {
//   usersFaker.push(createRandomUser());
  
//  });



//  console.log( usersFaker )






// db.select('*')
//   .from('users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err)) 

 



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))