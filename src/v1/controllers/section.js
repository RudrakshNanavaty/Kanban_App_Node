const Section = require("../models/section")
const Task = require("../models/task")

exports.create = async (req, res) => {
	const { boardId } = req.params
	try {
		const section = await Section.create({ board: boardId })
		section._doc.tasks = []
		res.status(201).json(section)
	} catch (err) {
		res.status(500).json(err)
	}
}

exports.update = async (req, res) => {
	const { sectionId } = req.params

	// Update section with data from req.body
	try {
		const section = await Section.findByIdAndUpdate(sectionId, {
			$set: req.body
		})
		// array of tasks in the section
		section._doc.tasks = []
		res.status(200).json(section)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

// Deleting a section from the board
exports.delete = async (req, res) => {
	const { sectionId } = req.params

	try {
		await Task.deleteMany({ section: sectionId })
		await Section.deleteOne({ _id: sectionId })
		res.status(200).json("deleted")
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}
