# string-obfuscator.js
a simple way of encoding/decoding a string through a key

This class can be used in a more "secure" way when secureMode is set to true

### secure mode is set to true if no arguments were passed to the constructor:

This mode forces to specify the `signature`, returned when encoding a string and before decoding and returning the result and it checks if the decoded signature is equal to the key used to decode the string

**no secure mode**
```

const obfuscator = new stringObfuscator( false );

obfuscator.encode( string, key ) // returns String

obfuscator.decode( string, key ) // returns decoded String


```
**with secure mode**
```

const obfuscator = new stringObfuscator();

obfuscator.encode( string, key ) // returns Object {result:String,signature:String}

obfuscator.secureDecode( string, key, signature ) // only way of decoding a string

obfuscator.decode( string, key ) // returns Undefined


```
*if no arguments are passed to the constructor, the secure mode will set automatically*
