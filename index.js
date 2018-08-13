const {createDB, addModels} = require('./models/model')
const Sequelize = require('sequelize')
const {green, blue, red, yellow} = require('chalk')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let trainerHandler = require('./controllers/trainerHandler')
let teamHandler = require('./controllers/teamHandler')
let playerHandler = require('./controllers/playerHandler')


main()

async function main(){

  const db = await createDB('bianca')
  const { 
    Trainer, 
    Team, 
    PlayerTeam, 
    Player 
  } = await addModels(db)

  await db.sync()

  app.set('port', (process.env.PORT || 5000))
  app.use(express.static(__dirname + '/client'))
  let jsonParser = bodyParser.json()

  app.get('/', (req, res) => {
    res.end('<h1>Main Page</h1>')
  })

  

  trainerHandler = await trainerHandler(Trainer, ['firstname', 'lastname', 'age'])
  app.get('/api/trainers/', async (req, res) => await trainerHandler.findAll(req, res))
  app.get('/api/trainers/:id', async (req, res) => await trainerHandler.findOne(req, res))
  app.post('/api/trainers/', jsonParser, async (req, res) => await trainerHandler.insert(req, res))
  app.put('/api/trainers/:id', jsonParser, async (req, res) => await trainerHandler.edit(req, res))
  app.delete('/api/trainers/:id', jsonParser, async (req, res) => await trainerHandler.drop(req, res))

  teamHandler = await teamHandler(Team, ['name', 'color', 'trainer_id'])
  app.get('/api/teams/', async (req, res) => await teamHandler.findAll(req, res))
  app.get('/api/teams/:id', async (req, res) => await teamHandler.findOne(req, res))
  app.post('/api/teams/', jsonParser, async (req, res) => await teamHandler.insert(req, res))
  app.put('/api/teams/:id', jsonParser, async (req, res) => await teamHandler.edit(req, res))
  app.delete('/api/teams/:id', jsonParser, async (req, res) => await teamHandler.drop(req, res))

  playerHandler = await playerHandler(Player, ['firstname', 'lastname', 'age'])
  app.get('/api/players/', async (req, res) => await playerHandler.findAll(req, res))
  app.get('/api/players/:id', async (req, res) => await playerHandler.findOne(req, res))
  app.post('/api/players/', jsonParser, async (req, res) => await playerHandler.insert(req, res))
  app.put('/api/players/:id', jsonParser, async (req, res) => await playerHandler.edit(req, res))
  app.delete('/api/players/:id', jsonParser, async (req, res) => await playerHandler.drop(req, res))

  app.use('/*', (req, res) => {
    res.status(404).send({
      status: 'error',
      message: `Route ${req.url} for method ${req.method} not found`,
    })
  })

  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  })

}
