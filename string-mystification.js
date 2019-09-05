class stringMystification {

  constructor( seed, securemode ) {

    securemode = typeof securemode === "boolean" ? securemode : true;

    const supportedCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","à","è","é","ì","ò","ù","0","1","2","3","4","5","6","7","8","9",".",",",";",":","!","?","\"","'","\\","{","}","[","]","(",")","&","|","~","*","#","<",">","@","%","_","-","+","=","/","`","$","€","^"," ","  "]; 

    this.__proto__.getSupportedCharacters = () => supportedCharacters;

    this.__proto__.removeSpecialCharacters = string => {if(typeof string!=="undefined"){string=String(string);return string.replace(/(\r\n\t|\n|\r\t)/gm ,"")}}
    this.__proto__.checkForInvalidCharacters = string => {if(typeof string!=="undefined"){string.split("").forEach(v=>{if(this.getSupportedCharacters().indexOf(v)===-1){throw TypeError(`"${v}" is not a supported character.`)}})}}
    this.__proto__.stringFormatting = string => {if(typeof string!=="undefined"){string=this.removeSpecialCharacters(String(string));this.checkForInvalidCharacters(string);return string}}

    this.__proto__.returnNewArray = (keyNumberValue) => {if(typeof keyNumberValue!=="undefined"&&typeof Number(keyNumberValue)==="number"){const supportedCharacters=this.getSupportedCharacters();keyNumberValue=Number(keyNumberValue);while(keyNumberValue>=supportedCharacters.length){keyNumberValue=Math.abs(keyNumberValue-supportedCharacters.length+1)}return[...supportedCharacters.slice(keyNumberValue,supportedCharacters.length-1),...supportedCharacters.slice(0,keyNumberValue)]}}
    
    this.keyValueEstimator = (key) => {if(typeof key!=="undefined"){key=this.stringFormatting(key);const characterOrderValue=Math.abs(Math.floor(key.split("").map(v=>this.getSupportedCharacters().indexOf(v)).reduce((a,b)=>(a*1.75+b*1.305))*0.88));let result=Math.floor((key.split("").map(v=>this.getSupportedCharacters().indexOf(v)+1).reduce((a,b)=>a+b)+characterOrderValue));result+=typeof this.getSeed!=="undefined"?this.getSeed()*Math.PI:0;if(result<=(25000000000*12)){return Math.floor(result)}else{throw TypeError(`the key used to encode/decode is too long and will make your browser freeze {would take approx. ${(result/25000000000).toFixed(2)} seconds to iterate}`)}}}
    
    seed = typeof seed === "string" ? this.keyValueEstimator( seed ) : seed;
    seed = typeof seed === "number" && Number.isInteger( seed ) && seed <= 100000000 ? seed : 0;

    this.getSecureMode = () => securemode;
    this.getSeed = () => seed

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

}

module.exports = stringMystification;