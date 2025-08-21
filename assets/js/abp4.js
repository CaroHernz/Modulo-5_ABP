//Datos:
const datosUsuario={
    nombre: "Ana Antilao",
    correo: "anita.antilao@correo.cl",
    ciudad: "Rancagua",
    pais: "Chile"
}

//Callback
function obtenerUsuarioCallback(callback){
    console.log("Iniciando callback...");
    setTimeout(()=> {
        console.log("Callback cargado");
        callback(null, datosUsuario);
    }, 2000);
}
function ejecutarCallback() {
    const infoUsuario = document.getElementById('userInfo');
    const resultado = document.getElementById('resultado');
    const card = document.getElementById('cardUsuario');

    obtenerUsuarioCallback((error,usuario)=> {
        if(usuario) {
            console.log("Nombre: " + usuario.nombre)
            console.log("Correo: " + usuario.correo);
            card.classList.remove('visually-hidden')
            resultado.innerHTML = '';
            infoUsuario.innerHTML= `<p>
            Nombre: ${usuario.nombre}</p>
            <p>Correo: ${usuario.correo}
            </p>`
        }else{
            console.log(error);
            resultado.innerText = "Error al obtener datos del usuario";
        }
    })
}
//Promesa
function obtenerUsuarioPromesa(){
    console.log("Iniciando promesa...");
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            //Simula error:
            if (Math.random() <0.1) {
                console.log("error al cargar promesa...")
                reject(new Error("Error al cargar promesa"))
            } else{
                console.log("Promesa resuelta")
                resolve(datosUsuario);
            }
        }, 2000)
    })
}

function ejecutarPromesa(){
    const infoUsuario = document.getElementById('userInfo');
    const resultado = document.getElementById('resultado');
    const card = document.getElementById('cardUsuario');

    obtenerUsuarioPromesa()
        .then(usuario => {
            console.log("Nombre: " + usuario.nombre)
            console.log("Ciudad: " + usuario.ciudad);
            card.classList.remove('visually-hidden')
            resultado.innerHTML = '';
            infoUsuario.innerHTML= `<p>
            Nombre: ${usuario.nombre}</p>
            <p>Ciudad: ${usuario.ciudad}, ${usuario.pais}
            </p>`
        })
        .catch(error => {
            console.log("error en promesa", error.message);
            resultado.innerText = "Error al obtener datos del usuario con promesa: " + error.message;
        })
}
//Async/Await
async function obtenerUsuarioAsync(){
    console.log("Iniciando async/await...")
    try {
        const usuario = await obtenerUsuarioPromesa();
        return usuario;
    } catch(error){
        throw error;
    }
}

async function ejecutarAsyncAwait(){
    const infoUsuario = document.getElementById('userInfo');
    const resultado = document.getElementById('resultado');
    const card = document.getElementById('cardUsuario');
    try{
        const usuario = await obtenerUsuarioAsync();
        console.log("Nombre: " + usuario.nombre);
        console.log("Correo: " + usuario.correo);
        console.log("Ciudad: " + usuario.ciudad);
        card.classList.remove('visually-hidden')
        resultado.innerHTML = '';
        infoUsuario.innerHTML= `<p>
            Nombre: ${usuario.nombre}</p>
            <p>Correo: ${usuario.correo}
            </p>
            <p>Ciudad: ${usuario.ciudad}
            </p>`
    } catch(error){
        console.log("error en async/await", error.message);
        resultado.innerText = "Error al obtener datos del usuario con async/await", error.message;
    }
}