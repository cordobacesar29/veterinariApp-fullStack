const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');

module.exports = (req, res) => {

    // 1. obtener url desde el objeto request
    const urlActual= req.url;
    const urlParseada = url.parse(urlActual, true);

    // 2. obtener la ruta
    const ruta = urlParseada.pathname;

    // 3 limpiar ruta quitando su slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g,'');

    // 3.1 obtener método http
    const metodo = req.method.toLowerCase();
    // 3.2 obtener variables del query url
    const { query = {} } = urlParseada;

    // 3.3 obtener headers
    const {headers = {} } = req;
    //3.4 obtener payload, en el caso de haber uno
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    // 3.4.1 aculuar la data cuando el req reciba un payload
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    // 3.4.2 termina de acumular datos y decoder finaliza
    req.on('end', () => {
        buffer += decoder.end();

        if(headers['content-type'] === 'application/json') {
            buffer = JSON.parse(buffer);
        }
        // revisa si tiene subrutas

        if (rutaLimpia.indexOf('/')> -1) {
            //separar rutas
            var [rutaPrincipal, indice] = rutaLimpia.split('/');
        }
        // 3.5 ordenar la data
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };

        console.log({data});
        // 3.6 elegir el manejador de la respuesta //handler
        let handler;
        if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
            handler = enrutador[data.ruta][metodo];
        } else {
            handler = enrutador.noEncontrado;
        };
        // 4. ejecutar handler para enviar la respuesta
        if(typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                // linea donde estamos respondiendo a la aplicacion cliente
                res.end(respuesta);
            });
        }        
    });
};
