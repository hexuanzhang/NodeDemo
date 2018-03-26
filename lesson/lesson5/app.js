/**
 * 使用 async 模块控制并发数
 *
 * express: http://expressjs.com/
 *
 * superagent: http://visionmedia.github.io/superagent/
 *
 * cheerio: https://github.com/cheeriojs/cheerio
 *
 * async: http://caolan.github.io/async/docs.html
 */

const Async = require('async'),
    Express = require('express'),
    Superagent = require('superagent'),
    Cheerio = require('cheerio');

const app = Express();

app.get('/', (req, res, next) => {
    const url = fetchList();

    url.then(urls => {
        console.log(urls);

        Async.mapLimit(urls, 5, (url, cb) => fetchTopic(url, cb), (err, result) => {
            console.log(`剩余请求数：${count}`);
        });
    });
});

app.listen('3001', () => {
    console.info('服务已启动');
});

let count = 0;

const fetchList = async () => {
    const cnodeUrl = 'https://cnodejs.org/',
        response = await Superagent.get(cnodeUrl),
        $ = Cheerio.load(response.res.text);

    let urls = [];
    $('#topic_list .topic_title').each((idx, ele) => {
        const $ele = $(ele);

        urls.push(`https://cnodejs.org${$ele.attr('href')}`);
    });

    return urls;
}

const fetchTopic = (url, cb) => {
    const timeStart = new Date().getTime();

    ++count;
    Superagent.get(url).then((res) => {
        console.log(`请求地址：${url}  状态：成功  耗时：${new Date().getTime() - timeStart}ms`);

        count--;
        cb();
    }).catch(err => {
        console.log(`请求地址：${url}  状态：成功  耗时：${new Date().getTime() - timeStart}ms`);

        count--;
        cb();
    });
};

