module.exports = {
    require: /require\([\"\'](.+)[\"\']\)/g,
    js: /\.js$/,
    exports: /(module\.)?exports\s+=\s+/
};