var express = require('express');
var cors = require('cors');
// var app = express();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Midlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        //Directorio Publico
        this.app.use(express.static('public'));
        //Cors
        this.app.use(cors());
        //Lectura y parseo del Body
        this.app.use(express.json());

    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;