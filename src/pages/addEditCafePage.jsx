import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const addEditCafePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch café data for editing
      axios.get(`/api/cafes/${id}`)
        .then(response => {
          const cafe = response.data;
          setName(cafe.name);
          setDescription(cafe.description);
          setLocation(cafe.location);
        })
        .catch(error => console.error('Error fetching café details:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    if (logo) formData.append('logo', logo);

    const url = id ? `/api/cafes/${id}` : '/api/cafes';
    const method = id ? 'put' : 'post';

    axios({ method, url, data: formData })
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving café:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
        <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button onClick={() => navigate('/')} variant="contained" color="secondary">Cancel</Button>
      </form>
    </div>
  );
};

export default addEditCafePage;
