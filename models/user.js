// {
//     name: 'wsedf',
//     email: 'sdfwsedf',
//     password: '234234234',
//     img: '23423423423',
//     rol: '234234234',
//     estado: false,
//     google:false
// }

const { Schema, model } = require( 'mongoose' );

const UserSchema = Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
    },
    email: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: [ 'ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE' ]
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
} )

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model( 'User', UserSchema );