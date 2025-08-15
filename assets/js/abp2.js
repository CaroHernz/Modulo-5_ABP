// Cargar datos desde JSON
const cargarDatos = async() => {
    try {
        const response = await fetch('assets/data/abp2.json');
        if(!response.ok) throw new Error('Error al cargar datos');
        const data = await response.json();
        return data.rutas;
    } catch(error) {
        console.error('Error', error);
        return [];
    }
}

// Eliminar duplicados
const procesarEntregas = (entregas) => {
    const mapa = new Map();
    entregas.forEach(({direccion, paquetes})=> {
        mapa.set(direccion,(mapa.get(direccion) || 0) + paquetes);
    })
    return [...mapa.entries()]
        .sort((a,b) => b[1]-a[1])
        .map(([direccion,paquetes])=>({direccion,paquetes}))
}

const resultadoReporte = (entregas) => {
    return `
    <section class="bsb-timeline-2 py-2">
        <div class="container-fluid">
            <div class="row justify-content-start">
                <div class="col-12 col-lg-10">
                    <ul class="timeline">
                        ${entregas.map(({direccion, paquetes}) => `
                        <li class="timeline-item">
                            <span class="timeline-icon ${paquetes > 3 ? 'bg-danger' : 'bg-info'}">
                                <i class="bi bi-${paquetes > 3 ? 'exclamation-lg' : 'check-lg'} text-white"></i>
                            </span>
                            <div class="timeline-body">
                                <div class="timeline-content">
                                    <div class="card border-0 bg-light rounded">
                                        <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-start">
                                            <h5 class="card-subtitle text-secondary mb-1">Prioridad ${paquetes > 3 ? 'ALTA' : 'normal'}</h5>
                                            <span class="badge fs-6 ${paquetes > 3 ? 'bg-danger' : 'bg-info'}">${paquetes} paquete(s)</span>
                                        </div>
                                            <h4 class="card-title mb-2">${direccion}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </section>
    `;
};
document.getElementById('cargarDatos').addEventListener('click', async () => {
    const resultadoDiv = document.getElementById('resultadoReporte');    
    resultadoDiv.innerHTML = `
    <div id="cargandoIndicator" class="d-flex mt-5 justify-content-center">
        <div class="spinner-border text-primary" role="status"></div>
        <h4 class="ms-2 text-primary">Cargando datos...</h4>
    </div>    
    `;
    
    const datos = await Promise.all( [
        cargarDatos(),
        new Promise(resolve => setTimeout(resolve, 1500))
    ]).then(([datos]) => datos);
    console.log('Datos cargados:', datos);

    resultadoDiv.innerHTML = `
            <div id="successIndicator" class="d-flex justify-content-center align-items-center mt-5">
                <div class="me-3">
                    <i class="bi bi-check-circle-fill text-success fa-3x"></i>
                </div>
                <div class="d-flex flex-column">
                <h4 class="text-success ms-2">¡Datos cargados!</h4>
                <span class="text-muted small">${datos.length} registros de entregas listos</span>
                </div>
            </div>
        `;

    setTimeout(() => {
        const element = document.getElementById('successIndicator');
        if (element) element.style.opacity='0.5'}, 10000);
});
document.getElementById('procesarRutas').addEventListener('click', async () => {
    const datos = await cargarDatos();
    const entregasProcesadas = procesarEntregas(datos);
    document.getElementById('resultadoReporte').innerHTML = resultadoReporte(entregasProcesadas);
});