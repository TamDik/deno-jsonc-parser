# deno-jsonc-parser
Parser for JSON with comments

## Usage

```ts
import { JSONC } from 'https://deno.land/x/jsonc_parser@v0.0.0/mod.ts';

const text = `{
    // LINE COMMENT

    /*
        BLOCK COMMENT
    */

    "key": "value"
}`;
console.log(JSONC.parse(text)); // { key: "value" }
```
