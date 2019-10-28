//import services you need into server 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const URL = require('./models/Urls');

 
//initialize express
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Database key
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect  = require('./routes/api/redirect');
app.use('/api/redirect', redirect);

app.get('/:hash', (req,res) =>{
    const id = req.params.hash;
    
    console.log(id);
    URL.findOne({_id:id}, (err,doc) =>{
        if (doc) {
            console.log(doc.url);
            res.redirect(doc.url);
        } else{
            console.log(err);
        }
    })
});

app.get('/', (req,res) =>{
    res.send('Hello World');
})
//set port number we will use
const port = process.env.Port || 5000;

app.listen(port, () => console.log('Server is running on port ' + port));