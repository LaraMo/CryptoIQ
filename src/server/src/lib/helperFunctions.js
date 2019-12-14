/**
 * Fetch the keys of an object and return them by a predefined order
 * 
 * @param {*} obj Object with keys to be sorted
 * @param {*} order Order of key to sort by
 */
export function sortObjectKeyByOrder(obj, order) {
    const result = [];
    order.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            result.push(key)
        }
    })
    return result;
}

export function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

export function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function randomWords(words, count) {
    words = words || [];
    let result = [];
    let copy = words.slice();
    count = count || 1;
    do {
        let min = 0;
        let max = copy.length;

        let position = getRandomInt(min, max)
        result.push(copy[position]);
        copy.splice(position, 1);
        count--;
    } while (count != 0)
    return result;
}

export function diffWords(originalList, takenList) {
    return originalList.filter((word) => takenList.indexOf(word) === -1).filter(el => !!el);
}

export function reflect(promise) {
    return promise.then(function (v) {
            return {
                v: v,
                status: "fulfilled"
            }
        },
        function (e) {
            return {
                e: e,
                status: "rejected"
            }
        });
}
