
const Students = require('../models/studentModel')


const getStudents = async (req, res) => {
    const studentList = await Students.getStudentFromDB()
    return studentList ? res.status(200).send(studentList) : res.sendStatus(404);
}

const studentsPost = async (req, res) => {
    const {student_id, first_name, last_name, username, password} = req.body
    console.log(req.body)
    const studentList = await Students.studentPostFromDB(student_id, first_name, last_name, username, password)
    return studentList ? res.status(200).send(studentList) : res.sendStatus(404);
}
module.exports = {
    getStudents,
    studentsPost
}