const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const poolConfig = config.db_config;
exports.poolConfig = poolConfig;


/* ===== router ===== */
const apiRouter = require('./apis/api');
app.use('/api', apiRouter);

app.use(bodyParser.json());
app.use('/test', (req, res)=> res.json({username:'bryans'}));


app.listen(config.port, () => {
    console.log(`express is running on ${config.port}`);
})