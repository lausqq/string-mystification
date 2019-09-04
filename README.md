# string-obfuscator.js
a simple way of encoding/decoding a string through a key

This class can be used in a more "secure" way when secure mode is set to `true`:
This mode forces to specify the `signature`, returned when encoding a string and before decoding and returning the result and it checks if the decoded signature is equal to the key used to decode the string

**no secure mode:**
```js

const obfuscator = new stringObfuscator( false ); // secure mode = false

obfuscator.encode( string, key ) // returns String

obfuscator.decode( string, key ) // returns decoded String


```
**with secure mode:**
```js

const obfuscator = new stringObfuscator(); // secure mode = true (by default)

obfuscator.encode( string, key ) // returns Object {result:String,signature:String}

obfuscator.secureDecode( string, key, signature ) // only way of decoding a string

obfuscator.decode( string, key ) // returns Error


```
**constructor keys:**
```js
const string = "abc",
key = "123",
obfuscator1 = new stringObfuscator( "Password1" ),
obfuscator2 = new stringObfuscator( "Password2" );

obfuscator1.encode( string, key ); // result A
obfuscator2.encode( string, key ); // result B


```
*if no arguments are passed to the constructor, the secure mode will set automatically*

**max key length is approx. 40 characters, because similar keys could've had the same results**
