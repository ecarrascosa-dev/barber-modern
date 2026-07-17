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

exports.editClient = async (req, res) => {
    try {
        const id = req.params.id
        const updateData = req.body

        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { $set: updateData},
            { returnDocument: 'after', runValidators: true }
        )

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' })
        }

        res.status(200).json(updatedClient)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: 'impossible edit this client'})
    }
}

exports.deleteClient = async (req, res) => {
    try {
        const id = req.params.id

        const deletado = await Client.findByIdAndDelete(id)
        if(!deletado) {
            return res.status(404).json({message: "Client not found!"}) 
        }

        res.status(200).json({message: "Client deleted with success"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "impossible delete this client"})
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