const express = require('express')
const router = express.Router()

const { Creature } = require('../db/schema.js')

router.get('/', async (req, res) => {
    try {
        const creatures = await Creature.find({})
        res.json(creatures) 
    } catch (error) {
        console.log(error)
    } 
})

router.get('/:id', async (req,res) => {
    try {
        const creatureId = req.params.id
        const creature = await Creature.findById(creatureId)
        res.json(creature)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const newCreature = req.body
        const savedCreature = await Creature.create(newCreature)
        res.json(savedCreature)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const creatureId = req.params.id
        const updatedCreature = req.body
        const savedCreature = await Creature.findByIdAndUpdate(creatureId, updatedCreature)
        res.json(savedCreature) 
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const creatureId = req.params.id
        await Creature.findByIdAndRemove(creatureId)
        res.json({
            msg: "Successfully deleted"
        }) 
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
module.exports = router