class stringMystification {

  constructor( seed, securemode ) {

    securemode = typeof securemode === "boolean" ? securemode : true;

    const supportedCharacters = " \t\r\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàèéìòùÀÈÉÌÒÙабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789.,:;!?\"\'\`/|\\()[]{}&~*#<>@%_-+=$€%£^".split(""); 

    this.__proto__.getSupportedCharacters = () => supportedCharacters;

    this.__proto__.checkForInvalidCharacters = string => {if(typeof string!=="undefined"){string.split("").forEach(v=>{if(this.getSupportedCharacters().indexOf(v)===-1){throw TypeError(`"${v}" is not a supported character.`)}})}}
    this.__proto__.stringFormatting = string => {if(typeof string!=="undefined"){this.checkForInvalidCharacters(string);return string.normalize()}}

    this.__proto__.returnNewArray = (keyNumberValue) => {if(typeof keyNumberValue!=="undefined"&&typeof Number(keyNumberValue)==="number"){const supportedCharacters=this.getSupportedCharacters();keyNumberValue=Number(keyNumberValue);while(keyNumberValue>=supportedCharacters.length){keyNumberValue=Math.abs(keyNumberValue-supportedCharacters.length+1)}return[...supportedCharacters.slice(keyNumberValue,supportedCharacters.length-1),...supportedCharacters.slice(0,keyNumberValue)]}}
    
    seed = typeof seed === "string" ? this.keyValueEstimator( seed ) : seed;
    seed = typeof seed === "number" && Number.isInteger( seed ) ? seed : 0;

    this.getSecureMode = () => securemode;
    this.getSeed = () => seed;

  }

  keyValueEstimator(key) {

    if (typeof key=="string"&&key.length <= 20){

      const supportedCharacters = this.getSupportedCharacters(),
      len = supportedCharacters.length - 1,
      indexes = key.split("").map(v => {return supportedCharacters.indexOf(v)+1}),
      unique = Number(indexes.reduce((a,b)=> String(a) + String(b) ));

      const reduce = (a,b) => { let c=[]; while(a>=b) { a/=b; c.push(a); } return Math.floor(c.reduce((a,b)=>a+b)+a);}

      let count = unique;

      while (count >= len) {
        count = reduce(count,len);
      }

      const final = Math.abs(unique-count);

      return typeof this.getSeed == "function" ? Math.floor(count + this.getSeed() * Math.PI) : Math.floor(count);

    } 

  }

  encode( string, key ) {

    if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

      string = this.stringFormatting( string );
      key = this.stringFormatting( key );

      const newCharactersArray = this.returnNewArray( this.keyValueEstimator( key ) );
      const result = string.split("").map( v => newCharactersArray[ this.getSupportedCharacters().indexOf( v ) ] ).join("");

      return this.getSecureMode() === true ? { result: result, signature: key.split("").map( v => newCharactersArray[ this.getSupportedCharacters().indexOf( v ) ] ).join("") } : result

    }

  }

  hexEncode( string, key, times ) {

    if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

      times = typeof times !== "undefined" ? times : 1;

      const res = this.encode( string, key );

      for (let i = 0; i < times; i++) {

        res.result = this.string2hex( res.result );
        res.signature = this.string2hex( res.signature );

      }

      return res;

    }

  }

  decode( string, key ) {

    if ( this.getSecureMode() === false ) {

      if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

        string = this.stringFormatting( string );
        key = this.stringFormatting( key );

        const newCharactersArray = this.returnNewArray( this.keyValueEstimator( key ) );

        return string.split("").map( v => this.getSupportedCharacters()[ newCharactersArray.indexOf( v ) ] ).join("")

      }

    }

    else {throw TypeError("This function is disabled.")}

  }

  hexDecode( string, key, signature, times ) {

    if ( typeof string !== "undefined" && typeof key !== "undefined" && typeof signature !== "undefined" ) {

      const DEBUG = [];

      const res = { result: this.hex2string(string), signature: this.hex2string(signature) };
      times = typeof times !== "undefined" ? times : 1;

      for (let i = 0; i < times - 1; i++) {

        res.result = this.hex2string(res.result);
        res.signature = this.hex2string(res.signature);

      }

      return this.safelyDecode( res.result, key, res.signature );

    }

  }

  safelyDecode( string, key, signature ) {

    let newCharactersArray;

    if ( typeof string !== "undefined" && typeof key !== "undefined" && typeof signature !== "undefined" ) {

      string = this.stringFormatting( string );
      key = this.stringFormatting( key ); 
      signature = this.stringFormatting( signature );

      newCharactersArray = this.returnNewArray( this.keyValueEstimator( key ) );
      const decodedSignature = signature.split("").map( v => this.getSupportedCharacters()[ newCharactersArray.indexOf( v ) ] ).join("")

      if ( decodedSignature === key ) {

        return string.split("").map( v => this.getSupportedCharacters()[ newCharactersArray.indexOf( v ) ] ).join("")

      }

    }

  }

  string2hex( text ) {

    let flag = true,
    illegal = this.getHexSpaceIllegalCharacters();

    const spaces = "";

    if (typeof text == "string") {

      const chars = this.getSupportedCharacters();
      text = text.split("").map(v => {
        const hex = chars.indexOf(v).toString(16);
        return hex.length < 2 ? "0" + hex : hex;
      });

      return text.join(spaces);

    }

  }

  hex2num( hex ){

    if(typeof hex=="string"&&!isNaN(parseInt(hex,16))) {

      let arrBuff=new ArrayBuffer(4),
      vw=new DataView(arrBuff);
      vw.setUint32(0,parseInt(hex,16),false);
      const arrByte=new Uint8Array(arrBuff).slice(1),
      num=[...arrByte];

      return num[2]

    }

  }

  hex2string( text ) {

    let flag = true,
    illegal = this.getHexSpaceIllegalCharacters();

    const spaces = "";

    if (typeof text == "string") {

      const chars = this.getSupportedCharacters();
      text = text.match(/.{1,2}/g);
      text = text.map(v => {
        return chars[this.hex2num(v)];
      });

      return text.join("");

    }

  }

}