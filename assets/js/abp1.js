// Funciones constructoras
function Paciente(nombre, edad, rut, diagnostico) {
    var _nombre = nombre;
    var _edad = edad;
    var _rut = rut;
    var _diagnostico = diagnostico;

    //getters
    this.getNombre = function() {return _nombre}
    this.getEdad = function() {return _edad}
    this.getRut = function() {return _rut}
    this.getDiagnostico = function() {return _diagnostico}
    // setters
    this.setNombre = function(newNombre) {_nombre = newNombre;}
    this.setEdad = function(newEdad) {_edad = newEdad}
    this.setRut = function(newRut) {_rut = newRut}
    this.setDiagnostico = function(newDiagnostico) {_diagnostico=newDiagnostico}
}
function Consultorio(nombre, pacientes) {
    this.nombre = nombre;
    this.pacientes = pacientes || [];
}
//Método para buscar pacientes usando prototype
Consultorio.prototype.buscarNombrePaciente = function(nombrePaciente) {
    return this.pacientes.filter(function(paciente) {
        return paciente.getNombre().toLowerCase().includes(nombrePaciente.toLowerCase())
    })
}
Consultorio.prototype.buscarPacientes = function() {
    return this.pacientes;
}

// Instanciar pacientes y consultorio:
var paciente1 = new Paciente("Antonia Antilao", 23,"20345644-3","Desnutrición");
var paciente2 = new Paciente("Bastián Bustamante",12,"25647984-2","Neumonitis viral");
var paciente3 = new Paciente("Carla Cáceres",40,"12345654-9", "Úlcera Gástrica");
var paciente4 = new Paciente("David Donoso",48,"12054977-5","Diabetes Mellitus");
var paciente5 = new Paciente("Ernesto Escobar",35,"17126985-4","Dolor Lumbar");
var paciente6 = new Paciente("Fernanda Fuelles",15,"24976120-0","Alergía estacional");
var paciente7 = new Paciente("Gerardo Gómez",27,"20984145-3","Luxación de tobillo");
var paciente8 = new Paciente("Héctor Huerta",62,"10345987-9", "Hipertensión Arterial");
var paciente9 = new Paciente("Ivonne Inostroza", 32,"18752098-1", "Gastroenteritis crónica")
var paciente10 = new Paciente("Juana Jiménez", 82, "6542988-2", "Epilepsia, Demencia Senil")

var consultorio1 = new Consultorio("Santa Blanca", [paciente1,paciente2,paciente3,paciente4,paciente5]);
var consultorio2 = new Consultorio("Los Montes", [paciente6,paciente7,paciente8,paciente9,paciente10])
var consultorios = [consultorio1,consultorio2]

function CardPaciente(listaPacientes) {
    var container = document.getElementById("pacientes-container");
    container.innerHTML = "";

    if (listaPacientes === undefined || listaPacientes.length === 0) {
        container.innerHTML = "<h3 class='text-center text-secondary fst-italic fw-light mt-5'>No se encontraron pacientes.</h3>";
        return;
    }

    for(var i = 0; i < listaPacientes.length; i++) {
        var paciente = listaPacientes[i];
        var cardHTML = '\
        <div class="card mb-3 border-custom shadow-sm">\
            <div class="row g-0">\
                <div class="col-md-4 text-center">\
                    <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" \
                         class="img-fluid rounded-circle imagen_card" alt="Imagen del paciente">\
                </div>\
                <div class="col-md-8">\
                    <div class="card-body">\
                        <h5 class="card-title">Nombre del paciente: </h5>\
                        <h4 class="card-title-nombre">' + paciente.getNombre() + '</h4>\
                        <p class="card-text"><strong>Edad:</strong> ' + paciente.getEdad() + ' años</p>\
                        <p class="card-text"><strong>RUT:</strong> ' + paciente.getRut() + '</p>\
                        <p class="card-text"><strong>Diagnóstico:</strong> ' + paciente.getDiagnostico() + '</p>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ';
        container.innerHTML += cardHTML;
    }
}
document.getElementById("select-consultorio").addEventListener("change", function(e){
    var index = e.target.value;
    var container = document.getElementById("pacientes-container");
    var nombreConsultorio = document.getElementById("nombre-consultorio");
    var busqueda = document.getElementById("busqueda-paciente");

    if(index !== "") {
        var consultorioSeleccionado = consultorios[parseInt(index)];
        nombreConsultorio.textContent = consultorioSeleccionado.nombre;
        var listaPacientes = consultorioSeleccionado.buscarPacientes();
        CardPaciente(listaPacientes);
        busqueda.value = "";
    } else {
        container.innerHTML = "<h3 class='text-center text-secondary fst-italic fw-light mt-5'>Seleccione un Consultorio</h3>";
        nombreConsultorio.textContent = "";
        busqueda.value = "";
    }

    });

document.getElementById("busqueda-paciente").addEventListener("input", function(e) {
    var busqueda = e.target.value.toLowerCase().trim();
    var selectConsultorio = document.getElementById("select-consultorio");
    var index = selectConsultorio.value;

    if (index === "") {return}

    var consultorioActual = consultorios[parseInt(index)];
    var pacientesFiltrados = consultorioActual.buscarNombrePaciente(busqueda);
    CardPaciente(pacientesFiltrados)
});
