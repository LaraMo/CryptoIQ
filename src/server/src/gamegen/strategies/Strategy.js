export default class Strategy {
    constructor(name) {
        this._name = name; 
    }
    async generate() {};
    toString() {return this._name;}
}