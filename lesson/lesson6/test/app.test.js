const should = require('should'),
    main = require('../app');

describe('app.test.js', () => {
    it('should throw when n isnt number', function () {
        (function () {
            main.fibonacci('a');
        }).should.throw();
    });

    it('should throw when n < 0', function () {
        (function () {
            main.fibonacci(-1);
        }).should.throw();
    });

    it('should throw when n > 10', function () {
        (function () {
            main.fibonacci(11);
        }).should.throw();
    });

    it('should equal 0 when n === 0', () => {
        main.fibonacci(0).should.equal(0);
    });

    it('should equal 1 when n === 1', () => {
        main.fibonacci(1).should.equal(1);
    });

    it('should equal 55 when n === 10', () => {
        main.fibonacci(10).should.equal(55);
    });
});