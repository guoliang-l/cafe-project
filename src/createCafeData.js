/*const express = require('express');
const { Client } = require('pg');
const uuid = require('uuid');
const app = express();*/

import express from 'express';
import Client from 'pg';


const client = Client({
  connectionString: 'postgres://username:password@localhost/dbname'
});

client.connect();

app.use(express.json());

// Create new café
app.post('/cafePage', async (req, res) => {
  const { name, description, logo, location } = req.body;
  const newCafeId = uuid.v4();
  const result = await client.query(
    'INSERT INTO cafes (id, name, description, logo, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [newCafeId, name, description, logo, location]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/cafePage', async (req, res) => {
  const { id, ...rest } = req.body;
  await Cafe.update(rest, { where: { id } });
  res.json({ message: 'Cafe updated' });
});

// End point for DELETE cafe
app.del('/cafePage', async (req, res) => {
  const { id } = req.query;
  await Cafe.destroy({ where: { id } });
  res.json({ message: 'Cafe deleted' });
});


app.listen(3000, () => console.log('Server is running on port 3000'));
