const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}))


//mongoose_SCHEMA
let nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});
let User = mongoose.model("User", nameSchema);


//MONGO_CONNECTION
mongoose.Promise = global.Promise;
let con = mongoose.connect("mongodb://mongo:27017/node-demo");

//POST   INSERT DATA
app.post("/api/user", (req, res) => {
  let myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("is sending");
    })
    .catch(err => {
      res.status(400).send("is not sending");
    });
});


//GET    DATA FROM DB
app.get('/api/user',(req,res)=> {
  User.find((err,data) =>{
    res.send(data);
  });
});

app.get('/',(req,res) => {
  res.send('Docker is running');
});

app.listen(3000,()=>console.log('server is running'));
