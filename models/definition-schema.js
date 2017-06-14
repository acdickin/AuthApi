var db = require('../config/db');

var DefinitionSchema = db.Schema({
  logType:String,
  description:String,
  owner:{type:db.Schema.Types.ObjectID, ref:'user'}
})

module.exports= DefinitionSchema
