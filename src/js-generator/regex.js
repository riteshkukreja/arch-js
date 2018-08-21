module.exports = {
    require: /require\([\"\'](.+)[\"\']\)/g,
    import: /import .* from [\"\'](.+)[\"\']/g,
    js: /\.js$/,
    exports: /(module\.)?exports\s+=\s+/
};