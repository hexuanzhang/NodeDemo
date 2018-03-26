const superagent = require('superagent');

export const fetch = async (url, count, cb) => {
    console.log(`url: ${url}`);
    console.log(`当前并发数：${count}`)
    console.time('耗时');

    const agent = await superagent.get(url);

    agent.then(res => {
        console.log(`状态：成功`);
        cb();
    }).catch(err => {
        console.log(`失败`);
        cb();
    });
}