/**
 * 测试用例
 *  npm i -g mocha istanbul
 *  npm i -S should
 *
 *  eg:
 *      1.mocha
 *      2.istanbul cover _mocha
 *
 * mocha: http://mochajs.org/
 *
 * should: https://github.com/tj/should.js
 *
 * istanbul: https://github.com/gotwarlost/istanbul
 */

const fibonacci = (n) => {
    if (!Object.is(typeof n, 'number') || n < 0) {
        throw new Error('参数类型错误，请输入自然数');
    } else if (n > 10) {
        throw new Error('参数错误，请输入 [0, 10] 范围内的自然数');
    }

    let sum = 0;

    n = parseInt(n);
    switch(n) {
        case 0:
        case 1:
            sum = n;
            break;
        default:
            sum = fibonacci(n - 1) + fibonacci(n - 2);
    }

    return sum;
};

exports.fibonacci = fibonacci;