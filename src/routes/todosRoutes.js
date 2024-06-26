const express = require('express');
const { createTodo, getTodos, deleteTodo, editTodo } = require('../controllers/CreateTodo');
const { tokenValidate } = require('../middleware/tokenValidate');
const router = express.Router();

router.get('/getTodos', tokenValidate,getTodos)
router.post('/createTodo',tokenValidate, createTodo)
router.get('/getTodos',tokenValidate, getTodos)
router.patch('/editTodo/:todoId',tokenValidate, editTodo)
router.delete('/deleteTodo/:todoId',tokenValidate,deleteTodo)

module.exports = router;