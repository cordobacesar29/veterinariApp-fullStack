const listaPacientes = document.getElementById('lista-pacientes');
const mascotasPaciente = document.getElementById('mascota-paciente') ;
const profesionalesPaciente = document.getElementById('profesional-paciente') ;
const btnGuardar = document.getElementById('btn-guardar');
const indice = document.getElementById('indice');
const historia = document.getElementById('historia');
const diagnostico = document.getElementById('diagnostico');
const actionsMenu = document.getElementById('actionsMenu');
const url = 'http://localhost:5000';

let consultas = [];
let mascotas = [];
let profesionales = [];

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
                    <button type="button" class="editar btn btn-secondary"><i class="far fa-edit"></i></button>
                </div>
                </td>
                </tr>`
            ).join('');
            listaPacientes.innerHTML = htmlConsultas;
            Array
            .from(document.getElementsByClassName('editar'))
            .forEach(
                (botonEditar, index)=>(botonEditar.onclick = editar(index))
            );
        }
    } catch (error) {
        console.log({ error });
        const alerta = `
            <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
                <strong>Ups!</strong> ${error} 
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        actionsMenu.innerHTML = alerta;
    }
}

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
        console.log({ error });
        const alerta = `
            <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
                <strong>Ups!</strong> ${error} 
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        actionsMenu.innerHTML = alerta;
    }
}

async function listarProfesional() {
    const entidad = 'profesionales';
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const profesionalesDelServidor =  await respuesta.json();
        if(Array.isArray(profesionalesDelServidor)) {
            profesionales = profesionalesDelServidor;
        }
        if(respuesta.ok) {
            profesionales.forEach((profesional, indice) => {
                const optionActual = document.createElement('option');
                optionActual.innerHTML =`${profesional.nombre} ${profesional.apellido}` ;
                optionActual.value = indice;
                profesionalesPaciente.appendChild(optionActual);
            });
        }
    } catch (error) {
        console.log({ error });
        const alerta = `
            <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
                <strong>Ups!</strong> ${error} 
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        actionsMenu.innerHTML = alerta;
    }
}

function editar(index) {
    return function handler() {
        btnGuardar.innerText = 'Editar';
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), keyboard = true);
        myModal.toggle();
        const consulta = consultas[index];
        indice.value = index;
        mascotasPaciente.value = consulta.mascota.id;
        profesionalesPaciente.value = consulta.veterinaria.id;
        historia.value = consulta.historia;
        diagnostico.value = consulta.diagnostico;
    }
}

async function enviarDatos(e) {
    const entidad = 'consultas';
    e.preventDefault();

    try {
        const datos = {
            mascota:mascotasPaciente.value,
            veterinaria:profesionalesPaciente.value,
            historia:historia.value,
            diagnostico:diagnostico.value,

            };
            if(validar(datos) === true) {
                const action = btnGuardar.innerHTML;
                let urlEnvio = `${url}/${entidad}`;
                let method = 'POST';
                if(action === 'Editar') {
                    urlEnvio += `/${indice.value}`;
                    method = 'PUT';
                }
                const respuesta = await fetch(urlEnvio, {
                    method,
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                    mode: 'cors',
                })
                if (respuesta.ok) {
                    listarConsultas();
                    resetModal();
                }
                return;   
            }else {
                const modalBody = document.getElementById('modal-body');
                const alertWarnnig = `
                    <div class="alert alert-warnning alert-dismissible fade show" id="alert" role="alert">
                        <strong>Ups!</strong> faltan llenar datos 
                        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                modalBody.innerHTML = alertWarnnig;
            }                      
    } catch (error) {
        console.log({ error });
        const alerta = `
            <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
                <strong>Ups!</strong> ${error} 
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        actionsMenu.innerHTML = alerta;
    }
}

function resetModal() {
    indice.value = '';
    mascotasPaciente.value = '';
    profesionalesPaciente.value = '';
    historia.value = '';
    diagnostico.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function validar(datos) {
    if(typeof datos !=='object') return false;

    for(let llave in datos) {
        if(datos[llave].length === 0) return false;
    } 
    return true;
}

btnGuardar.onclick = enviarDatos;

listarConsultas();
listarMascotas();
listarProfesional();