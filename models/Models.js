import db from '../database/db.js';
import {  DataTypes } from 'sequelize';

const Models = db.define('usuarios',{
    n_documento:{type: DataTypes.INTEGER},
    apellido_paterno:{type: DataTypes.STRING},
    apellido_materno:{type: DataTypes.STRING},
    nombres:{type: DataTypes.STRING},
},{
    freezeTableName: true,
});
export default Models;
/*const Models = db.define('usuario_admin',{
    nombre_usuario:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING},
    password:{type: DataTypes.STRING},
})*/

