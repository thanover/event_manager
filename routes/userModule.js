const User = require('../models/user').userModel;

const setUser = (req, res, next) => {
    let id = req.body.userID;
    User.findById(id, (err, user) => {
        if (err)
            console.log("Error Selecting : %s ", err);
        if (!user)
            return res.render('404');

        global.user = user;
        res.redirect('/events');
    });
};

const displayUsers = (req, res, next) => {    
    User.find({}, (err, users) => {
        if(err){
            console.log(err);
        }
        res.render(
            'users', 
            {
                users
            }
        );

    });
};

const deleteUser = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, event) => {
        if (err)
            console.log("Error Selecting : %s ", err);
        if (!event)
            return res.render('404');


            event.remove((err) => {
            if (err)
                console.log("Error deleting : %s ", err);
            res.redirect('/users');
        });
    });
}

const addUser = (req, res, next) => {
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.type = req.body.type;

    user.save( (err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/users');
        }
    })
}

module.exports = {
    setUser,
    displayUsers,
    deleteUser,
    addUser
};