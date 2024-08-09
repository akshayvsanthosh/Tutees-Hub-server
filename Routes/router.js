const express = require('express')
const studentController = require('../Controllers/studentController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')

const router = new express.Router()

// login
router.post('/login',studentController.adminLoginController)

// add student
router.post('/addStudent',jwtMiddleware,multerMiddleware.single('studImage'),studentController.addStudentController)

// get students
router.get('/allStudents',jwtMiddleware,studentController.getStudentsController)

// get a student
router.get('/:id/student',jwtMiddleware,studentController.getAStudentController)

// update student
router.put('/:id/updateStudent',multerMiddleware.single('studImage'),jwtMiddleware,studentController.updateAStudentController)

// update student
router.delete('/:id/deleteStudent',jwtMiddleware,studentController.deleteAStudentController)

module.exports=router