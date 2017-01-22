/** use strict */
function asyncForEach(arr, fn) {
    return arr.reduce((promiseChain, item, index) => {
        return promiseChain.then(() => new Promise((resolve) => {
            fn(item, index, resolve);
        }));
    }, Promise.resolve());
    
}

(function run() {
    console.log('Before');
    asyncForEach([1, 2, 3], function(item, index, next) {
        console.log('Item %s at %s', item, index);
        setTimeout(next, 10);
    })
    .then(function() {
        console.log('Done');
    });
    console.log('After');
})();

module.exports = asyncForEach;