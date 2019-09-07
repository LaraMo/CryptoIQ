/**
 * Fetch the keys of an object and return them by a predefined order
 * 
 * @param {*} obj Object with keys to be sorted
 * @param {*} order Order of key to sort by
 */
export function sortObjectKeyByOrder(obj, order) {
    const result = [];
    order.forEach(key => {
        if(obj.hasOwnProperty(key)) {
            result.push(key)
        }
    })
    return result;
}