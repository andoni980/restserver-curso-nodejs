const jwt = require( 'jsonwebtoken' );

const generateJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRECTORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log( err );
                reject( 'Nose pudoi generar el token' )
            } else {
                resolve( token );
            }
        } );
    } )
}

module.exports = {
    generateJWT
}