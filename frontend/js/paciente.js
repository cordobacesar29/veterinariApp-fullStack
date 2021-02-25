const listaPacientes = document.getElementById('lista-pacientes');
const mascotasPaciente = document.getElementById('mascota-paciente') ;
const url = 'http://localhost:5000';

let consultas = [];
let mascotas = [];

async function listarConsultas() {
    const entidad = 'consultas';
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const consultasDelServidor =  await respuesta.json();
        if(Array.isArray(consultasDelServidor)) {
            consultas = consultasDelServidor;
        }
        if(respuesta.ok) {
            const htmlConsultas = consultas.map((consulta, indice) =>
                `<tr>
                <th scope="row">${indice}</th>
                <td>${consulta.mascota.nombre}</td>
                <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>${consulta.historia}</td>
                <td>${consulta.diagnostico}</td>
                <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary editar"><i class="far fa-edit"></i></button>
                </div>
                </td>
                </tr>`
            ).join('');
            listaPacientes.innerHTML = htmlConsultas;
        }
    } catch (error) {
        console.log(error);
    }
}
listarConsultas();

async function listarMascotas() {
    const entidad = 'mascotas';
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const mascotasDelServidor =  await respuesta.json();
        if(Array.isArray(mascotasDelServidor)) {
            mascotas = mascotasDelServidor;
        }
        if(respuesta.ok) {
            mascotas.forEach((mascota, indice) => {
                const optionActual = document.createElement('option');
                optionActual.innerHTML = mascota.nombre;
                optionActual.value = indice;
                mascotasPaciente.appendChild(optionActual);
            })
        }
    } catch (error) {
        console.log(error);
    }
}
listarMascotas();