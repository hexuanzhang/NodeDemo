/**
 * 抓取 CNode 帖子标题、链接、第一条评论、作者以及其积分
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

    console.time('list');
    superagent.get(cnodeUrl).then(_res => {
        const $ = cheerio.load(_res.text);

        console.timeEnd('list');

        let topicUrls = [];
        $('#topic_list .topic_title').each((idx, ele) => {
            const $ele = $(ele);

            topicUrls.push(`https://cnodejs.org${$ele.attr('href')}`);
        });

        if (topicUrls.length) {
            console.time('detail');

            Promise.all(topicUrls.slice(0, 5).map(url => superagent.get(url)))
                .then(list => {
                    console.timeEnd('detail');

                    const topicBriefs = list.map((topicRes, idx) => {
                        // 帖子页面内容
                        const $topic = cheerio.load(topicRes.text);

                        return {
                            title: $topic('.topic_full_title').text().trim(),
                            href: topicUrls[idx],
                            firstComment: $topic('.reply_content .markdown-text').eq(0).text().trim(),
                            author: $topic('.user_name').text(),
                            score: $topic('.board .big').text().slice(4).trim()
                        }
                    });

                    console.log(topicBriefs);

                    res.send(topicBriefs);
                })
                .catch(err => {
                    console.timeEnd('detail');
                    console.log(err);

                    res.send('请求详情页异常');
                });
        }
    }).catch(err => {
        console.timeEnd('list');
        console.error(err);

        res.send('请求列表页异常');
    });
});

app.listen('3001', () => {
    console.info('服务已启动');
});