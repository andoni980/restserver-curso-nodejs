const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// const { validateFields } = require( '../middlewares/validate-fields' );
// const { validateJWT } = require( '../middlewares/validate-jwt' );
// const { isAdminRole, validateRoles } = require( '../middlewares/validate-roles' );
const { validateFields, validateJWT, isAdminRole, validateRoles } = require( '../middlewares' );

const { isValidRol, isValidEmail, isValidID } = require( '../helpers/db-validators' );

const { usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require( '../controllers/users' );

const router = Router();
router.get( '/', usersGet );

router.post( '/', [
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El correo no es válido' ).isEmail(),
    check( 'email' ).custom( isValidEmail ),
    check( 'password', 'El password debe tener mas de 6 letras' ).isLength( { min: 6 } ),
    // check( 'rol', 'No es un rol permitido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
    check( 'rol' ).custom( isValidRol ),
    validateFields

], usersPost );

router.put( '/:id', [
    check( 'id', 'No es un ID válido' ).isMongoId(),
    check( 'id' ).custom( isValidID ),
    check( 'rol' ).custom( isValidRol ),
    validateFields
], usersPut );

router.patch( '/', usersPatch );

router.delete( '/:id', [
    validateJWT,
    // isAdminRole,
    validateRoles( 'ADMIN_ROLE', 'SALES_ROLE', 'OTRO_ROLE' ),
    check( 'id', 'No es un ID válido' ).isMongoId(),
    check( 'id' ).custom( isValidID ),
    validateFields

], usersDelete );

module.exports = router;