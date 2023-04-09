function getDate() {
    const fecha = new Date();
    const opciones = { month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function getDateByMonth(mes, dia) {
    const fecha = new Date();
    fecha.setMonth(mes - 1); // Restamos 1 al mes porque en JavaScript los meses empiezan en 0 (enero es 0, febrero es 1, etc.)
    fecha.setDate(dia);
    const opciones = { month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
  }