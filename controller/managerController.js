const connection = require('../connections/connection');


const domains = (req,res)=>{
    const query = 'SELECT courses AS domain FROM coursesdetails'; // Selecting 'courses' but aliasing it as 'domain'
      
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching domains:', err);
        return res.status(500).send('Error fetching domains');
      }
      
      // Returning an array of domain names
      res.status(200).json(results);
    });
}

const trainers = (req,res)=> {
    connection.query('insert into `trainer` (trainerid,trainer,trainer_email,trainer_contact,gender,domain,about,bloodgroup) values ("'+req.body.trainerid+'","'+req.body.name+'","'+req.body.email+'","'+req.body.contact+'","'+req.body.gender+'","'+req.body.domain+'","'+req.body.about+'","'+req.body.group+'")',(err,row)=>{
        if(!err){
            res.status(200).send(row);
            console.log(res.trainer);
           }
           else if(err){
               res.status(500).send('internal server error');
               console.log(err)
           } 
    })
}

const enquiry = (req,res)=> {
    const { name,email, contact, whatsapp, gender, domain, purpose, date, reference, location } = req.body;

    const query = 'INSERT INTO enquiry (name,email, contact, whatsapp, gender, domain, purpose, expected_join_date, reference, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
   
    connection.query(query, [name, email,contact, whatsapp, gender, domain, purpose, date, reference, location], (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        console.error(err);
        res.status(500).send('Internal server error');
      }
    });
}

const gettrainers = (req,res)=> {
    const domain = req.params.domain;
    console.log(domain)
    const query = 'SELECT DISTINCT trainer AS label,trainer AS value FROM trainer WHERE domain = ?';

    connection.query(query, [domain], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                // Extract names from the rows and send as an array
                const names = rows.map(row =>({label:row.label,value:row.label}));
                res.status(200).send(names);
            } else {
                res.status(404).send('User not found');
            }
        } else {
            console.error(err);
            res.status(500).send('Internal server error');
        }
      });
}

const student = (req,res)=> {
    const { stdid, name, email, contact, gender, trainer, totalfee, paidfee, balancefee, duedate, schedule, reference, branch, domain } = req.body;
  const joinDate = new Date().toISOString().split('/')[0];

  const query = `
    INSERT INTO studentdetails
    (std_id, std_name, std_email, std_contact, gender, trainer, total_fee, paid_fee, balance_fee, due_date, join_date, schedule, reference, branch, domain)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [stdid, name, email, contact, gender, trainer, totalfee, paidfee, balancefee, duedate, joinDate, schedule, reference, branch, domain], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).json({ message: 'Student added successfully', student: result });
    }
  });
}

const trainerlist = (req,res)=> {
    const query = 'SELECT COUNT(*) AS count FROM trainer';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching trainer count:', error);
      return res.status(500).json({ error: 'Error fetching trainer count' });
    }
    res.json({ count: results[0].count });
  });
}

const enquirylist = (req,res)=> {
    const query = 'SELECT COUNT(*) AS count FROM enquiry';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching enquiry count:', error);
      return res.status(500).json({ error: 'Error fetching enquiry count' });
    }
    res.json({ count: results[0].count });
  });
}

const traineeslist = (req,res)=> {
    const query = 'SELECT COUNT(*) AS count FROM studentdetails';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching trainees count:', error);
      return res.status(500).json({ error: 'Error fetching trainees count' });
    }
    res.json({ count: results[0].count });
  });
}

module.exports = {domains,trainers,enquiry,gettrainers,student,trainerlist,enquirylist,traineeslist}