const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURI = "mongodb+srv://sriharireddyp0143:sriharireddyp0143@selvi.elcsqcl.mongodb.net/"
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({origin:'*'}))
 

const userRoutes = require('./src/Routes/Register');
// app.use('/', (req,res)=>{
//     res.send('Welcome to nodeJS ..!');
// });
app.use('', userRoutes);

const port = 3000;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.listen(port, ()=> console.log(`App listening on port ${port}!`))

mongoose.connect(mongoURI, connectionParams).then(() => {
    console.log('Mongoose connected to db')
}).catch((err) => console.error('Failed to connect to MongoDB', err));


// mongoose.connection.on('connected', ()=>{
//     console.log('Mongoose connected to db')
// });

// mongoose.connection.on('disconnected',()=>{
// console.log('Mongoose connection is disconnected.')
// });

// mongoose.connection.on('error',(err)=>{
//   console.log(err.message)
// });
