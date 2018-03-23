/**
 * 抓取 CNode 首页的所有帖子标题和链接
 *
 * express: http://expressjs.com/
 *
 * superagent: http://visionmedia.github.io/superagent/
 *
 * cheerio: https://github.com/cheeriojs/cheerio
 */



const express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio');

const app = express();

app.get('/', (req, res, next) => {
    const cnodeUrl = 'https://cnodejs.org/';

    console.time('start');
    superagent.get(cnodeUrl).then(_res => {
        const $ = cheerio.load(_res.text);

        let items = [];
        $('#topic_list .topic_title').each((idx, ele) => {
            const $ele = $(ele);

            items.push({
                title: $ele.attr('title'),
                href: $ele.attr('href')
            });
        });

        console.timeEnd('start');
        res.send($.html());
        // res.send(items);
    }).catch(err => {
        console.error(err);

        console.timeEnd('start');
        res.send('发生异常');
    });
});

app.listen('3001', () => {
    console.info('服务已启动');
});