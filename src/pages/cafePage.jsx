// src/pages/CaféPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const cafePage = () => {
  const [cafes, setCafes] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');
  const [columnDefs] = useState([
    { headerName: 'Logo', field: 'logo', cellRenderer: (params) => <img src={params.value} alt="logo" width="50" /> },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Employees', field: 'employees', cellRenderer: (params) => <Link to={`/employees?cafeId=${params.data.id}`}>View Employees</Link> },
    { headerName: 'Location', field: 'location' },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => editCafé(params.data.id)}>Edit</Button>
          <Button variant="contained" color="secondary" onClick={() => deleteCafé(params.data.id)}>Delete</Button>
        </>
      )
    }
  ]);

  useEffect(() => {
    axios.get('/api/cafes')
      .then(response => setCafes(response.data))
      .catch(error => console.error('Error fetching cafes:', error));
  }, []);

  const filteredCafes = cafes.filter(cafe => cafe.location.includes(filterLocation));

  const addNewCafe = () => {
    // Redirect to add new café page
  };

  const editCafé = (id) => {
    // Redirect to edit café page
  };

  const deleteCafé = (id) => {
    if (window.confirm("Are you sure you want to delete this café?")) {
      axios.delete(`/api/cafes/${id}`)
        .then(() => setCafes(cafes.filter(cafe => cafe.id !== id)))
        .catch(error => console.error('Error deleting café:', error));
    }
  };

  return (
    <div>
      <TextField
        label="Filter by Location"
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addNewCafe}>Add New Café</Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={filteredCafes}
          pagination={true}
          domLayout='autoHeight'
        />
      </div>
    </div>
  );
};

export default cafePage;

