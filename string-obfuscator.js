class stringObfuscator {

  constructor( forceSecureMode ) {

    this.forceSecureMode = typeof forceSecureMode === "boolean" ? forceSecureMode : true;
    this.__proto__.supportedCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","à","è","é","ì","ò","ù","0","1","2","3","4","5","6","7","8","9",".",",",";",":","!","?","\"","'","\\","{","}","[","]","(",")","&","|","~","*","#","<",">","@","%","_","-","+","=","/","`","$","€","^"," ","  "];
    this.__proto__.secureMode = this.forceSecureMode

  }

  encode( string, key ) {

  	let noInvalidCharacters = true;

    if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

      string = this.removeSpecialCharacters( String( string ) ); key = this.removeSpecialCharacters( String( key ) );

      string.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )
      key.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )

      if ( noInvalidCharacters === true ) {

        const newCharactersArray = this.recreateCharacterOrder( this.getKeyNumberValue( key ) );
        const result = string.split("").map( v => newCharactersArray[ this.supportedCharacters.indexOf( v ) ] ).join("");

        return this.secureMode === true ? { result: result, signature: key.split("").map( v => newCharactersArray[ this.supportedCharacters.indexOf( v ) ] ).join("") } : result

      }

    }

  }

  decode( string, key ) {

  	let noInvalidCharacters = true;

    if ( this.secureMode === false ) {

      if ( typeof string !== "undefined" && typeof key !== "undefined" ) {

        string = this.removeSpecialCharacters( String( string ) ); key = this.removeSpecialCharacters( String( key ) );

        string.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )
        key.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )

        if ( noInvalidCharacters === true ) {

          const newCharactersArray = this.recreateCharacterOrder( this.getKeyNumberValue( key ) );

          this.secureMode = this.forceSecureMode;

          return string.split("").map( v => this.supportedCharacters[ newCharactersArray.indexOf( v ) ] ).join("")

    	}
        
      }

    }

  }

  secureDecode( string, key, signature ) {

  	let noInvalidCharacters = true;

    if ( typeof string !== "undefined" && typeof key !== "undefined" && typeof signature !== "undefined" ) {

      string = this.removeSpecialCharacters( String( string ) ); key = this.removeSpecialCharacters( String( key ) ); signature = this.removeSpecialCharacters( String( signature ) );

      string.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )
      key.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )
      signature.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )

      if ( noInvalidCharacters === true ) {

	      this.secureMode = false;
	      const decodedSignature = this.decode( signature, key );

	      if ( decodedSignature === key ) {

	        this.secureMode = false;
	        return this.decode( string, key );

	      }

  	  }

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

    let noInvalidCharacters = true;

    if ( typeof key !== "undefined" ) {

      const keyCharacters = this.removeSpecialCharacters( String( key ) ); 
      const characterOrderValue = keyCharacters.split("").map( v => this.supportedCharacters.indexOf( v ) ).reduce( ( a, b ) => Math.abs( a * 2 - b ) );

      keyCharacters.split("").forEach( v => { if ( this.supportedCharacters.indexOf( v ) === -1 ) { noInvalidCharacters = false; throw TypeError( `"${v}" is not a supported character` ) } } )

      if ( noInvalidCharacters === true ) {

        return Math.floor( ( keyCharacters.split("").map( v => this.supportedCharacters.indexOf( v ) + 1 ).reduce( ( a, b ) => a + b ) + characterOrderValue * 3 ) * 8 ) 

      }

    }

  }

  removeSpecialCharacters( string ) {

    if ( typeof string !== "undefined" ) {

      string = String( string );

      return string.replace( /(\r\n\t|\n|\r\t)/gm ,"")

    }

  }

}