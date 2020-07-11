const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    let contact = req.body
    console.log(contact)
    let smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        auth:{
            user:'bleeperan@gmail.com',
            pass:'bleep1234'
          
        }
    });
    let mailOptions={
        from:`${contact.email}`,
        to: `eranpri21@gmail.com`,
        subject:`Message from ${contact.name}`,
        html:`
        <h3>${contact.subject}</h3>
        <div>${contact.text}</div>
           
        `
    };

    smtpTransport.sendMail(mailOptions, (error,response)=>{
        if (error){
            res.send(error)
        }else{
            res.send('success')
        }
    })

    smtpTransport.close();
})

let port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('we are on', port)
})