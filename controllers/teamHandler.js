const {yellow} = require('chalk') 
const fatalLog = require('../helpers')
const bodyParser = require('body-parser')

let teamHandler = async (team, fields) => {
  return  {
    findAll: async (req, res) => {
      try {
        let all = await team.findAll({order: ['id']})
        if(!all)
          res.status(404).send({
            status: 'error',
            message: `Route ${req.url} for method ${req.method} not found`,
          })
        await res.send(all.map( x => { return {
          id: x.id, 
          name: x.name,
          color: x.color,
          trainer_id: x.trainer_id, 
        }}))
      } catch(err){
        res.status(404).send({
          status: 'error',
          message: `Route ${req.url} for method ${req.method} not found`,
        })
        fatalLog(err)
      }
      
    },
    findOne: async (req, res) => {
      try {
        let t = await team.findById(req.params.id)
        if(!t)
          res.status(404).send({
            status: 'error',
            message: `Route ${req.url} for method ${req.method} not found`,
          })
        let players = await t.getPlayers()
        t = Object.assign({}, t.dataValues, {
          players: players.map( x => x.dataValues)
        })

        await res.send(t)
        
        console.log(t)
      } catch(err){      
        res.status(404).send({
          status: 'error',
          message: `Route ${req.url} for method ${req.method} not found`,
        })
        fatalLog(err)
      }
    },
    insert: async (req, res) => {
      try {
        let emptyFields = fields.filter( x => !req.body[x])
        if(!emptyFields.length)
          res.send(await team.create(req.body))
        else
          res.status(400).send({
            status: 'error',
            message: `${emptyFields.map( x => `${x} field is required! `).join('')} `,
          })
      } catch(err){
        res.status(404).send({
          status: 'error',
          message: `Route ${req.url} for method ${req.method} not found`,
        })
        fatalLog(err)
      }
    },
    edit: async (req, res) => {
      try{
        console.log(req.body)
        await team.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        res.sendStatus(200)
      } catch(err){
        res.status(404).send({
          status: 'error',
          message: `Route ${req.url} for method ${req.method} not found`,
        })
        fatalLog(err)
      }
    },
    drop: async (req, res) => {
      try {
        await team.destroy({
          where: {
            id: req.params.id
          }
        })
        await res.sendStatus(200)
      } catch(err) {
        res.status(404).send({
          status: 'error',
          message: `Route ${req.url} for method ${req.method} not found`,
        })
        fatalLog(err)
      }
      
    }
  }
}

module.exports = teamHandler