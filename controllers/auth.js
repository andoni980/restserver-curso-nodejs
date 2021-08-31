const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );
const { generateJWT } = require( '../helpers/generateJWT' );
const { googleVerify } = require( '../helpers/google-verify' );

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

const googleSignIn = async ( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { name, email, img } = await googleVerify( id_token );

        let user = await User.findOne( { email } );

        if ( !user ) {
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true

            };

            user = new User( data );
            await user.save();
        }

        // Si el usuario en DB
        if ( !user.state ) {
            return res.status( 401 ).json( {
                msg: 'Hable con el administrador, usuario bloqueado'
            } );
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json( {
            user,
            token

        } );

    } catch ( error ) {
        res.status( 400 ).json( {
            msg: 'Token de Google no es válido'
        } );
    }

}



module.exports = {
    login,
    googleSignIn
}