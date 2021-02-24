const listaProfesional = document.getElementById('lista-profesional');

const inputIdentificacion = document.getElementById('input-ident');
const inputNombre = document.getElementById('input-nombre');
const inputApellido = document.getElementById('input-apellido');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('guardar');
const indice = document.getElementById('indice');
const url = 'http://localhost:5000/profesionales';

let veterinarios =[];

async function listarVeterinarios () {
    try {
        const respuesta = await fetch(url);
        const veterinariasDelServer =  await respuesta.json();
        if(Array.isArray(veterinariasDelServer)){
            veterinarios = veterinariasDelServer;
        }
        if(veterinarios.length) {
            const htmlVeterinarios = veterinarios.map((veterinario, index)=>`
            <tr>
                <th scope="row">${index}</th>
                <td>${veterinario.nombre}</td>
                <td>${veterinario.apellido}</td>
                <td>${veterinario.dni}</td>
                <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary editar"><i class="far fa-edit"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
                </div>
                </td>
            </tr>
            `).join('');
            listaProfesional.innerHTML = htmlVeterinarios;
            
            Array
            .from(document.getElementsByClassName('editar'))
            .forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
            Array
            .from(document.getElementsByClassName('eliminar'))
            .forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

            return;
        } else {
            listaProfesional.innerHTML =
                `<tr>
                    <td colspan="5">No hay Veterinarios</td>
                </tr>`
        }
    } catch (error) {
        console.log({ error });
        $('.alert').show();
    }
}  

async function enviarDatos(e) {
    e.preventDefault();

    try {
       const datos = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        dni: inputIdentificacion.value
        };
        const action = btnGuardar.innerHTML;
        let urlEnvio = url;
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
            listarVeterinarios();
            resetModal();
        } 
    } catch (error) {
        console.log({ error });
        $('.alert').show();
    }    
}

function editar(index) {
    return function handler() {
        btnGuardar.innerText = 'Editar';
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), keyboard = true);
        myModal.toggle();
        const veterinario = veterinarios[index];
        indice.value = index;
        inputNombre.value = veterinario.nombre;
        inputApellido.value = veterinario.apellido;
        inputIdentificacion.value = veterinario.dni;
    }
}

function resetModal() {
    indice.value = '';
    inputIdentificacion.value = '';
    inputNombre.value = '';
    inputApellido.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar(index) {
    return function clickEliminar() {
        veterinarios = veterinarios.filter((veterinario, indiceVeterinario)=>indiceVeterinario !== index);
        listarVeterinarios();
    }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;