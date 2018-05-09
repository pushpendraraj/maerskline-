var express = require('express');
var router = express.Router();
var Shipping = require('../model/shippingModel');
var transporter = require('../email');

router.get('/list-shipping', function (req, res, next) {
    Shipping.getShippingList('1', function(err, result){
        if(err) return next(err);
        let shipData = result;
        res.send(shipData);
    });
});

router.post('/contact-us', function (req, res, next) {
    let message = `Hello Admin User, <br>
            We got a following request :<br>
            Name: ${req.body.contactName}. <br>
            Email: ${req.body.contactEmail}. <br>
            Phone: ${req.body.contactNumber}. <br>
            Message: ${req.body.contactMessage}. <br>
            `;

    let mailOptions = {
        from: ' "Pushpendra Rajput" <rajput.pushpendra62@gmail.com>', // sender address
        to: 'rajput.pushpendra62@gmail.com', // list of receivers
        subject: 'Contact Form Request', // Subject line
        html: message // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return next(error);
        res.send({send:true,Message:'<srong>Thank You ! </strong> your request has been submitted successfully, will contact you soon.'});
    }); 
});

module.exports = router;