
const registrosOriginales = [
    { codigo: "REC-001", material: "Plástico", pesoKg: 15.5, turno: "Matutino", contaminado: false },
    { codigo: "REC-002", material: "Cartón", pesoKg: 40.0, turno: "Vespertino", contaminado: false },
    { codigo: "REC-003", material: "Vidrio", pesoKg: 25.0, turno: "Matutino", contaminado: false },
    { codigo: "REC-004", material: "Plástico", pesoKg: 12.0, turno: "Vespertino", contaminado: false },
    { codigo: "REC-005", material: "Metal", pesoKg: 30.5, turno: "Matutino", contaminado: false },
    { codigo: "REC-006", material: "Cartón", pesoKg: 18.2, turno: "Matutino", contaminado: false },
    { codigo: "REC-007", material: "Papel", pesoKg: 8.5, turno: "Vespertino", contaminado: false },
    // Registro inválido intencionalmente (peso negativo / tipo incorrecto)
    { codigo: "REC-008", material: "", pesoKg: -5, turno: "Matutino", contaminado: "no-es-booleano" }
  ];
  
  export { registrosOriginales };