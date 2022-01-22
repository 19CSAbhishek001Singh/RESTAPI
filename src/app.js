const express = require('express')
require('./db/conn')
const Student = require('./models/students')
const app = express()
const port = process.env.PORT || 8000
app.use(express.json())
// create new router
const router = new express.Router()
// define router
router.get('/abhi', (req, res) => {
  res.send('hello whatsup')
})
// register router
app.use(router)
app.post('/students', async (req, res) => {
  try {
    const user = new Student(req.body)
    const createUser = await user.save()
    res.status(201).send(createUser)
  } catch (e) {
    res.status(400).send(e)
  }
})

// read the data from the server
app.get('/students', async (req, res) => {
  try {
    const studentData = await Student.find()
    res.send(studentData)
  } catch (e) {
    res.send(e)
  }
})
// get individual data from the server
app.get('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const studentData = await Student.findById({ _id })
    res.send(studentData)
  } catch (e) {
    res.send(e)
  }
})
// update students by its id
app.patch('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body)
    res.send(updateStudents)
  } catch (e) {
    res.status(404).send(e)
  }
})
// delete students
app.delete('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const deleteStudents = await Student.findByIdAndDelete(_id)
    res.send(deleteStudents)
  } catch (e) {
    res.status(400).send(e)
  }
})
app.listen(port, () => {
  console.log(`listening on port at ${port}`)
})
