const connection = require('../connections/connection');

const count =()=>{
    const courseOptions = req.params.courseOptions;
    const query = 'SELECT COUNT(*) as count FROM studentdetails WHERE domain = ?';

    connection.query(query, [courseOptions], (err, rows) => {
        if (!err) {
            const count = rows[0].count; // Extract the count from the query result
            res.status(200).send({ count: count }); // Send the count as a JSON response
        } else {
            res.status(500).send('Internal server error...');
        }
   });
}

const students = (req,res)=> {
    const course = req.params.course;
    connection.query('SELECT * FROM studentdetails WHERE domain = ?', [course], (err, rows) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
      } else {
        res.status(200).json(rows);
      }
    });
}

const versions = (req,res)=> {
    connection.query('SELECT * FROM oldtable',((err,rows)=>{
        if(!err){
            res.status(200).send(rows)
        }
        else{
            res.status(500).send('internal server error');
            console.log(err)
      }
}))

}

const deleteolddata = (req,res)=> {
    const stdid = req.params.stdId;   
    connection.query('DELETE FROM `oldtable` WHERE `std_id` = ?',[stdid],(err, result) => {
        if (!err) {
          if (result.affectedRows > 0) {
            res.status(200).send('Folder deleted successfully');
          } else {
            res.status(404).send('Folder not found');
          }
        } else {
          console.error('Error deleting folder:', err);
          res.status(500).send('Internal server error');
        }
      }
    );
}

const deletenewdata = (req,res)=> {
    const stdid = req.params.stdId; // Get stdId from request parameters
    connection.query('DELETE FROM `studentdetails` WHERE `std_id` = ?', [stdid], (err, result) => {
      if (!err) {
        if (result.affectedRows > 0) {
          res.status(200).send('Row deleted successfully');
        } else {
          res.status(404).send('Student not found');
        }
      } else {
        res.status(500).send('Internal server error');
      }
    });  
}

module.exports = {count,students,versions,deleteolddata,deletenewdata}