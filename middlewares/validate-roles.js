const { response } = require( 'express' );

const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {

        return res.status( 500 ).json( {
            msg: 'Se quiere verificar el rol sin validar el token antes'
        } )
    }
    const { rol, name } = req.user;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status( 401 ).json( {
            msg: `${ name } no es administrador - no esta autorizado a hacer esto`
        } )
    }

    next();
}

const validateRoles = ( ...roles ) => {

    return ( req, res = response, next ) => {
        console.log( roles, req.user.rol );
        if ( !req.user ) {
            return res.status( 500 ).json( {
                msg: 'Se quiere verificar el rol sin validar el token antes'
            } )
        }
        if ( !roles.includes( req.user.rol ) ) {
            return res.status( 401 ).json( {
                msg: `El servicio requiere uno de estos roles ${ roles }`
            } );
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    validateRoles
};