const {yellow} = require('chalk') 
const fatalLog = require('../helpers')
const bodyParser = require('body-parser')

let trainerHandler = async (trainer, fields) => {
	return  {
  	findAll: async (req, res) => {
  		try {
  			let all = await trainer.findAll({order: ['id']})
  			if(!all)
  				res.status(404).send({
	  				status: 'error',
	          message: `Route ${req.url} for method ${req.method} not found`,
	        })
  			await res.send(all.map( x => { return {
  				id: x.id, 
  				firstname: x.firstname,
  				lastname: x.lastname,
  				age: x.age, 
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
				let tr = await trainer.findById(req.params.id)
				if(!tr)
					res.status(404).send({
	  				status: 'error',
	          message: `Route ${req.url} for method ${req.method} not found`,
	        })
				let teams = await tr.getTeams()
				tr = Object.assign({}, tr.dataValues, {
					teams: teams.map( x => x.dataValues)
				})
				console.log(tr)
				
  			await res.send(tr)
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
  				res.send(await trainer.create(req.body))
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
  		try {
  			console.log(req.body)
				await trainer.update(req.body, {
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
  			await trainer.destroy({
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

module.exports = trainerHandler