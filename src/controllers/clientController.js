const Client = require('../models/Client')

exports.registerClient = async (req, res) => {
    try {
        const { nameClient, phoneClient } = req.body

        const newClient = new Client({nameClient, phoneClient})
        await newClient.save()

        console.log('Saved')
        
        res.status(201).json({message: "Client Register"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "impossible register this client"})
        
    }
}

exports.listClients = async (req, res) => {
    try {
        const listClients = await Client.find()
        res.status(200).json({listClients})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "impossible list these clients"})
    }
}

exports.getClientCount = async (req, res) => {
    try {
        const count = await Client.countDocuments()
        res.status(200).json({total: count})
    } catch(error) {
        res.status(500).json({message: 'Erro ao contar clientes'})
    }
}