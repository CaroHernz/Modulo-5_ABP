<h2 align=center > Módulo 5</h2>
<h1 align=center > Programación Avanzada en JavaScript</h1>

<p align="center"> 
  <a href="#actividad1">Actividad 1</a> | 
	<a href="#actividad2">Actividad 2</a> | 
	<a href="#actividad3">Actividad 3</a> 
</p>

-----

<a name="actividad1">

## Actividad Práctica 1: Orientación a Objetos en JavaScript</a>

**Aprendizaje Esperado:** Utilizar los conceptos fundamentales de la programación orientada a objetos acorde al lenguaje Javascript para resolver un problema simple.

**Problema:** Desarrollar un sistema en JavaScript ES5 para gestionar los datos de pacientes en un consultorio médico. El sistema debe mostrar inicialmente todos los pacientes registrados y luego permitir filtrarlos mediante un método de búsqueda por nombre, cumpliendo con los principios de encapsulamiento mediante el uso de getters y setters.

#### ✔️ El programa debe permitir:

1. **Almacenamiento y gestión** de información de pacientes (nombre, edad, rut y diagnóstico)
2. **Búsqueda** de pacientes por nombre.
3. **Protección de datos** mediante `getters` y `setters` para evitar modificaciones diretas.
4. **Visualización** de todos los pacientes y resultados de búsqueda en la consola del navegador.

#### ⚒️ Requisitos técnicos:
1. Crear el código usando ES5
2. Crear un método mediante la propiedad `prototype` que permita buscar los datos de los usuarios por nombre y otro método que permita mostrar todos los datos de los usuarios registrados.
3. Crear una función constructora para cada objeto.
4. Implementar métodos `getters` y `setters` para poder acceder y modificar los datos de los pacientes
5. Instanciar cada objeto utilizando la instrucción `new`.

<p align="center"> 
  <a href="https://carohernz.github.io/Modulo-5_ABP/ABP1.html">Ver Actividad Práctica 1</a>
</p>

----

<a name="actividad2">

## Actividad 2: Características JavaScript ES6</a>

**Aprendizaje Esperado:** Utilizar las nuevas funcionalidades de la especificación ES6+ para la implementación de un algoritmo Javascript que resuelve un problema planteado.

**Problema:** La empresa ***Express Go*** es un servicio de reparto que tiene un sistema de gestión de rutas que presenta las siguientes deficiencias:

* Direcciones duplicadas en las listas de entrega
* Falta de priorización de rutas con más paquetes
* Reportes confusos para los repartidores
* Compatibilidad limitada: no funciona correctamente en navegadores antiguos

#### 🎯 Objetivo del Proyecto:
Desarrollar un algoritmo en **JavaScript ES6** que:

  * Procese listas de entregas, eliminando duplicados y consolidando paquetes
  * Priorice rutas con mayor cantidad de paquetes
  * Genere reportes legibles
  * Sea compatible con navegadores antiguos usando **Webpack + Babel**

#### ⚒️ Requisitos Funcionales:

1. **Procesamiento de datos:**
  * Eliminar direcciones duplicadas
  * Sumar paquetes por dirección
2. **Priorización:** Ordenar direcciones de mayor a menor cantidad de paquetes
3. **Reporte:** Generar un resumen claro usando *template literals*

#### ⚒️ Requisitos Técnicos:
1. **ES6** (mínimo 8 características)
2. **Webpack** para empaquetar módulos
3. **Babel** para transpilar código a ES5 para compatibilidad

#### 📦 Datos iniciales del proyecto:

````
const entregas = [
  { direccion: "Av. Siempre Viva 742", paquetes: 4 },
  { direccion: "Calle Falsa 123", paquetes: 2 },
  { direccion: "Av. Siempre Viva 742", paquetes: 3 },  // Duplicado
  { direccion: "Pje. Las Rosas 456", paquetes: 5 },
  { direccion: "Calle Falsa 123", paquetes: 1 }        // Duplicado
];
````


<p align="center"> 
  <a href="https://carohernz.github.io/Modulo-5_ABP/ABP2.html">Ver Actividad Práctica 2</a>
</p>

----

<a name="actividad3">

## Actividad 3: JavaScript Asíncrono </a>

**Aprendizaje Esperado:** Reconocer los elementos fundamentales del Domain Object Model y los mecanismos para la manipulación de elementos en un documento html

**Actividad:** Comprender y aplicar ***funciones callback** en JavaScript para controlar el flujo de un programa de manera asíncrona o personalizada.

#### 🎯 Objetivo del Proyecto:

* **Comprender Callbacks:** Demostrar el uso de callbacks en 3 partes: la llamada, la ejecución de la función principal y la ejecución final del callback.
* **Manipulación de Datos:** Utilizar callbacks para realizar operaciones matemáticas (`resta` y `potencia`) y mostrar los resultados de forma dinámica.
* **Adaptabilidad del código:** Modificar una función existente para que las frases de salida (en un `console.log`) se adapten automáticamente a los valores de entrada, en lugar de ser estáticas.

**Problema 1:** Crear una Función Callback Básica

1. **Función Principal:** la función imprime "Buenos días" y luego llama a su función callback
2. **Función Callback:** esta función es pasada como parámetro y que, al ser llamada, imprime la pregunta "¿quieres un café?".

**Problema 2:** Modificar una función `operaciones` con Callbacks

1. **Función Principal (`operaciones`):** recibe 4 parámetros: 2 números (`a` y `b`) y 2 callback (`minora` y `potencias`)
2. **Cálculos:** dentro de la función se debe calcular la diferencia entre `a` y `b`, y la potencia de `a` elevado a `b`
3. **Invocación de Callbacks:** se debe llamar a `minora` con el resultado de la diferencia y a `potencias` con el resultado de la potencia
4. **Modificación del código:** se requiere que las funciones anónimas de callback sean modificadas para que el texto impreso en la consola sea dinámico. En lugar de imprimir `La diferencia es: 2`, debe imprimir `La diferencia entre 5 y 3 es: 2`, adaptándose si los números 5 y 3 cambian. Lo mismo aplica para la potencia.

#### Función `operaciones`:

````
  function operaciones(a,b,minora,potencias){
    var diferencia = a-b;
    var elevado=Math.pow(a,b);
    minora(diferencia);         //invocamos la 1ª función anónima
    potencias(elevado);         //invocamos la 2ª función anónima
  }

  operaciones(5,3,
    function(diferencia){
        console.log("La diferencia es: ",diferencia);
    },
    function(elevado){
        console.log("Elevando se obtiene: ",elevado);
    }
  )
````


<p align="center"> 
  <a href="https://carohernz.github.io/Modulo-5_ABP/ABP3.html">Ver Actividad Práctica 3</a>
</p>

----

#### Creado por
<p align="center"> 
  <a href="https://github.com/CaroHernz">Carolina Hernández</a>
</p>
