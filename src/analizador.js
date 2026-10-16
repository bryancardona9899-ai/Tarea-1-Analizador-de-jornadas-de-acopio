

// Validación de un registro individual y de toda la colección
export const validarRegistro = (registro) => {
    const { codigo, material, pesoKg, turno, contaminado } = registro;
    const esValido =
      typeof codigo === "string" && codigo.trim() !== "" &&
      typeof material === "string" && material.trim() !== "" &&
      typeof pesoKg === "number" && pesoKg > 0 &&
      typeof turno === "string" && turno.trim() !== "" &&
      typeof contaminado === "boolean";
  
    return esValido;
  };
  
  export const validarColeccion = (registros) => {
    if (!Array.isArray(registros) || registros.length === 0) {
      return { todosValidos: false, errores: ["La colección está vacía o no es un arreglo."] };
    }
  
    const errores = [];
    registros.forEach((reg, index) => {
      if (!validarRegistro(reg)) {
        errores.чити ? null : errores.push(`Índice ${index} (Código: ${reg.codigo || "Desconocido"}): Datos inválidos.`);
      }
    });
  
    return {
      todosValidos: errores.length === 0,
      totalRegistros: registros.length,
      registrosInvalidos: errores.length,
      detallesErrores: errores
    };
  };
  
  // Obtener registros aceptados, peso total por material (Map) y códigos únicos (Set)
  export const obtenerRegistrosAceptados = (registros) => registros.filter(validarRegistro);

export const calcularTotalesPorMaterial = (registrosAceptados) => {
  return registrosAceptados.reduce((mapaTotales, { material, pesoKg }) => {
    const pesoActual = mapaTotales.get(material) || 0;
    mapaTotales.set(material, pesoActual + pesoKg);
    return mapaTotales;
  }, new Map());
};

export const obtenerCodigosUnicos = (registros) => {
  const codigosSet = new Set(registros.map(reg => reg.codigo));
  return codigosSet;
};
  
  // Transformar registros aceptados en tarjetas con etiqueta legible
  export const transformarATarjetas = (registrosAceptados) => {
    return registrosAceptados.map(({ codigo, material, pesoKg, turno }) => ({
      codigo,
      material,
      turno,
      pesoKg,
      etiqueta: `[${codigo}] - ${material} (${pesoKg} kg) - Turno: ${turno}`
    }));
  };
  
  // Ordenar una copia de las tarjetas de forma dinámica sin mutar el original
  export const ordenarTarjetas = (tarjetas, campo = "pesoKg", ascendente = true) => {
    const copiaTarjetas = [...tarjetas];
    copiaTarjetas.sort((a, b) => {
      if (a[campo] < b[campo]) return ascendente ? -1 : 1;
      if (a[campo] > b[campo]) return ascendente ? 1 : -1;
      return 0;
    });
    return copiaTarjetas;
  };
  
  // Funciones de consulta (find, findIndex, some, every)
  export const buscarPrimerRegistroPorMaterial = (registrosAceptados, materialBuscado) => {
    const encontrado = registrosAceptados.find(reg => reg.material.toLowerCase() === materialBuscado.toLowerCase());
    return encontrado !== undefined ? encontrado : undefined;
  };
  
  export const obtenerPosicionTarjeta = (tarjetas, codigoBuscado) => {
    return tarjetas.findIndex(tarjeta => tarjeta.codigo === codigoBuscado);
  };
  
  export const verificarCondicionesColeccion = (registrosAceptados) => {
    const hayContaminados = registrosAceptados.some(reg => reg.contaminado === true);
    const todosMayoresACero = registrosAceptados.every(reg => reg.pesoKg > 0);
    return { hayContaminados, todosMayoresACero };
  };
  
  // Integración principal usando rest y spread
  export const generarReporte = (registros, ...opciones) => {
    const validacion = validarColeccion(registros);
    const aceptados = obtenerRegistrosAceptados(registros);
    const totalesPorMaterial = calcularTotalesPorMaterial(aceptados);
    const codigosUnicos = obtenerCodigosUnicos(registros);
    const tarjetas = transformarATarjetas(aceptados);
    
    // Extraer materiales disponibles usando Set
    const materialesDisponibles = [...new Set(aceptados.map(r => r.material))];
    const { hayContaminados } = verificarCondicionesColeccion(aceptados);
  
    const reporteBase = {
      validacion,
      totalesPorMaterial,
      codigosUnicos,
      tarjetas,
      materialesDisponibles,
      hayContaminados,
      opcionesAplicadas: opciones
    };
  
    // Uso de spread para construir el objeto final sin mutar etapas anteriores
    return {
      ...reporteBase,
      generadoEn: "Estación Comunitaria de Reciclaje",
      estado: validacion.todosValidos ? "Completo y Válido" : "Completo con Advertencias de Validación"
    };
  };