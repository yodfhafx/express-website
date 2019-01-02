var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {title: 'welcome to my website'});
});

app.get('/about', function(req, res) {
    res.render('about', {title: 'about us'});
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.post('/contact/send', function(req, res) {
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'realgmail@gmail.com',
            pass: 'realpassword'
        }
    });

    var mailOptions = {
        from: 'somename <sender@gmail.com>',
        to: 'receivermail@gmail.com',
        subject: 'Express Website',
        text: 'Submission details... Name: '+ req.body.name +'Enail: '+ req.body.email +'Message: '+ req.body.message,
        html: '<p>Submission details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: '+ info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000);
console.log('Server run on port 3000');
