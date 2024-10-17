"use strict";
function binartTOInt(arr) {
    let result = 0;
    arr.reverse();
    for (let i = 0; i < arr.length; i++) {
        result += arr[i] * Math.pow(2, i);
    }
    return result;
}
let arr = [1, 0, 1, 0];
console.log(binartTOInt(arr));
//# sourceMappingURL=index.js.map