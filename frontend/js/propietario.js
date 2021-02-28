const listaPropietario = document.getElementById('lista-propietarios');

const inputNombre = document.getElementById('input-nombre');
const inputApellido = document.getElementById('input-apellido');
const inputTelefono = document.getElementById('input-telefono');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('guardar');
const indice = document.getElementById('indice');
const url = 'http://localhost:5000/propietarios';

let propietarios = [];

 async function listarPropietarios () {
    try {
        const respuesta = await fetch(url);
        const propietariosDelServer =  await respuesta.json();
        if(Array.isArray(propietariosDelServer)){
            propietarios = propietariosDelServer;
        }
        if(propietarios.length) {
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
            
            Array
            .from(document.getElementsByClassName('editar'))
            .forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
            Array
            .from(document.getElementsByClassName('eliminar'))
            .forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
            return;
            }else {
                listaPropietario.innerHTML =
                `<tr>
                    <td colspan="5">No hay Propietarios</td>
                </tr>`
            };
    } catch (error) {   
        console.log({ error });
        alert(error);
    } 
}

 async function enviarDatos(e) {
    e.preventDefault();

    try {
        const datos = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            telefono: inputTelefono.value
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
                listarPropietarios();
                resetModal();
            } 
    } catch (error) {
        console.log({ error });
        alert(error);
    }
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
    const urlEnvio = `${url}/${index}`;
    return  async function clickEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
                mode: 'cors',
            })
            if (respuesta.ok) {
                listarPropietarios();
            }
        } catch (error) {
            console.log({ error });
            alert(error);
        }
    }
}

listarPropietarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;