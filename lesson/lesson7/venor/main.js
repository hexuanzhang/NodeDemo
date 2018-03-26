var fibonacci = (n) => {
    if (!Object.is(typeof n, 'number') || Number.isNaN(n) || n < 0) {
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