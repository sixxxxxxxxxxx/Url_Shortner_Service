const express = require('express');
const router = express.Router();



router.get('/test', (req,res) => res.json({msg: 'Api is working'}));





router.get('/', (req,res) =>{
    const hash = req.headers.hash;

    URL.findOne({ _id: hash })
        .then((doc)=>{
            return res.json({url:doc.url})
        })
        .catch((err) => {
            return res.status(400).json({ error: 'sorry this link may have expired'});
        })
});

module.exports = router;