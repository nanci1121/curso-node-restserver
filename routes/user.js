const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('pasword', 'El password tiene que tener mas de 6 letras y es obligatorio').isLength({ min: 6 }),
    check('correo', 'El valor ingresado no tiene el valor adecuado').isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async(rol = '') => {
        const existeRol = await Role.findOne({ rol });
        if (!existeRol) {
            throw new Error(`El rol ${ rol } no esta registrado en la DB `);
        }
    }),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);

module.exports = router;