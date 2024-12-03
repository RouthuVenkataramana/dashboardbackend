const connection = require('../connections/connection')

const clientadd = (req,res)=> {
    console.log(req.body);
  connection.query('insert into `marketing`(name,email,number,website,amount,renewal,services) values("'+req.body.name+'","'+req.body.email+'","'+req.body.number+'","'+req.body.website+'","'+req.body.amount+'","'+req.body.renewal+'","'+req.body.services+'")',(err,result)=>{
    if(!err){
      res.status(200).send(result);
    } else{
      res.status(500).send('internal server error')
    }
  })
    connection.query('')
}

const getservices = ()=> {
    const service=req.params.serviced;
  connection.query('select from marketing where `services`=?',[service],(err,results)=>{
    if(!err){
      res.status(200).send(results);
    } else{
      res.status(500).send('internal server error');
    }
  })
}

module.exports = {clientadd,getservices}