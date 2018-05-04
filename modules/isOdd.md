## isOdd

```
module.exports = function isOdd(i) {
    if (!isNumber(i)) {
        throw new TypeError('is-odd expects a number.');
    }
    if (Number(i) !== Math.floor(i)) {
        throw new RangeError('is-odd expects an integer.');
    }
    return !!(~~i & 1);
};
```

* 判断是否为整数

  * Number.isInteger()

    如果对数据精度要求不高，可以考虑使用 `Number.isInteger()` 判断；

    `Number.isNumber()` 如果参数不是数值，则返回 false;

    `Number.isNumber()` 精度范围 (Number.MIN_VALUE, +∞]

    ```
    Number.isInteger(25); // true
    Number.isInteger(25.0); // true

    Number.isInteger('15'); // false

    Number.isInteger(Number.MIN_VALUE); // false
    Number.isInteger(Number.MIN_VALUE + 1); // true
    Number.isInteger(Number.MAX_VALUE); // true
    ```

  * Math.floor()

    ```
    const isInteger = (num) => {
    		if (isNumber(num)) {
        		return Number(num) === Math.floor(num);
    		} else {
          	return false;
    		}
    };
    ```

  * parseInt()

    `parseInt()` 和 `Math.round()` 类似，但 `parseInt()` 有局限性。

    ```
    const isInteger = (num) => {
    		if (isNumber(num)) {
        		return Number(num) === parseInt(num);
    		} else {
          	return false;
    		}
    };
    ```

    ```
    parseInt(1000000000000000000000, 10); // '1e+21' => 1
    parseInt(100000000000000000000, 10); // '1e+20' => 100000000000000000000

    parseInt(0.000001); // '1e-6' => 0
    parseInt(0.0000001); // '1e-7' => 1
    ```

  * 余数 `%`

    ```
    const isInteger = (num) => {
    		if (isNumber(num)) {
        		return num % 1 === 0;
    		} else {
          	return false;
    		}
    };
    ```

  * 位运算

    由于浮点数是不支持位运算的，会先把 `num` 转成整数再进行位运算。

    但按位与（`|`）和其它按位符运算一样，无法处理超过 32 位的数字。

    ```
    const isInteger = (num) => {
    		if (isNumber(num)) {
        		return (num | 0) === num;
    		} else {
          	return false;
    		}
    }
    ```