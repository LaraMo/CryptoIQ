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

export function randomWords(words, count) {
    let result = [];
    let copy = new Array(words);
    count = count || 1;
    do {
        let min = 0;
        let max = copy.length;
        const position = Math.floor(Number(Math.random()) * (max - min)) + min;
        result.push(copy[position]);
        copy = copy.splice(position, 1);
        count--;
    } while(count != 0)
   
    return result;
}