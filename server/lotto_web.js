const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const poolConfig = config.db_config;
exports.poolConfig = poolConfig;
const cors = require('cors');

app.use(bodyParser.json());

/* ===== router ===== */
const apiRouter = require('./apis/api');
const history = require('./back/history');
const home = require('./back/home');

app.use(cors());
app.use('/api', apiRouter);
app.use('/test', (req, res)=> res.json({username:'bryans'}));
app.use('/history', history);
app.use('/home', home);
app.use(express.static('./'));

/* ===== scheduler ===== */

// const quizService = require('./services/historyService');
// const autoHistoryPost = schedule.scheduleJob('0 0 13 * * 7', () => {
// });

app.listen(config.port, () => {
    console.log(`express is running on ${config.port}`);
})