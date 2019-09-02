export function sortObjectKeyByOrder(obj, order) {
    const result = [];
    order.forEach(key => {
        if(obj.hasOwnProperty(key)) {
            result.push(key)
        }
    })
    console.log(result)
    return result;
}