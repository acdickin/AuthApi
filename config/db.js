var db = require('mongoose');

db.connect('mongodb://test:Cloudy88!@ds115752.mlab.com:15752/workout');

module.exports=db;
