const Sequelize = require('sequelize')
const { green, blue, red, yellow } = require('chalk')
const fatalLog = require('../helpers')

async function createDB(dbName) {

	const db = new Sequelize(dbName, 'vagabov', 'password', {
	  host: '0.0.0.0',
	  dialect: 'postgres',
	  operatorsAliases: false,

	  pool: {
	    max: 5,
	    min: 0,
	    acquire: 30000,
	    idle: 10000
	  },
	})
	try {
		await db.authenticate()
		console.log(green('>>> DB connected!'))
		return db
	} catch (err) {
		fatalLog(err)
	}
}

async function addModels(db) {
	try {

		const {INTEGER, STRING} = Sequelize
		let Trainer, Player, PlayerTeam, Team

		Trainer = db.define('trainer', {
			id: {
				type: INTEGER,
				primaryKey: true,
        autoIncrement: true,
			},
		  firstname: {
		    type: STRING
		  },
		  lastname: {
		    type: STRING
		  },
		  age: {
		  	type: INTEGER
		  }
		})

		Team = db.define('team', {
			id: {
				type: INTEGER,
				primaryKey: true,
        autoIncrement: true,
			},
			name: {
				type: STRING
			},
			color: {
				type: STRING
			},
			trainer_id: {
				type: INTEGER
			}
		})

		PlayerTeam = db.define('player_teams', {
			player_id: {
				type: INTEGER
			},
			team_id: {
				type: INTEGER
			}
		})

		Player = db.define('player', {
			id : {
				type: INTEGER,
				primaryKey: true,
        autoIncrement: true,
			},
			firstname: {
				type: STRING
			},
			lastname: {
				type: STRING
			},
			age: {
				type: STRING
			}
		})

		Trainer = await Trainer
		Team = await Team
		PlayerTeam = await PlayerTeam
		Player = await Player

		Trainer.hasMany(Team, {foreignKey: 'trainer_id', sourceKey: 'id'})
		Team.belongsToMany(Player, {through: PlayerTeam, foreignKey: 'team_id', sourceKey: 'id'})
		Player.belongsToMany(Team, {through: PlayerTeam, foreignKey: 'player_id', sourceKey: 'id'})
		// Player.hasOne(PlayerTeam, {foreignKey: 'player_id', sourceKey: 'id'})
		// Team.hasMany(PlayerTeam, {foreignKey: 'team_id', sourceKey: 'id'})
		// Team.belongsTo(Trainer, {foreignKey: 'trainer_id', targetKey: 'id'})

		return {
			Trainer: Trainer,
			Team: Team,
			PlayerTeam: PlayerTeam,
			Player: Player
		}

	} catch(err){
		fatalLog(err)
	}
}

module.exports = {
	createDB: createDB, 
	addModels: addModels,
}

