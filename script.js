let n, ejeX, ejeY;

//Solicitar tamaño del tablero
do {
    n = parseInt(prompt("Ingrese el tamaño del tablero (debe ser un número entero entre 1 y 19):"));
} while (isNaN(n) || n < 1 || n > 19);//validar que sea numero y este entre 1 y 19, mas de 19 traban la pagina

//Solicitar posición en X
do {
    ejeX = parseInt(prompt(`Ingrese la posición en X de la primera reina (debe ser un número entero entre 1 y ${n}):`));
} while (isNaN(ejeX) || ejeX < 1 || ejeX > n);

//Solicitar posición en Y
do {
    ejeY = parseInt(prompt(`Ingrese la posición en Y de la primera reina (debe ser un número entero entre 1 y ${n}):`));
} while (isNaN(ejeY) || ejeY < 1 || ejeY > n);

const divSoluciones = document.querySelector('#soluciones');

let soluciones = []; // Arreglo para guardar todas las soluciones como matriz
let solucionesXY = 0; // Numero de soluciones con una reina en tablero[x][y]
let totalSoluciones = 0; //Numero de soluciones

// Inicializar el tablero en 0s
let tablero = [];
for (let i = 0; i < n; i++) {
  tablero[i] = [];
  for (let j = 0; j < n; j++) {
    tablero[i][j] = 0;
  }
}

//Funcion principal
function buscarSoluciones(tablero, columna) {
  //Verificar si se ha buscado en todas las columnas
  if (columna >= n) {
    totalSoluciones++;
    let solucion = [];
    for (let i = 0; i < n; i++) {
      solucion.push(tablero[i].slice()); //Guardar una copia de la fila
    }
    if (solucion[ejeY - 1][ejeX - 1] === 1) {
      solucionesXY++;
      soluciones.push(solucion);
    }
    return true;
  }

  let res = false;
  for (let i = 0; i < n; i++) {
    //comprobar si se puede poner una reina o no en esta posicion
    if (comprobarCasillas(tablero, i, columna)) {
      //colocar la reina
      tablero[i][columna] = 1;
      res = buscarSoluciones(tablero, columna + 1) || res;

      // Si n es mayor que 10 y se encuentra una solucion se detiene la busqueda
      if (n > 10 && solucionesXY > 0) {
        return true;
      }
      //Quitar la reina
      tablero[i][columna] = 0;
    }
  }

  return res;
}

function comprobarCasillas(tablero, fila, columna) {
  for (let i = 0; i < columna; i++) {
    if (tablero[fila][i] === 1) {
      return false;
    }
  }

  //Verificar las diagonales
  for (let i = fila, j = columna; i >= 0 && j >= 0; i--, j--) {
    if (tablero[i][j] === 1) {
      return false;
    }
  }
  for (let i = fila, j = columna; i < n && j >= 0; i++, j--) {
    if (tablero[i][j] === 1) {
      return false;
    }
  }

  return true;
}
//Mandar llamar funcion principal
buscarSoluciones(tablero, 0);
// Mensaje si no hay soluciones
if (totalSoluciones === 0) {
  alert("No hay solución para N = " + n);
} else {
    //imprimir soluciones
    soluciones.forEach((solucion) => {
    solucion.forEach((row) => {
      divSoluciones.innerHTML += "[" + row.join("][") + "]<br>";
    });
    divSoluciones.innerHTML += "<br>";
  });

  //mensaje cuando hay soluciones para tablero de N tamaño pero ninguna tiene una reina en (x,y)
  if (solucionesXY === 0) {
    alert(
      `No hay ninguna solucion para N = ${n} con una reina en (${ejeX},${ejeY})`
    );
  } else {
    if (n > 10) {//si N>10, decir si hay o no solucion
      alert(
        `Hay al menos una solucion para N= ${n} que contenga una reina en las coordenadas (${ejeX},${ejeY})`
      );
    } else {//si N<=10, mostrar cuantas soluciones hay
      alert(
        `El número de soluciones para N= ${n} que contienen una reina en las coordenadas (${ejeX},${ejeY}) es: ${solucionesXY}`
      );
    }
  }
}
