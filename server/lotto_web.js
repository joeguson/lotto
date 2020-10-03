const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const poolConfig = config.db_config;
exports.poolConfig = poolConfig;

app.use(bodyParser.json());

/* ===== router ===== */
const apiRouter = require('./apis/api');
app.use('/api', apiRouter);
app.use('/test', (req, res)=> res.json({username:'bryans'}));


/* ===== scheduler ===== */

// const quizService = require('./services/historyService');
// const autoHistoryPost = schedule.scheduleJob('0 0 13 * * 7', () => {
// });

app.listen(config.port, () => {
    console.log(`express is running on ${config.port}`);
})