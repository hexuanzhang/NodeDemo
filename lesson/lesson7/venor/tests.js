const should = chai.should();

describe('app.test.js', () => {
    it('should throw when n isnt number', function () {
        (function () {
            window.fibonacci('a');
        }).should.throw();
    });

    it('should throw when n < 0', function () {
        (function () {
            window.fibonacci(-1);
        }).should.throw();
    });

    it('should throw when n > 10', function () {
        (function () {
            window.fibonacci(11);
        }).should.throw();
    });

    it('should equal 0 when n === 0', () => {
        window.fibonacci(0).should.equal(0);
    });

    it('should equal 1 when n === 1', () => {
        window.fibonacci(1).should.equal(1);
    });

    it('should equal 55 when n === 10', () => {
        window.fibonacci(10).should.equal(55);
    });
});