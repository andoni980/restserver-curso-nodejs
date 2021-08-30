const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );
const { generateJWT } = require( '../helpers/generateJWT' );

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar email existe
        const user = await User.findOne( { email } );
        if ( !user ) {
            return res.status( 400 ).json( {
                msg: 'User / Password no son correctos - correo'
            } )
        }
        // Verificar usuario activo
        if ( !user.state ) {
            return res.status( 400 ).json( {
                msg: 'User / Password no son correctos - state:false'
            } )
        }
        //Verificar la contraseña

        const IsValidPassword = bcryptjs.compareSync( password, user.password );
        if ( !IsValidPassword ) {
            return res.status( 400 ).json( {
                msg: 'User / Password no son correctos - password:invalid'
            } );
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json( {
            user,
            token
        } )

    } catch ( error ) {

        return res.status( 500 ).json( {
            msg: 'Hable con el administrador'
        } )
    }
}



module.exports = {
    login
}