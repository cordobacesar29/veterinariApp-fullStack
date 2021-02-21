const listaPropietario = document.getElementById('lista-propietarios');

const inputNombre = document.getElementById('input-nombre');
const inputApellido = document.getElementById('input-apellido');
const inputTelefono = document.getElementById('input-telefono');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('guardar');
const indice = document.getElementById('indice');

let propietarios = [
    {
        nombre:"César",
        apellido:"Córdoba",
        telefono: "3815350532"
    }
];

function listarPropietarios () {
    const htmlPropietarios = propietarios.map((propietario, index)=>`
        <tr>
            <th scope="row">${index}</th>
            <td>${propietario.nombre}</td>
            <td>${propietario.apellido}</td>
            <td>${propietario.telefono}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary editar"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
            </td>
        </tr>
    `).join('');
    listaPropietario.innerHTML = htmlPropietarios;
    
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        telefono: inputTelefono.value
    };
    const action = btnGuardar.innerHTML;
    switch(action) {
        case 'Editar':
            propietarios[indice.value] = datos;
        break;
        default:
            propietarios.push(datos);
        break;
    }
    
    listarPropietarios();
    resetModal();
}

function editar(index) {
    return function handler() {
        btnGuardar.innerText = 'Editar';
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), keyboard = true);
        myModal.toggle();
        const propietario = propietarios[index];
        indice.value = index;
        inputNombre.value = propietario.nombre;
        inputApellido.value = propietario.apellido;
        inputTelefono.value = propietario.telefono;
    }
}

function resetModal() {
    indice.value = '';
    inputNombre.value = '';
    inputApellido.value = '';
    inputTelefono.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar(index) {
    return function clickEliminar() {
        propietarios = propietarios.filter((propietario, indicePropietario)=>indicePropietario !== index);
        listarPropietarios();
    }
}

listarPropietarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;