export default class Strategy {
    constructor(name) {
        this._name = name; 
    }
    generate() {};
    toString() {return this._name;}
}