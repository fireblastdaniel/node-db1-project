const express = require('express');

const db = require('../data/dbConfig.js');

const server = express();
server.use(express.json());

//working
server.get('/api/accounts', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error' });
    });
});

//working
server.get('/api/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      account
        ? res.status(200).json({ data: account })
        : res.status(404).json({ message: 'Account not found' });
    })
    .catch(error => res.status(500).json({ message: 'There was an error' }));
});

server.post('/', (req, res) => {});

server.put('/:id', (req, res) => {});

server.delete('/:id', (req, res) => {});

module.exports = server;
