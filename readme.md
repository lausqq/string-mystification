# string-mystification.js
*a simple way of encoding/decoding a string with keys and signatures*

This class can be used in a more "secure" way when secure mode is set to `true`:
This mode forces to specify the `signature`, returned when encoding a string and before decoding and returning the result and it checks if the decoded signature is equal to the key used to decode the string

# mystification.js / mystification-min.js

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
**hex encoding/decoding:**
```js

/* 
 * obfuscator.hexEncode( string, key, times )
 * times = how many times the string will be converted to hex values, 
 *         every time that it's converted the strings length doubles
 *
 * obfuscator.hexDecode( string, key, signature, times )
 * hexDecode forces to specify the signature 
 */

```
**constructor seeds:**
```js
const string = "abc",
key = "123",
obfuscator1 = new stringMystification( "Password1" ),
obfuscator2 = new stringMystification( 123 ); // the seed can be set to a number too

obfuscator1.encode( string, key ); // result A
obfuscator2.encode( string, key ); // result B

// result A and result B are different

```
*if no arguments are passed to the constructor, the secure mode will set automatically*

# mystification-extended.js / mystification-extended-min.js

This version extends the String class, the seed cannot be specified and secure mode is set to *true*, therefore `safelyDecode` was replaced with `decode`, with the same arguments.

```js

const encoded = "text to encode".encode("key"); // returns Object {result,signature}
encoded.result.decode("key",encoded.signature); // returns String

const hex = "text to encode".hexEncode("key",5); // returns Object {result,signature}
hex.result.hexDecode("key",hex.signature,5); // returns String

```


