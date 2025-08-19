//Problema 1:
const resultado = document.getElementById('resultadoProblema1')

function problema1() {
    resultado.innerHTML = '';
    saludar(preguntar);
}

function saludar(callback) {
    const saludo = 'Buenos días';
    console.log(saludo);
    resultado.innerHTML = `<p class="fs-5">${saludo}</p>`
    setTimeout(() => {
        callback()
    },1000)
}
function preguntar() {
    const pregunta = '¿Quieres un café?';
    console.log(pregunta);
    resultado.innerHTML += `<p class="fs-5">${pregunta} ☕</p>`

}

//Problema 2:
const resultado2 = document.getElementById('resultadoProblema2');
const inputN1 = document.getElementById('numero1')
const inputN2 = document.getElementById('numero2')

function operaciones(a,b,minora,potencias){
    const diferencia = a-b;
    const elevado=Math.pow(a,b);
    minora(a,b, diferencia);         //invocamos la 1ª función anónima
    potencias(a,b,elevado);         //invocamos la 2ª función anónima
}
function calcularOperaciones() {
    const num1 = (inputN1.value) || 0;
    const num2 = (inputN2.value) || 0;
    resultado2.innerHTML = '';

    if(!Number.isInteger(parseFloat(num1))|| !Number.isInteger(parseFloat(num2))) {
        resultado2.innerHTML= '<p class="text-danger">Por favor ingrese solo números enteros</p>';
        return;
    }
    operaciones(num1, num2, function(a,b,diferencia){
        console.log(`La diferencia entre ${a} y ${b} es: ${diferencia}`)
        resultado2.innerHTML += `<p class="fs-5">La diferencia entre ${a} y ${b} es: <span class="text-primary">${diferencia}</span></p>`
    },
    function(a,b,elevado){
        console.log(`La potencia de ${a} elevada a ${b} es: ${elevado}`)
        resultado2.innerHTML += `<p class="fs-5">La potencia de ${a} elevada a ${b} es: <span class="text-primary">${elevado}</span></p>`
    })

}