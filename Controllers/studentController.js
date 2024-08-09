const students = require('../Modals/studentModal');
const users = require('../Modals/userModal')
const jwt = require('jsonwebtoken')


// login
exports.adminLoginController = async (req, res) => {
    console.log("Inside adminLoginController");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
            res.status(200).json({
                user: existingUser,
                token
            })
        } else {
            res.status(404).json("Invalid Email / Password...")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// add student
exports.addStudentController = async (req, res) => {
    console.log("Inside AddStudentController");
    const { studId, studName, studCourse, studStatus } = req.body
    const studImage = req.file.filename
    console.log(studImage,studId, studName, studCourse, studStatus);
    try {
        const existingStudent = await students.findOne({ studId })
        if (existingStudent) {
            res.status(406).json("Student already exist")
        } else {
            const newStudent = new students({
                studImage, studId, studName, studCourse, studStatus
            })
            await newStudent.save()
            res.status(200).json(newStudent)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get students
exports.getStudentsController = async (req, res) => {
    console.log("Inside getStudentsController");
    try {
        const allStudents = await students.find()
        res.status(200).json(allStudents)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get a student
exports.getAStudentController = async (req, res) => {
    console.log("Inside getAStudentController");
    try {
        const { id } = req.params
        const student = await students.findOne({ studId: id })
        res.status(200).json(student)
    } catch (error) {
        res.status(401).json(error)
    }
}

// update student
exports.updateAStudentController = async (req, res) => {
    console.log("Inside updateAStudentController");
    const { studImage, studId, studName, studCourse, studStatus } = req.body
    const updatedImage = req.file ? req.file.filename : studImage
    console.log(studId, studName, studCourse, studStatus, updatedImage);
    try {
        console.log(req.params);
        
        const { id } = req.params
        console.log(id);
        const updatedStudent = await students.findOneAndUpdate({studId:id }, { studImage:updatedImage, studId, studName, studCourse, studStatus }, { new: true })
        console.log(updatedStudent);
        await updatedStudent.save()
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete student
exports.deleteAStudentController = async (req,res) => {
    console.log("Inside deleteAStudentController");
    const { id } = req.params
    try {
        const deletedStudent = await students.findOneAndDelete({studId:id})
        res.status(200).json(deletedStudent)
    } catch (error) {
        res.status(401).json(error)
    }
}