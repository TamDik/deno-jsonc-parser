import { JSONC } from './jsonc.ts';
import { assertEquals } from 'https://deno.land/std@0.121.0/testing/asserts.ts';

Deno.test({
    name: 'no comment',
    fn() {
        const text = `{
            "text": "text",
            "number": 1,
            "true": true,
            "false": false,
            "null": null,
            "list": ["text", 1, true, false, null]
        }`;
        assertEquals(JSONC.parse(text), {
            text: 'text',
            number: 1,
            true: true,
            false: false,
            null: null,
            list: ['text', 1, true, false, null],
        });
    },
});


Deno.test({
    name: 'line comment',
    fn() {
        const text = `
        // comment
        {
            "key1": "value1", // comment
            // comment
            "key2": "value2",
            "// dummy": "// dummy"
        }`;
        assertEquals(JSONC.parse(text), {
            key1: 'value1',
            key2: 'value2',
            '// dummy': '// dummy',
        });
    },
});


Deno.test({
    name: 'block comment',
    fn() {
        const text = `
        /* comment */

        /*
        comment
        */

        {
            "key1": "value1", /* comment */
            "key2": /* comment*/ "value2",
            /* comment */ "key3": "value3",
            "/* dummy */": "/* dummy */"
            /*"in comment": "in comment"*/
        }`;
        assertEquals(JSONC.parse(text), {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            '/* dummy */': '/* dummy */'
        });
    },
});
