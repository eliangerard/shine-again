let month = new Date().getMonth();

function generateCalendar(date) {
    console.log(month);
  const table = document.getElementById("calendar");
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // Eliminar la tabla anterior
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Crear el encabezado de la tabla con los días de la semana
  const headerRow = document.createElement("tr");
  daysOfWeek.forEach(day => {
    const cell = document.createElement("th");
    cell.textContent = day;
    headerRow.appendChild(cell);
  });
  table.appendChild(headerRow);

  // Obtener el número de días en el mes actual
  date.setDate(1);
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Obtener el número de días en el mes anterior
  const lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const daysInLastMonth = lastMonthDate.getDate();

  // Restar 1 al valor retornado por getDay() para que el calendario empiece en lunes
  let firstDayOfWeek = date.getDay() - 1;
  if (firstDayOfWeek === -1) {
    firstDayOfWeek = 6;
  }

  // Crear las celdas del calendario con los números de día
  let dayOfMonth = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < firstDayOfWeek) {
        // Celda vacía para los días del mes anterior
        cell.textContent = daysInLastMonth - firstDayOfWeek + j + 1;
        cell.classList.add("empty");
      } else if (dayOfMonth > daysInMonth) {
        // Celda vacía para los días del mes siguiente
        cell.textContent = dayOfMonth - daysInMonth;
        cell.classList.add("empty");
        dayOfMonth++;
      } else {
        // Celda con el número del día
        cell.textContent = dayOfMonth;
        dayOfMonth++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

window.generateNextMonthCalendar = () => {
  const date = new Date();
  month = month == 11 ? 0 : month + 1;
  date.setMonth(month);
  const nextMonth = date.toLocaleString("default", { month: "long" });
  document.getElementById("monthTitle").textContent = nextMonth;
  generateCalendar(date);
}

const nextMonthBtn = document.getElementById("nextMonthBtn");

// Generar el calendario para el mes actual al cargar la página
const currentDate = new Date();
window.generar = () => {
  console.log("Hola estoy generando")
  generateCalendar(currentDate);

}
