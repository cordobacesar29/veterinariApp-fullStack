const listaPacientes = document.getElementById('lista-pacientes');
const url = 'http://localhost:5000/consultas';

let consultas = [];

async function listarConsultas() {
    try {
        const respuesta = await fetch(url);
        const consultasDelServidor =  await respuesta.json();
        if(Array.isArray(consultasDelServidor)) {
            consultas = consultasDelServidor;
        }
        if(respuesta.ok) {
            const htmlConsultas = consultas.map((consulta, indice) =>
                `<tr>
                <th scope="row">${indice}</th>
                <td>${consulta.mascota}</td>
                <td>${consulta.veterinaria}</td>
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
        
    }
}
listarConsultas();


/*
    {
        mascota: 0,
        veterinaria:0,
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        historia: '',
        diagnostico: ''
    }
*/