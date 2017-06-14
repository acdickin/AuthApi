var router = require('express').Router();
var Definition =('../models/definition');

router.get('/'(req,res)=>{
  Definition.find({owner:req.user}).then((definition)=>{
    res.json(definition)
  })
})

//add def
router.post('/', (req,res)=>{
  var def = new Definition({
    owner:req.user,
    logType:req.body.definition.type,
    description:req.body.definition.description
  })

  def.save().then((definition)=>{
    res.json({
      message:'saved',
      definition:definition
    })
  })
})
//udpate def
router.put('/:id',(req,res)=>{
  Definition.findOne({_id:req.params.id, owner:req.user})
  .then((definition)=>{
    definition.logType=req.body.definition.type;
    definition.description:req.body.definition.description;

    definition.save().then(()=>{
      res.json({
        message:'updated',
        definition:definition
      })
    })
  })
})

router.delete('/:id', (req,res)=>{
  Definition.findOne({_id:req.params.id, owner:req.user}).
  .then((definition)=>{
    definition.remove().then(()=>{
      message:'deleted',
      definition:definition
    })
  })
})


module.exports=router;
