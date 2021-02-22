const listaMascota = document.getElementById('lista-mascotas');

const selectTipo = document.getElementById('tipo');
const inputNombre = document.getElementById('input-nombre');
const inputPropietario = document.getElementById('input-propie');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('guardar');
const indice = document.getElementById('indice');

let mascotas = [
    {
        tipo: "Gato",
        nombre:"Salem",
        propietario:"Jeremías"
    }
];

function listarMascotas () {
    const htmlMascotas = mascotas.map((mascota, index)=>`
        <tr>
            <th scope="row">${index}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.propietario}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary editar"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
            </td>
        </tr>
    `).join('');
    listaMascota.innerHTML = htmlMascotas;
    
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        tipo: selectTipo.value,
        nombre: inputNombre.value,
        propietario: inputPropietario.value
    };
    const action = btnGuardar.innerHTML;
    switch(action) {
        case 'Editar':
            mascotas[indice.value] = datos;
        break;
        default:
            mascotas.push(datos);
        break;
    }
    
    listarMascotas();
    resetModal();
}

function editar(index) {
    return function handler() {
        btnGuardar.innerText = 'Editar';
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), keyboard = true);
        myModal.toggle();
        const mascota = mascotas[index];
        selectTipo.value = mascota.tipo;
        inputNombre.value = mascota.nombre;
        inputPropietario.value = mascota.propietario;
        indice.value = index;
    }
}

function resetModal() {
    selectTipo.value = '';
    inputNombre.value = '';
    inputPropietario.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar(index) {
    return function clickEliminar() {
        mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
        listarMascotas();
    }
}

listarMascotas();

function solicitarMascotas() {
    const url = 'http://localhost:5000/mascotas'
    fetch(url)
        .then((respuesta) => {
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then((mascotasDelServidor) => {
            console.log({mascotasDelServidor});
        });
}

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;