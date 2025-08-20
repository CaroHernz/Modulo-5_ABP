// Mostrar año actual:
const anioActual = document.getElementById('anioActual');
anioActual.textContent = new Date().getFullYear()

//Fecha:
function formatoFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    return fecha.toLocaleDateString('es-CL', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })
}
function proximoFeriado(feriados){
    const hoy = new Date();
    const hoyActual = new Date(hoy.getFullYear(),hoy.getMonth(), hoy.getDate())
    const proximoFeriado = feriados.find(feriado => {
        const fechaFeriado = new Date(feriado.date + 'T00:00:00');
        return fechaFeriado >= hoyActual;
    })

    if(!proximoFeriado) {
        return {dias:null, mensaje: "No hay más feriados este año"}
    }
    const fechaProximoFeriado = new Date(proximoFeriado.date +'T00:00:00');
    const diferencia = fechaProximoFeriado-hoyActual;
    const diasRestantes = Math.ceil(diferencia/(1000*60*60*24))
    return {
        dias: diasRestantes, feriado:proximoFeriado, fecha:fechaProximoFeriado
    }
}

function crearTablaFeriados(feriados) {
    feriados.sort((a,b)=> new Date(a.date)-new Date(b.date));
    anio =  new Date().getFullYear();
    let tablaHTML = `
    <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Irrenunciable</th>
                    </tr>
                </thead>
                <tbody>
    `;
    feriados.forEach(feriado => {
        tablaHTML += `
        <tr>
                <td>${formatoFecha(feriado.date)}</td>
                <td>${feriado.title}</td>
                <td>${feriado.type}</td>
                <td>${feriado.inalienable ? 'Sí' : 'No'}</td>
        </tr>
        `
    });
    tablaHTML += `
                </tbody>
            </table>
        </div>
        <h4 class="text-muted text-center mt-3">El Año ${anio} tiene en total <strong>${feriados.length}</strong> feriados</h4>
    `;
    const infoProximoFeriado = proximoFeriado(feriados);
    tablaHTML += `<h3 class="text-muted text-center mt-3">Faltan <strong>${infoProximoFeriado.dias}</strong> días para el próximo feriado</h3>`
    
    return tablaHTML;
}



// API feriados:
const feriadosContainer = document.getElementById('feriados-container');
const options = {
    method: 'GET', 
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

function cargarFeriados() {
    feriadosContainer.style.display = 'none';
    fetch('https://api.boostr.cl/holidays.json', options)
  .then(response => {
    if(!response.ok) throw new Error(`Error HTTP: ${response.status}`)
    return response.json()})
  .then(data => {
    console.log('Datos recibidos:', data)
    if (data && data.data && Array.isArray(data.data)) {
        const feriados = data.data;
        if (feriados.length > 0) {
            feriadosContainer.innerHTML = crearTablaFeriados(feriados);
            feriadosContainer.style.display = 'block'
        } else {
            throw new Error('No se encontraron feriados')
        }
    } else {
        throw new Error('Formato de respuesta inválido')
    }
  })
  .catch(err => console.error(err));
}

// Cargar feriados cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    // Cargar feriados
    cargarFeriados();
    
    // Opcional: Actualizar cada año automáticamente
    setInterval(() => {
        const newYear = new Date().getFullYear();
        if (newYear !== parseInt(anioActualElement.textContent)) {
            anioActualElement.textContent = newYear;
            cargarFeriados();
        }
    }, 86400000); // Verificar cada día
});
