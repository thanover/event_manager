const express = require('express');
const handlebarsExpress = require('express-handlebars');
const bodyParser = require('body-parser');
const User = require('./models/user').userModel;
const userModule = require('./routes/userModule');
const handlebarsHelpers = require('./views/helpers/helpers');

// create the express app
const app = express()


// to parse request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static resources
app.use(express.static(__dirname + '/public'));

var handlebarsObj = handlebarsExpress.create({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: handlebarsHelpers
})

//setup handlebars view engine
app.engine('handlebars', handlebarsObj.engine);

app.set('view engine', 'handlebars');

var routes = require('./routes/index');

// // handles if there is no user signed-in yet
// global.user = {
//     "_id": {
//         "$oid": "5b817c2ae7179a43f9ac854e"
//     },
//     "firstName": "Robert",
//     "lastName": "Smith",
//     "email": "rsmith@gmail.com",
//     "type": "admin"
// };
global.user = {firstName: ''}

app.post('/set_user', userModule.setUser);

app.get('/reset_user', (req, res) => {
    global.user = {firstName: ''};
    res.redirect('/events');    
});

app.use(function(req, res, next) {
    if (global.user.firstName == ''){
        User.find({}, (err, users)=>{
            if(err){
                console.log(err)
            }
            res.render('get_user', {users : users});
        });
    } else{
        next();
    }
});

// general routing
app.use('/', routes);


app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
    console.log('Example app listening http://localhost:3000');
});