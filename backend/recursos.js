module.exports = { 
    mascotas :[
        {tipo: 'Perro', nombre: 'Firulais0', propietario:'Cesar'},
        {tipo: 'Perro', nombre: 'Firulais1', propietario:'Cesar'},
        {tipo: 'Perro', nombre: 'Firulais2', propietario:'Cesar'},
        {tipo: 'Perro', nombre: 'Firulais3', propietario:'Cesar'},
        {tipo: 'Perro', nombre: 'Firulais4', propietario:'Cesar'}
    ],
    profesionales :[
        {nombre: 'Alexandra', apellido:'Pérez', dni: '36696941'},
        {nombre: 'Ayelen', apellido:'Pérez', dni: '65223448'},
        {nombre: 'Cesar', apellido:'ura', dni: '12156546'}
    ],
    propietarios :[
        {nombre: 'Alexandra', apellido:'Pérez', telefono: '252696941'},
        {nombre: 'Ayelen', apellido:'Pérez', telefono: '0115223448'},
        {nombre: 'Cesar', apellido:'ura', telefono: '381156546'}
    ],
    consultas :[
        {
            mascota: 0,
            veterinaria:0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: '',
            diagnostico: ''
        },
    ]
};