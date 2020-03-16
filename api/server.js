const express = require('express');

const db = require('../data/dbConfig.js');

const server = express();
server.use(express.json());

//working
server.get('/api/accounts', (req, res) => {
  const limit = req.query.limit || 20;
  const sortby = req.query.sortby || 'id';
  const sortdir = req.query.sortdir || 'asc';

  db.select('*')
    .from('accounts')
    .orderBy(sortby, sortdir)
    .limit(limit)
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

//working
server.post('/api/accounts', (req, res) => {
  db('accounts')
    .insert(req.body, 'id')
    .then(ids => {
      res.status(201).json({ results: ids });
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error' });
    });
});

//working
server.put('/api/accounts/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'record updated successfully' });
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error' });
    });
});

//working
server.delete('/api/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'record deleted successfully' });
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error' });
    });
});

module.exports = server;
