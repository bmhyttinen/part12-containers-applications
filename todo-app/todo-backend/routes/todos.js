const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');
const { MONGO_URL } = require('../util/config')


/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log(MONGO_URL);
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const counter = await redis.getAsync("added_todos");
  if (counter === null) {
    redis.setAsync("added_todos", 1);
  } else {
    redis.setAsync("added_todos", parseInt(counter) + 1);
  }
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (typeof req.body.done !== 'undefined') {
    req.todo.done = req.body.done;
    await req.todo.save();
  }
  if (typeof req.body.text !== 'undefined') {
    req.todo.text = req.body.text;
    await req.todo.save();
  }
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
