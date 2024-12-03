const connection = require('../connections/connection');

const coursesCount = (req,res)=> {
    const query = 'SELECT COUNT(*) AS count FROM studentdetails';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching course count:', error);
      return res.status(500).json({ error: 'Error fetching course count' });
    }
    res.json({ count: results[0].count });
  });

}

const marketingCount = (req,res)=>{
    const query = 'SELECT COUNT(*) AS count FROM marketing';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching marketing count:', error);
        return res.status(500).json({ error: 'Error fetching marketing count' });
      }
      res.json({ count: results[0].count });
    });
}

const tallyCount = (req,res)=>{
    const query = 'SELECT COUNT(*) AS count FROM employees';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching tally count:', error);
        return res.status(500).json({ error: 'Error fetching tally count' });
      }
      res.json({ count: results[0].count });
    });
}

const enquiryCount = (req,res)=>{
    const query = 'SELECT COUNT(*) AS count FROM enquiry';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching enquiry count:', error);
        return res.status(500).json({ error: 'Error fetching enquiry count' });
      }
      res.json({ count: results[0].count });
    });
}

const trainerCount = (req,res)=>{
    const query = 'SELECT COUNT(*) AS count FROM trainer';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching trainer count:', error);
      return res.status(500).json({ error: 'Error fetching trainer count' });
    }
    res.json({ count: results[0].count });
  });
}

const internCount = (req,res)=>{
    const query = 'SELECT COUNT(*) AS count FROM internship';
    connection.query(query,(err,result)=>{
      if(err){
        console.err('Error fetching internship count:',err);
        return res.status(500).json({err:'Error fetching internship projects'});
      } 
      res.json({count: result[0].count});
    })
}

const getmonths = (req,res)=>{
    const query = `
    SELECT DATE_FORMAT(join_date,'%Y-%m') AS month, COUNT(*) AS student_count 
    FROM studentdetails
    GROUP BY DATE_FORMAT(join_date,'%Y-%m')
    ORDER BY month;  
  `;
  
  connection.query(query, (err, rows) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      res.status(500).send('Internal server error');
      console.log(err);
    }
  });
}

const studentCount = (req,res)=> {
  const studentCourses = req.params.endpoint;
  const query = 'SELECT COUNT(*) as count FROM studentdetails WHERE domain = ?';
  
  connection.query(query, [studentCourses], (err, rows) => {
      if (!err) {
          const count = rows[0].count; // Extract the count from the query result
          res.status(200).send({ count: count }); // Send the count as a JSON response
      } else {
          console.error("Error executing query:", err); // Log the error for debugging
          res.status(500).send({ error: 'Internal server error', details: err.message });
      }
  });
}

module.exports = {coursesCount,marketingCount,enquiryCount,tallyCount,internCount,trainerCount,getmonths,studentCount}