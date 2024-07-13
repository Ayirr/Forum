const express=require("express");
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const path=require("path")
require('dotenv').config();
const auth=require('./middleware/auth');
const protected=require('./middleware/protected');

mongoose.connect(process.env.MONGODB_KEY);

mongoose.connection.on('connected',()=> console.log('connected to MongoDB'));



// mongoose.connect(process.env.MONGODB_KEY)
//     .then(() => console.log('connected to MongoDB'))
//     .catch((error) => console.error('Error connecting to MongoDB:', error));

const app=express();
app.use(bodyParser.json())
app.use(auth);

app.use(express.static(path.join(__dirname,"..","client/build")));

app.use('/api/user',require('./controllers/user'));
app.use('/api/category',protected,require('./controllers/category'));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","client/build/index.html"))
})

app.listen(5000,()=>{
    console.log(`server started on port 5000`)
})