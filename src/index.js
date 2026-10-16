
import { registrosOriginales } from "./datos.js";
import {
  generarReporte,
  buscarPrimerRegistroPorMaterial,
  obtenerPosicionTarjeta,
  ordenarTarjetas
} from "./analizador.js";

console.log("==================================================");
console.log(" TAREA #1: ANALIZADOR DE JORNADAS DE ACOPIO");
console.log("==================================================\n");

// 1. Respaldar estado inicial para probar inmutabilidad
const copiaOriginalAntes = JSON.stringify(registrosOriginales);

// 2. Ejecución con datos normales
console.log("--- 1. REPORTE CON DATOS COMPLETOS (INCLUYENDO CASOS INVÁLIDOS) ---");
const reportePrincipal = generarReporte(registrosOriginales, "modo-detallado", "v1.0");

console.log("Validación de Colección:", reportePrincipal.validacion);
console.log("Cantidad de Códigos Únicos (Set size):", reportePrincipal.codigosUnicos.size);
console.log("Materiales Disponibles:", reportePrincipal.materialesDisponibles);
console.log("¿Existe algún registro contaminado? (some):", reportePrincipal.hayContaminados);

console.log("\nTotales por Material (Map convertido a Objeto):");
console.log(Object.fromEntries(reportePrincipal.totalesPorMaterial));

console.log("\nTarjetas Generadas (Primeras 2):");
console.log(reportePrincipal.tarjetas.slice(0, 2));

// Ordenamiento dinámico sobre copia
const tarjetasOrdenadas = ordenarTarjetas(reportePrincipal.tarjetas, "pesoKg", false);
console.log("\nTarjetas Ordenadas por Peso (Descendente):");
tarjetasOrdenadas.forEach(t => console.log(` - ${t.etiqueta}`));

// Consultas (find, findIndex)
console.log("\n--- CONSULTAS DE REGISTROS Y POSICIONES ---");
const busquedaExistente = buscarPrimerRegistroPorMaterial(reportePrincipal.tarjetas, "Cartón");
console.log("Búsqueda de material 'Cartón' (find):", busquedaExistente);

const posicionTarjeta = obtenerPosicionTarjeta(reportePrincipal.tarjetas, "REC-003");
console.log("Posición de la tarjeta 'REC-003' (findIndex):", posicionTarjeta);

// Consultas sin coincidencia (debe retornar undefined y -1)
const busquedaInexistente = buscarPrimerRegistroPorMaterial(reportePrincipal.tarjetas, "Platino");
console.log("Búsqueda de material inexistente 'Platino':", busquedaInexistente); 

const posicionInexistente = obtenerPosicionTarjeta(reportePrincipal.tarjetas, "REC-999");
console.log("Búsqueda de posición de código inexistente 'REC-999':", posicionInexistente); 

// 3. Variación con Colección Vacía
console.log("\n--- 2. VARIACIÓN CON COLECCIÓN VACÍA ---");
const reporteVacio = generarReporte([]);
console.log("Validación de colección vacía:", reporteVacio.validacion);
console.log("Tarjetas en colección vacía:", reporteVacio.tarjetas);
console.log("Totales por material vacíos:", Object.fromEntries(reporteVacio.totalesPorMaterial));

// 4. Comprobación final de inmutabilidad
console.log("\n--- 3. VERIFICACIÓN DE INMUTABILIDAD ---");
const copiaOriginalDespues = JSON.stringify(registrosOriginales);
const entradaIntacta = copiaOriginalAntes === copiaOriginalDespues;
console.log("¿El arreglo original de entrada permaneció intacto?:", entradaIntacta);
console.log("==================================================");