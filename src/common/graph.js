class Graph {

    constructor(name, p, mod) {
        this._path = p;
        this._module = mod;
        this._name = name;
        this._imports = [];
        this._exports = [];
    }

    set Import(graph) {
        if(!this._imports.includes(graph) && this._path != graph)
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

Graph.from = (node) => {
    const graph = new Graph(node._name, node._path, node._module);
    node.Imports.forEach(a => graph.Import = a);
    graph.Exports = node.Exports;

    return graph;
};

module.exports = Graph;