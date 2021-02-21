const listaProfesional = document.getElementById('lista-profesional');

const inputIdentificacion = document.getElementById('input-ident');
const inputNombre = document.getElementById('input-nombre');
const inputApellido = document.getElementById('input-apellido');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('guardar');
const indice = document.getElementById('indice');

let veterinarios = [
    {
        identificacion: "921",
        nombre:"César",
        apellido:"Córdoba"
    }
];

function listarVeterinarios () {
    const htmlVeterinarios = veterinarios.map((veterinario, index)=>`
        <tr>
            <th scope="row">${index}</th>
            <td>${veterinario.identificacion}</td>
            <td>${veterinario.nombre}</td>
            <td>${veterinario.apellido}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary editar"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
            </td>
        </tr>
    `).join('');
    listaProfesional.innerHTML = htmlVeterinarios;
    
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        identificacion: inputIdentificacion.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value
    };
    const action = btnGuardar.innerHTML;
    switch(action) {
        case 'Editar':
            veterinarios[indice.value] = datos;
        break;
        default:
            veterinarios.push(datos);
        break;
    }
    
    listarVeterinarios();
    resetModal();
}

function editar(index) {
    return function handler() {
        btnGuardar.innerText = 'Editar';
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), keyboard = true);
        myModal.toggle();
        const veterinario = veterinarios[index];
        indice.value = index;
        inputIdentificacion.value = veterinario.identificacion;
        inputNombre.value = veterinario.nombre;
        inputApellido.value = veterinario.apellido;
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