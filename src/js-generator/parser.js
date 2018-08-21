const path = require("path");
const regex = require("./regex");

/**
 * Generator method to retrieve all the requires/imports modules from a given file content.
 * @param {String} root Path of parent directory of given file
 * @param {String} content Contents of target file
 */
const RequiresGenerator = function* (root, content) {
    let match = regex.require.exec(content);

    while(match != null) {
        const module = match[1];

        /** Check if its a local dependency or node_modules */
        if(module[0] != '/' && module[0] != '.')
            yield module;
        else {
            /** Resolve path to make it absolute path */
            yield path.resolve(root, module);
        }

        match = regex.require.exec(content);
    }

    match = regex.import.exec(content);

    while(match != null) {
        const module = match[1];

        /** Check if its a local dependency or node_modules */
        if(module[0] != '/' && module[0] != '.')
            yield module;
        else {
            /** Resolve path to make it absolute path */
            yield path.resolve(root, module);
        }

        match = regex.import.exec(content);
    }
};

/**
 * Helper method to retrieve all the inherited methods and properties of an object excluding methods and properties from base Object
 * @param {Object} obj exported object
 */
const getDerivedProperties = (obj) => {
    let props = [];

    while(Object.getPrototypeOf(obj)) {
        props = props.concat(Object.getOwnPropertyNames(obj));
        obj = Object.getPrototypeOf(obj);
    }

    return props
            .sort()
            .filter((e) => e != "constructor");
};

/**
 * Method to retrieve all the exports from a given module.
 * It imports the module and returns a list of exports and its type.
 * @param {String} file path of target module
 */
const getExports = (file) => {
    const res = {};

    try {
        const exported = require(file);

        if(typeof exported == "function") {
            /** Only show default with type function */
            res["default"] = "function";
        } else if(typeof exported.constructor == "function") {
            /** if this is a class, get its methods and keys */
            getDerivedProperties(exported)
                .forEach(item => res[item] = typeof exported[item]);
        } else {
            /** Get exported keys */
            for(const key of Object.keys(exported)) {
                res[key] = typeof exported[key];
            }
        }

    } catch(e) {
        // res["error"] = e;
    }
    
    return res;
};

module.exports = {
    RequiresGenerator,
    getDerivedProperties,
    getExports
};