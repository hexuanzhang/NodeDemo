const express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    path = require('path'),
    upload = multer(),
    app = express();

// 公共资源目录
app.use('/', express.static(path.join(__dirname, '../public/libs')));
// 本地资源
app.use('/static', express.static(path.join(__dirname, '/public')));

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (rep, res, next) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post(['/json', '/urlencoded'], (req, res, next) => {
    const { name, email} = req.body;

    console.log(` name: ${name} \n email: ${email}`);
    res.send('success');
});

app.post('/formData', upload.array(), (req, res, next) => {
    const { name, email} = req.body;

    console.log(` name: ${name} \n email: ${email}`);
    res.send('success');
});

app.listen('3001', () => {
    console.log('service has started');
});