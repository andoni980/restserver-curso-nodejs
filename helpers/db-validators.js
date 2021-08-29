
const Role = require( '../models/role' );
const User = require( '../models/user' );



const isValidRol = async ( rol = '' ) => {

    const existRole = await Role.findOne( { rol } );
    if ( !existRole ) {
        throw new Error( `El rol ${ rol } no está registrado en la BD` )
    }
}


const isValidEmail = async ( email = '' ) => {

    const existsEmail = await User.findOne( { email } );
    if ( existsEmail ) {
        throw new Error( `El email ${ email } ya está registrado` );

    }
}

const isValidID = async ( id ) => {

    const existsID = await User.findById( id );
    if ( !existsID ) {
        throw new Error( `El ID ${ id } no existe` );

    }
}

module.exports = {
    isValidRol,
    isValidEmail,
    isValidID
}