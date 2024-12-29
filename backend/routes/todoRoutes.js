const express = require('express');
const auth = require('../middleware/auth');
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require('../controller/todoController');

const router = express.Router();


router.post('/',auth, createTodo);
router.get('/',auth, getTodos);
router.patch('/:id',auth, updateTodo);
router.delete('/:id',auth, deleteTodo);

module.exports = router;
