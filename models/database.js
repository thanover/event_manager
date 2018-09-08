const mongoose = require('mongoose');
var dbUrl = "mongodb://tom:password123@ds233452.mlab.com:33452/eventmanager_tomh";

const db = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
db.once('open', () => {
    console.log('connected to mongodb')
})
db.on('error', (err) => {
    console.trace(err);
})

module.exports = {
    db
};

// conneting to mongo shell:
// mongo "mongodb+srv://hanover-db-jtfmg.gcp.mongodb.net/test" --username admin_tom


// adding user:
// db.users.insertMany([ { "firstName": "Robert", "lastName": "Smith", "email": "rsmith@gmail.com", type:"admin" }, { "firstName": "Julia", "lastName": "Roberts", "email": "jroberts@gmail.com", "type": "user" }, { "firstName": "Brad", "lastName": "Pitt", "email": "bpitt@gmail.com", "type": "user" } ])