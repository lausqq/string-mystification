class stringObfuscator {

  constructor( secureMode ) {

    secureMode = typeof secureMode === "boolean" ? secureMode : true;
    this.__proto__.supportedCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","à","è","é","ì","ò","ù","0","1","2","3","4","5","6","7","8","9",".",",",";",":","!","?","\"","'","\\","{","}","[","]","(",")","&","|","~","*","#","<",">","@","%","_","-","+","=","/","`","$","€","^"," ","  "];
    this.__proto__.secureMode = secureMode;
    this.defineSecureMode()

  }

  encode( string, key ) {

    if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

      string = this.stringFormatting( string );
      key = this.stringFormatting( key );

      const newCharactersArray = this.recreateCharacterOrder( this.getKeyNumberValue( key ) );
      const result = string.split("").map( v => newCharactersArray[ this.supportedCharacters.indexOf( v ) ] ).join("");

      return window.STRING_OBFUSCATOR_SECUREMODE === true ? { result: result, signature: key.split("").map( v => newCharactersArray[ this.supportedCharacters.indexOf( v ) ] ).join("") } : result

    }

    else {throw TypeError("correct usage: encode( string, key )")}

  }

  decode( string, key ) {

    if ( window.STRING_OBFUSCATOR_SECUREMODE === false ) {

      if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

        string = this.stringFormatting( string );
        key = this.stringFormatting( key );

        const newCharactersArray = this.recreateCharacterOrder( this.getKeyNumberValue( key ) );

        return string.split("").map( v => this.supportedCharacters[ newCharactersArray.indexOf( v ) ] ).join("")

      }

      else {throw TypeError("correct usage: decode( string, key )")}

    }

    else {throw TypeError("can't use this function while secure mode is active")}

  }

  secureDecode( string, key, signature ) {

    let newCharactersArray;

    if ( typeof string !== "undefined" && typeof key !== "undefined" && typeof signature !== "undefined" ) {

      string = this.stringFormatting( string );
      key = this.stringFormatting( key ); 
      signature = this.stringFormatting( signature );

	  newCharactersArray = this.recreateCharacterOrder( this.getKeyNumberValue( key ) );
	  const decodedSignature = signature.split("").map( v => this.supportedCharacters[ newCharactersArray.indexOf( v ) ] ).join("")

      if ( decodedSignature === key ) {

	    return string.split("").map( v => this.supportedCharacters[ newCharactersArray.indexOf( v ) ] ).join("")

      }

    }

    else {throw TypeError("correct usage: secureDecode( string, key, signature )")}

  }

  stringFormatting( string ) {

    if ( typeof string !== "undefined" ) {

    	string = this.removeSpecialCharacters( String( string ) ); 
    	this.checkForInvalidCharacters( string );
    	return string

    }

  }

  checkForInvalidCharacters( string ) {

  	if ( typeof string !== "undefined" ) {

  	  string.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { throw TypeError( `"${v}" is not a supported character` ) } } )

    }

  }

  recreateCharacterOrder( keyNumberValue ) {

    const supportedCharacters = this.supportedCharacters;

    if ( typeof keyNumberValue !== "undefined" && typeof Number( keyNumberValue ) === "number" ) {

      keyNumberValue = Number( keyNumberValue );

      while ( keyNumberValue >= supportedCharacters.length ) {

        keyNumberValue = Math.abs( keyNumberValue - supportedCharacters.length + 1 );

      }

      return [ ...supportedCharacters.slice( keyNumberValue, supportedCharacters.length - 1 ), ...supportedCharacters.slice( 0, keyNumberValue ) ]

    }

  }

  getKeyNumberValue( key ) {

    if ( typeof key !== "undefined" ) {

      key = this.stringFormatting( key ); 
      const characterOrderValue = Math.abs( key.split("").map( v => this.supportedCharacters.indexOf( v ) ).reduce( ( a, b ) => Math.floor( a * 2 - b * 1.5 ) ) );

      const result = Math.floor( ( key.split("").map( v => this.supportedCharacters.indexOf( v ) + 1 ).reduce( ( a, b ) => a + b ) + characterOrderValue ) * 1 ) ;

      if ( result <= ( 25000000000 * 10 ) ) {

      	return Math.floor( ( key.split("").map( v => this.supportedCharacters.indexOf( v ) + 1 ).reduce( ( a, b ) => a + b ) + characterOrderValue ) * 1 ) 

      }

      else {throw TypeError(`the key used to encode/decode is probably too long and will make your browser freeze {would take aprox. ${(result/25000000000).toFixed(2)} seconds to iterate}`)}

    }

  }

  removeSpecialCharacters( string ) {

    if ( typeof string !== "undefined" ) {

      string = String( string );

      return string.replace( /(\r\n\t|\n|\r\t)/gm ,"")

    }

  }

  defineSecureMode(){

  	const name = "STRING_OBFUSCATOR_SECUREMODE",
  	value = this.__proto__.secureMode;

  	if ( typeof window.STRING_OBFUSCATOR_SECUREMODE === "undefined" ) {

      Object.defineProperty(window, name, { 

         get: function(){return value},
         set: function(){throw(name+' is a constant and cannot be redeclared.')}

      })

    }

  }

}