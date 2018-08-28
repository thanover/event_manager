const Event = require('../models/event').eventModel;
const User = require('../models/user').userModel;

const displayEvents = (req, res, next) => {
    Event.find()
        .populate('Owner')
        .exec((err, events) => {
            if (err) {
                console.log(err)
            }
            res.render(
                'events',
                {
                    title: 'events',
                    events
                }
            );

        });
};

const addEvent = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err)
            console.log("Error Selecting : %s ", err);
        if (!users)
            return res.render('404');

        res.render(
            'add_event',
            {
                users
            }
        );
    });
}

const saveEvent = (req, res, next) => {
    let event = new Event();
    event.Title = req.body.Title;
    event.Date = req.body.Date;
    event.Description = req.body.Description;
    event.Owner = global.user._id;
    console.trace(req.body.invitees);
    let invitees = req.body.invitees;

    invitees.forEach(invitee => {
        event.Invites.invited.push(invitee);
    });

    event.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/events');
        }
    })
}

const deleteEvent = (req, res, next) => {
    let id = req.params.id;

    Event.findById(id, (err, event) => {
        if (err)
            console.log("Error Selecting : %s ", err);
        if (!event)
            return res.render('404');


        event.remove((err) => {
            if (err)
                console.log("Error deleting : %s ", err);
            res.redirect('/events');
        });
    });
}

const displayEventDetails = (req, res, next) => {
    let id = req.params.id;

    Event.findById(id)
        .populate('Owner')
        .exec((err, event) => {
            var tmpEvent = event.toObject();
            var tmpInvitees = [];
            var invitees = tmpEvent.Invites.invited;
            console.trace(invitees);
            invitees.forEach(invitee => {
                User.findById(invitee, (err, invitee) => {
                    tmpInvitees.push(invitee);
                });
            });
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!event)
                return res.render('404');
            // console.trace(event);
            res.render('event_details',
                {
                    event,
                    invitees: tmpInvitees
                }
            );

        });
};

module.exports = {
    displayEvents,
    addEvent,
    saveEvent,
    deleteEvent,
    displayEventDetails
};