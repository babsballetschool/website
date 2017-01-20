var marked = require('marked');

function parse(input, callback) {
    var output, err;
    try {
        console.log(marked(input));
        output = input.split(/---/g)
            .map(function(md){
                return marked(md);
            })
            .map(function(story){
                return '<section>' + story + '</section>';
            }).join('');
        console.log(output);
    } catch(e) {
        err = e;
        console.log(err);
    }
    return callback(err, output);
}

function setup(config) {
    /* do nothing */
}

module.exports = {
    supportedExtensions: [".dashes"],

    parse: parse,

    setup: setup
};
