const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');


const URL = require('../../models/Urls');

router.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// @route Get /api/shorten/test
//@desc Test Api end point
// @access public
router.get('/test', (req,res) => res.json({msg: 'API is working'}));


// @route Post api/shorten
// @desc Post a url to shorten
// @access public
router.post('/', (req, res) => {
    //did you get the req?
    console.log(req.body);
    if (req.body.url) {
        urlData = req.body.url
    }
    console.log('URL is: ', urlData);

    //check if url already exists
    URL.findOne({url: urlData}, (err, doc)=> {
        if (doc) {
            console.log('Entry found in database')
        } else{
            console.log('This is a new URL');
            const webaddress = new URL({
                _id: uniqid(),
                url: urlData
            })
        
            webaddress.save((err)=>{
                if (err) {
                    return console.error(err);
                }
                res.send({
                    url: urlData,
                    hash: webaddress._id,
                    status: 200,
                    statusTxt: 'OK'
                })
            })
        }
    })
});

module.exports = router;