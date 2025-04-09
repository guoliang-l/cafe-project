import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const addEditEmployeePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [cafeId, setCafeId] = useState('');
  const [cafes, setCafes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/cafes')
      .then(response => setCafes(response.data))
      .catch(error => console.error('Error fetching cafés:', error));

    if (id) {
      axios.get(`/api/employees/${id}`)
        .then(response => {
          const emp = response.data;
          setName(emp.name);
          setEmail(emp.email);
          setPhone(emp.phone);
          setGender(emp.gender);
          setCafeId(emp.cafeId);
        })
        .catch(error => console.error('Error fetching employee:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = { name, email, phone, gender, cafeId };

    const url = id ? `/api/employees/${id}` : '/api/employees';
    const method = id ? 'put' : 'post';

    axios({ method, url, data: employeeData })
      .then(() => navigate('/employees'))
      .catch(error => console.error('Error saving employee:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <Select value={cafeId} onChange={(e) => setCafeId(e.target.value)}>
          {cafes.map(cafe => (
            <MenuItem key={cafe.id} value={cafe.id}>{cafe.name}</MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button onClick={() => navigate('/employees')} variant="contained" color="secondary">Cancel</Button>
      </form>
    </div>
  );
};

export default addEditEmployeePage;