const listaMascota = document.getElementById('lista-mascotas');

const selectTipo = document.getElementById('tipo');
const inputNombre = document.getElementById('input-nombre');
const inputPropietario = document.getElementById('input-propie');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('guardar');
const indice = document.getElementById('indice');
const url = 'http://localhost:5000/mascotas';

let mascotas = [];

 async function listarMascotas() {
    try {
        const respuesta = await fetch(url);
        const mascotasDelServer =  await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }
        if(mascotas.length) {
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
            Array
                .from(document.getElementsByClassName('editar'))
                .forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
            Array
                .from(document.getElementsByClassName('eliminar'))
                .forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
                return;
        } else {
            listaMascota.innerHTML =
                `<tr>
                    <td colspan="5">No hay mascotas</td>
                </tr>`
        }

    } catch (error) {
        console.log({ error });
        alert(error);
    }
}

 async function enviarDatos(e) {
    e.preventDefault();
    try {
        const datos = {
        tipo: selectTipo.value,
        nombre: inputNombre.value,
        propietario: inputPropietario.value
        };
        let method = 'POST';
        let urlEnvio = url;
        const action = btnGuardar.innerHTML;
        if(action === 'Editar') {
            method = 'PUT';
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
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
            listarMascotas();
            resetModal();
        }
    }
    catch(error) {
        console.log({ error });
        alert(error);
    }
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
    try {
        const urlEnvio = `${url}/${index}`;
        return async function clickEliminar() {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
            })
            if (respuesta.ok) {
                listarMascotas();
                resetModal();
            }
        }
    }catch (error) {
        console.log({ error });
        alert(error);
    }
    
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;