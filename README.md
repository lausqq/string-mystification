# string-obfuscator.js
a simple way of encoding/decoding a string through a key

This class can be used in a "secure" way when secureMode is set to true

### secure mode is set to true if no arguments were passed to the constructor:

* This mode forces to specify the signature, returned when encoding a string and before decoding and returning the result and it checks if the decoded signature is equal to the key used to decode the string

**no secure mode**
```
const obfuscator = new stringObfuscator( false );

obfuscator.encode( string, key ) // returns String

obfuscator.decode( string, key ) // allows to use this function

```
**with secure mode**
```
const obfuscator = new stringObfuscator(); // if no arguments are passed to the constructor, the secure mode will set automatically

obfuscator.encode( string, key ) // returns Object {result:String,signature:String}

obfuscator.secureDecode( string, key, signature ) // allows to use this function

obfuscator.encode( string, key ) // returns undefined

```
