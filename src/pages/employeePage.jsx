import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const employeePage = () => {
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    axios.get('/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const columnDefs = [
    { headerName: 'Employee ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Days Worked', field: 'daysWorked' },
    { headerName: 'Café Name', field: 'cafeName' },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => editEmployee(params.data.id)}>Edit</Button>
          <Button variant="contained" color="secondary" onClick={() => deleteEmployee(params.data.id)}>Delete</Button>
        </>
      )
    }
  ];

  const addNewEmployee = () => {
    // Redirect to add new employee page
  };

  const editEmployee = (id) => {
    // Redirect to edit employee page
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`/api/employees/${id}`)
        .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
        .catch(error => console.error('Error deleting employee:', error));
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={addNewEmployee}>Add New Employee</Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={employees}
          pagination={true}
          domLayout='autoHeight'
        />
      </div>
    </div>
  );
};

export default employeePage;
