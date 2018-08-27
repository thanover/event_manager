const express = require('express');
const router = express.Router();

const eventsModule = require('./eventsModule');
const userModule = require('./userModule');


    
router.get('/', (req, res, next) => {
    res.redirect('/events');
});

router.get('/events', eventsModule.displayEvents);

router.get('/add_event', eventsModule.addEvent);

router.get('/users', userModule.displayUsers);

router.post('/add_event', eventsModule.saveEvent);

router.get('/delete_event/:id', eventsModule.deleteEvent);

router.get('/event_details/:id', eventsModule.displayEventDetails);

router.get('/delete_user/:id', userModule.deleteUser);

router.post('/add_user', userModule.addUser);

module.exports = router;