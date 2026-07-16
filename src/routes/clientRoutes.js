const express = require('express')
const router = express.Router()

const clientController = require('../controllers/clientController')

router.post('/clients', clientController.registerClient)
router.get('/clients', clientController.listClients)
router.get('/clients/count', clientController.getClientCount);

module.exports = router