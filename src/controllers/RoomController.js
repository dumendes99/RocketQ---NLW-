const { open } = require("sqlite")
const Database = require("../db/config")

module.exports = {
	async create(req, res){
		const db = await Database()
		const pass = req.body.password
		let roomId = Math.floor(Math.random() * 10).toString()
		let isRoom = true

		while(isRoom){
			// create room-id 	
			for(var i = 0; i < 5; i++){
				roomId += Math.floor(Math.random() * 10).toString()
			}

			// verify if the room already exists
			const roomsExistIds =  await db.all(`SELECT id FROM rooms`)
			isRoom = roomsExistIds.some(roomsExistId => roomsExistId == roomId)
			if (!isRoom){
				// insert number of room 
				await db.run(`INSERT INTO rooms (
					id,
					pass
				) VALUES (
					${parseInt(roomId)},
					"${pass}"
				)`)
			}
		}

		await db.close()
		res.redirect(`/room/${roomId}`)
	},

	async open(req,res){
		const db = await Database()
		const roomId = req.params.room
		const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`) 
		const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
		let isNoQuestion
		
		if (questions.length == 0){
			if (questionsRead.length == 0){
				isNoQuestion = true
			}
		}

		res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestion: isNoQuestion})

	},

	enter(req, res){
		const roomId = req.body.roomId

		res.redirect(`/room/${roomId}`)
	}
}