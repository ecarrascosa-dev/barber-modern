const express = require('express')
const router = express.Router()

const clientController = require('../controllers/clientController')

router.post('/clients', clientController.registerClient)
router.get('/clients', clientController.listClients)
router.delete('/clients/:id', clientController.deleteClient)
router.patch('/clients/edit/:id', clientController.editClient)
router.get('/clients/count', clientController.getClientCount)

module.exports = router