module.exports = function consultasHandler({consultas, profesionales, mascotas}){
    return {
        get: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(consultas[data.indice]) {
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje:`consulta con indice ${data.indice} no encontrada`,
                });
            }
            const consultasConRelaciones = consultas.map((consulta) => ({
                ...consulta,
                mascota: mascotas[consulta.mascota],
                veterinaria: profesionales[consulta.veterinaria]
            }));
            callback(200, consultasConRelaciones);
        },
        post: (data, callback) => {
            let nuevaConsulta = data.payload;
            nuevaConsulta.fechaCreacion = new Date();
            nuevaConsulta.fechaEdicion = null;
            consultas = [...consultas, nuevaConsulta]
            callback(201, nuevaConsulta);            
        },
        put: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(consultas[data.indice]) {
                    const {fechaCreacion} = consultas[data.indice];
                    consultas[data.indice] = {
                        ...data.payload,
                        fechaCreacion,
                        fechaEdicion: new Date()
                    };
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje:`consulta con indice ${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(consultas[data.indice]) {
                    consultas = consultas.filter(
                    (_consulta, indice) => indice != data.indice);
                    return callback(204, {
                        mensaje: `el elemento con indice ${data.indice} fue eliminado`
                    });
                }
                return callback(404, {
                    mensaje:`consulta con indice${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    }
}