class stringMystification {

  constructor( seed, securemode ) {

    securemode = typeof securemode === "boolean" ? securemode : true;

    const supportedCharacters = " \t\r\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàèéìòùÀÈÉÌÒÙабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789.,:;!?\"\'\`/|\\()[]{}&~*#<>@%_-+=$€%£^".split(""); 

    this.__proto__.getSupportedCharacters = () => supportedCharacters;
    this.__proto__.getHexSpaceIllegalCharacters = () => "0123456789abcdef".split("")

    this.__proto__.removeSpecialCharacters = string => {if(typeof string!=="undefined"){string=String(string);return string.replace(/(\r\n\t|\n|\r\t)/gm ,"")}}
    this.__proto__.checkForInvalidCharacters = string => {if(typeof string!=="undefined"){string.split("").forEach(v=>{if(this.getSupportedCharacters().indexOf(v)===-1){throw TypeError(`"${v}" is not a supported character.`)}})}}
    this.__proto__.stringFormatting = string => {if(typeof string!=="undefined"){/*string=this.removeSpecialCharacters(String(string));*/this.checkForInvalidCharacters(string);return string.normalize()}}

    this.__proto__.returnNewArray = (keyNumberValue) => {if(typeof keyNumberValue!=="undefined"&&typeof Number(keyNumberValue)==="number"){const supportedCharacters=this.getSupportedCharacters();keyNumberValue=Number(keyNumberValue);while(keyNumberValue>=supportedCharacters.length){keyNumberValue=Math.abs(keyNumberValue-supportedCharacters.length+1)}return[...supportedCharacters.slice(keyNumberValue,supportedCharacters.length-1),...supportedCharacters.slice(0,keyNumberValue)]}}
    
    seed = typeof seed === "string" ? this.keyValueEstimator( seed ) : seed;
    seed = typeof seed === "number" && Number.isInteger( seed ) && seed <= 100000000 ? seed : 0;

    this.getSecureMode = () => securemode;
    this.getSeed = () => seed;

  }

  keyValueEstimator(key) {

    /*if(typeof key!=="undefined"){

      key=this.stringFormatting(key);
      const characterOrderValue=Math.abs(Math.floor(key.split("").map(v=>this.getSupportedCharacters().indexOf(v)).reduce((a,b)=>(a*1.75/b*1.305))*0.88));
      let result=Math.floor((key.split("").map(v=>this.getSupportedCharacters().indexOf(v)+1).reduce((a,b)=>a+b)+characterOrderValue));
      result+=typeof this.getSeed!=="undefined"?this.getSeed()*Math.PI:0;

      if(result<=(25000000000*12)){

        return Math.floor(result)

      }

      else{

        throw TypeError(`the key used to encode/decode is too long and will make your browser freeze {would take approx. ${(result/25000000000).toFixed(2)} seconds to iterate}`)

      }

    }*/

    if (typeof key=="string"&&key.length <= 20){

      const supportedCharacters = this.getSupportedCharacters(),
      len = supportedCharacters.length - 1,
      indexes = key.split("").map(v => {return supportedCharacters.indexOf(v)+1}),
      unique = Number(indexes.reduce((a,b)=> String(a) + String(b) ));

      const reduce = (a,b) => { let c=[]; while(a>=b) { a/=b; c.push(a); } return Math.floor(c.reduce((a,b)=>a+b)+a);}

      let count = unique;

      /*while(temp_unique > len) {

        temp_unique /= len;
        count += len;

      }*/

      /*const r = reduce(count,len);
      count = r !== 0 ? r : count;*/

      while (count >= len) {
        count = reduce(count,len);
      }

      const final = Math.abs(unique-count);

      //const possible = res.reduce((a,b) => String(a) + String(b)); 
      //const result = key.length == 1 ? possible : possible - order;

      return /*{unique,count,final}*/ typeof this.getSeed == "function" ? Math.floor(count + this.getSeed() * Math.PI) : Math.floor(count);

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

  hexEncode( string, key,/* spaces,*/ times ) {

    if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

      //const DEBUG = [];

      times = typeof times !== "undefined" ? times : 1;

      const res = this.encode( string, key );

      //DEBUG.push([string,key]);

      //DEBUG.push([res.result,res.signature]);
      
      for (let i = 0; i < times; i++) {

        res.result = this.string2hex( res.result/*, spaces*/ );
        res.signature = this.string2hex( res.signature/*, spaces*/ );
        //DEBUG.push([res.result,res.signature]);

      }

      //console.log(DEBUG);
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

  hexDecode( string, key, signature,/* spaces,*/ times ) {

    if ( typeof string !== "undefined" && typeof key !== "undefined" && typeof signature !== "undefined" ) {

      const DEBUG = [];

      const res = { result: this.hex2string(string/*,spaces*/), signature: this.hex2string(signature/*,spaces*/) };
      times = typeof times !== "undefined" ? times : 1;
      DEBUG.push([string,signature]);
      DEBUG.push([res.result,res.signature]);

      for (let i = 0; i < times - 1; i++) {

        res.result = this.hex2string(res.result/*,spaces*/);
        res.signature = this.hex2string(res.signature/*,spaces*/);
        DEBUG.push([res.result,res.signature]);

      }

      //console.log(res);

      const final = this.safelyDecode( res.result, key, res.signature );

      DEBUG.push([final,res.result,res.signature]);

      console.log(DEBUG);
      return /*final*/ this.safelyDecode( res.result, key, res.signature );

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

      else {

        console.error("The signature doesn't match the key!");

      }

    }

  }

  string2hex( text/*, spaces*/ ) {

    let flag = true,
    illegal = this.getHexSpaceIllegalCharacters();

    const spaces = /*typeof spaces=="string" ? spaces : "."*/ "";

    if (typeof text == "string") {

      /*spaces.split("").forEach(v=>{if(illegal.includes(v)){flag = false;}});
      spaces = flag === true ? spaces : ".";*/
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

  hex2string( text/*, spaces*/ ) {

    let flag = true,
    illegal = this.getHexSpaceIllegalCharacters();

    const spaces = /*typeof spaces=="string" ? spaces : "."*/ "";

    if (typeof text == "string") {

      /*spaces.split("").forEach(v=>{if(illegal.includes(v)){flag = false;}});
      spaces = typeof spaces=="string" ? spaces : ".";*/
      const chars = this.getSupportedCharacters();
      text = /*spaces == "" ?*/ text.match(/.{1,2}/g)/* : text.split(spaces)*/;
      text = text.map(v => {
        return chars[this.hex2num(v)];
      });

      return text.join("");

    }

  }

}