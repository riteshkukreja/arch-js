class Graph {

    constructor(name, p, mod) {
        this._path = p;
        this._module = mod;
        this._name = name;
        this._imports = [];
        this._exports = {};
    }

    set Import(graph) {
        this._imports.push(graph);
    }

    set Exports(graph) {
        this._exports = graph;
    }

    get Imports() {
        return this._imports;
    }

    get Exports() {
        return this._exports;
    }

}

module.exports = Graph;