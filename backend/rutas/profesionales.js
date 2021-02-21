module.exports = function profesionalesHandler(profesionales){
    return {
        get: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(profesionales[data.indice]) {
                    return callback(200, profesionales[data.indice]);
                }
                return callback(404, {
                    mensaje:`profesional con indice ${data.indice} no encontrada`,
                });
            }
            callback(200, profesionales);
        },
        post: (data, callback) => {
            profesionales.push(data.payload);
            callback(201, data.payload);            
        },
        put: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(profesionales[data.indice]) {
                    profesionales[data.indice] = data.payload;
                    return callback(200, profesionales[data.indice]);
                }
                return callback(404, {
                    mensaje:`profesional con indice ${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(profesionales[data.indice]) {
                    profesionales = profesionales.filter(
                    (_profesional, indice) => indice != data.indice);
                    return callback(204, {
                        mensaje: `el elemento con indice ${data.indice} fue eliminado`
                    });
                }
                return callback(404, {
                    mensaje:`profesional con indice${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    }
}