const { readFile, writeFile } = require("fs").promises;

function read(fname) {
    return readFile(fname, "utf-8");
}

function write(fname, content) {
    return writeFile(fname, content);
}

module.exports = {
    read,
    write,
};
