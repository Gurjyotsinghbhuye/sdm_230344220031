const express = require('express');
const mysql = require('mysql');

// Create connection pool
const app = express();
app.use(express.json());
const connection = mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'cars'
  });



// GET - Display all employees using e_name
app.get('/Employee_Tb', (req, res) => {
    const { e_name } = req.query;
    const query = `SELECT * FROM Employee_Tb`;
    
    connection.query(query, [e_name], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
   
  // POST - Add employee data into MySQL table
  app.post('/Employee_Tb', (req, res) => {
    const {  e_name, password, emp_id, dname, doj } = req.body;
    const query = `INSERT INTO Employee_Tb (e_name, password, emp_id, dname, doj) VALUES ( ?,?, ?, ?, ?)`;
  
    connection.query(query, [ e_name, password, emp_id, dname, doj], (error, results) => {
      if (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Failed to add employee' });
      } else {
        res.json({ message: 'Employee added successfully' });
      }
    });
  });
  
  // DELETE - Delete employee from table by id
app.delete('/Employee_Tb/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Employee_Tb WHERE id = ?';
  
    connection.query(query, [id], (error, result) => {
      if (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
      } else {
        res.send('Employee deleted successfully!');
      }
    });
  });
  
  
  // PUT - Update dname and doj
  // PUT - Update employee dname and doj by emp_id
app.put('/Employee_Tb/:emp_id', (req, res) => {
    const { emp_id } = req.params;
    const { dname, doj } = req.body;
    const query = 'UPDATE Employee_Tb SET dname = ?, doj = ? WHERE emp_id = ?';
  
    connection.query(query, [dname, doj, emp_id], (error, result) => {
      if (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
      } else {
        res.send('Employee updated successfully!');
      }
    });
  });
  
  

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

