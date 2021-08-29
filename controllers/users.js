const { response, request } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const usersGet = async ( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    // const users = await User.find( query )
    //     .skip( Number( from ) )
    //     .limit( Number( limit ) );

    // const total = await User.countDocuments( query );

    const [ total, users ] = await Promise.all( [
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ] );

    res.json( {
        total,
        users
    } );
};

const usersPost = async ( req, res = response ) => {

    const { name, email, password, rol } = req.body;
    const user = new User( { name, email, password, rol } );


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    res.json( {
        user
    } );
};

const usersPut = async ( req, res ) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json( user );
};

const usersPatch = ( req, res ) => {
    res.json( {
        msg: 'patch API desde controlador'
    } );
};

const usersDelete = async ( req, res = response ) => {

    const { id } = req.params;

    // Borrarlo fisicamente
    // const user = await User.findByIdAndDelete( id ); // Perdemos la integridad referencial

    const user = await User.findByIdAndUpdate( id, { state: false } )

    res.json( user );
};



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}