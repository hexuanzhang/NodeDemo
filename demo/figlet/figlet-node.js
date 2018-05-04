/**
 *  npm: https://www.npmjs.com/package/figlet
 *
 */
const figlet = require('figlet');

figlet.text('ZHX', {
    font: 'Isometric1'
}, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
});