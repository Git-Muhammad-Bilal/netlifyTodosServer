const Todos = require('../modals/todos')
const moment = require('moment')

exports.createTodo = async (req, res) => {
  let {email, password, _id} = req.user
  try {
    const { todo, done } = req?.body
    let date = moment().format("MMM Do YY");
    let time = moment().format('h:mm:ss a') ;
    let data = await Todos.create({ todo, done, date, time, userId:_id })
    res.send(data)
  } catch (error) {
    res.status(400).send(error?.message)
  }
  
}
exports.getTodos = async (req, res) => {
  // let {email, password, _id} = req.user
    // res.send('toods are working')
  try {
    let data = await Todos.find({})
    // let data = await Todos.find({userId:_id})
    res.send(data)
  } catch (error) {
    res.status(404).send(error?.message)
  }
  
}


exports.editTodo = async (req, res) => {
  let {email, password, _id} = req.user
  
  
  try {
    await Todos.updateOne({ _id: req.body._id }, { $set: { ...req.body } })
    let data = await Todos.find({userId:_id})
    res.status(200).send(data)
  } catch (error) {
    res.status(404).send(error?.message)
  }
}


exports.deleteTodo = async (req, res) => {
  let {email, password, _id} = req.user
  let id = req.params.todoId
  try {
    await Todos.findByIdAndDelete(id);
    let updatedData = await Todos.find({userId:_id})
    res.send(updatedData)
    
  } catch (error) {
    res.status(404).send(error?.message)
  }
  
}