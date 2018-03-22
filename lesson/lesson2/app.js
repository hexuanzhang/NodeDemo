/**
 * express: http://expressjs.com/
 *
 * utility: https://github.com/node-modules/utility
 */

const express = require('express'),
    utility = require('utility');

const app = express();

app.get('/', (req, res) => {
    const query = req.query,
        keys = Object.keys(query);

    if (Object.is(keys.length, 0) || !keys.includes('name')) {
        res.send('缺少参数 name');
    } else {
        const method = query.method || 'md5', // 加密方法（md5, sha1, sha256）
            format = query.format || 'base64'; // 输出字符串格式（hex、base64）

        res.send(utility.hash(method, query.name, format));
    }
});

app.listen('3001', () => {
    console.info('服务已启动');
});