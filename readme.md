# string-mystification.js
*a simple way of encoding/decoding a string with keys and signatures*

```
npm install string-mistification
```

This class can be used in a more "secure" way when secure mode is set to `true`:
This mode forces to specify the `signature`, returned when encoding a string and before decoding and returning the result and it checks if the decoded signature is equal to the key used to decode the string

**no secure mode:**
```js

const obfuscator = new stringMystification( false ); // secure mode = false

obfuscator.encode( string, key ) // returns String

obfuscator.decode( string, key ) // returns decoded String


```
**with secure mode:**
```js

const obfuscator = new stringMystification(); // secure mode = true (by default)

obfuscator.encode( string, key ) // returns Object {result:String,signature:String}

obfuscator.safelyDecode( string, key, signature ) // only way of decoding a string while safe mode is true

obfuscator.decode( string, key ) // returns Error


```
**constructor keys:**
```js
const string = "abc",
key = "123",
obfuscator1 = new stringMystification( "Password1" ),
obfuscator2 = new stringMystification( 123 ); // the seed can be set to a number too

obfuscator1.encode( string, key ); // result A
obfuscator2.encode( string, key ); // result B

// result A and result B are completely different

```
*if no arguments are passed to the constructor, the secure mode will set automatically*

**max key length is approx. 40 characters, because similar keys could've had the same results**
