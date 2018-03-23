/**
 * 简单的 express 应用
 *
 * express: http://expressjs.com/
 */
const express = require('express'),
    app = express();

app.get('/', (req, res) => {
    res.send('Hello World.');
});

app.listen('3001', () => {
    console.info('listen at port 30001');
});