/**
 * 性能测试
 *
 *  benchmark： https://github.com/bestiejs/benchmark.js
 *
 *  在线性能测试：http://jsperf.com/
 */

 // https://jsperf.com/num-test
const Benchmark = require('benchmark'),
    suite = new Benchmark.Suite;

const num = '100';
suite.add('+', () => {
    +num;
}).add('parseInt', () => {
    parseInt(num);
}).add('Number', () => {
    Number(num);
}).on('cycle', (event) => {
    // 每个测试跑完后，输出信息
    // console.info(event.target);
}).on('complete', function() {
    console.log(`速度最快的是：${this.filter('fastest').map('name')}`);
}).run()