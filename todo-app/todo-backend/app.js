const express = require('express');
const logger = require('morgan');
const redis = require('./redis');
const cors = require('cors');


const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');



const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

app.get('/statistics', async (req, res) => {
    const counter = await redis.getAsync("added_todos");
    res.send({
        "added_todos": counter
    });
})

module.exports = app;
