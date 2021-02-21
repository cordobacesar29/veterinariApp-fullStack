module.exports = function propietariosHandler(propietarios){
    return {
        get: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(propietarios[data.indice]) {
                    return callback(200, propietarios[data.indice]);
                }
                return callback(404, {
                    mensaje:`propietario con indice ${data.indice} no encontrada`,
                });
            }
            callback(200, propietarios);
        },
        post: (data, callback) => {
            propietarios.push(data.payload);
            callback(201, data.payload);            
        },
        put: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(propietarios[data.indice]) {
                    propietarios[data.indice] = data.payload;
                    return callback(200, propietarios[data.indice]);
                }
                return callback(404, {
                    mensaje:`propietario con indice ${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(propietarios[data.indice]) {
                    propietarios = propietarios.filter(
                    (_propietario, indice) => indice != data.indice);
                    return callback(204, {
                        mensaje: `el elemento con indice ${data.indice} fue eliminado`
                    });
                }
                return callback(404, {
                    mensaje:`propietario con indice${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    }
}