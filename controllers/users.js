const { response, request } = require( 'express' );

const usersGet = ( req, res ) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json( {
        ok: true,
        msg: 'get API desde controlador',
        q,
        name,
        apikey,
        page,
        limit
    } );
};

const usersPost = ( req, res ) => {

    const { name, age } = req.body;
    res.json( {
        // ok: true,  NO NECESARIO
        msg: 'post API desde controlador',
        name,
        age,
    } );
};

const usersPut = ( req, res ) => {

    const { id } = req.params;

    res.json( {
        // ok: true,  NO NECESARIO
        msg: 'put API desde controlador',
        id

    } );
};

const usersPatch = ( req, res ) => {
    res.json( {
        // ok: true,  NO NECESARIO
        msg: 'patch API desde controlador'
    } );
};

const usersDelete = ( req, res ) => {
    res.json( {
        // ok: true,  NO NECESARIO
        msg: 'delete API desde controlador'
    } );
};


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}