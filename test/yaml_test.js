var assert = require('chai').assert;
var yaml = require('js-yaml');

describe('js-ya ml', function(){
    it('should parse yaml', function(){
        var result = yaml.safeLoad([
            '---',
            'name: a',
            'ids:',
            '  - 1',
            '  - 2'
        ].join('\n'));

        assert.deepEqual(result,{ name: 'a', ids: [1, 2]});
    });

    it('should parse yaml with multiple documents', function(){
        var docs = [];
        var result = yaml.safeLoadAll([
            '---',
            'name: a',
            'ids:',
            '  - 1',
            '  - 2',
            '---',
            'name: b',
            'ids:',
            '  - 3',
            '  - 4'
        ].join('\n'), function(doc){
            docs.push(doc);
        });

        assert.deepEqual(docs,[
            { name: 'a', ids: [1, 2]},
            { name: 'b', ids: [3, 4]},
        ]);
    });
});
