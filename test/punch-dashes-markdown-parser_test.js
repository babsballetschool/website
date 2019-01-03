var assert = require('chai').assert;
var parser = require('../src/punch-dashes-markdown-parser.js');

describe('parser', function(){
    it('should parse markdown', function(done){
        parser.parse([
            '# Hello, World!'
        ].join('\n'), function(err, output){
            assert.deepEqual(output, '<section><h1 id="hello-world">Hello, World!</h1>\n</section>');
            done();
        });

    });

    it('should parse markdown separated by dashes', function(done){
        parser.parse([
            '# Hello, World!',
            "---",
            "# Goodbye, World!"
        ].join('\n'), function(err, output){
            assert.deepEqual(output, '<section><h1 id="hello-world">Hello, World!</h1>\n</section><section><h1 id="goodbye-world">Goodbye, World!</h1>\n</section>');
            done();
        });
    });
});
