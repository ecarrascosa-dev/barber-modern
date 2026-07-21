const express = require('express');
const router = express.Router();
const path = require('path');

const publicPath = path.join(__dirname, '../../public');

router.get('/', (req, res) => {
        res.render('index')
    });

router.get('/clients', (req, res) => {
        res.render('clients')
    });

module.exports = router;