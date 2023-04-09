let month = new Date().getMonth();
window.getMonth = () => { return month};
const getToday = () => {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  const formatedDate = `${year}-${month}-${day}`;
  console.log(formatedDate);
  return formatedDate;
}

const isAvailable = (json, month, day) => {
  const fechaBuscada = `2023-${month<10 ? "0"+month : month}-${day<10 ? "0"+day : day}`;
  const dia = json.find(dayJSON => dayJSON.fecha == fechaBuscada);
  console.log(fechaBuscada,dia);
  return dia ? dia.disponibles : true;
}

const getTodayDateInGmtMinus6 = () => {
  const now = new Date();
  const gmtMinus6Date = new Date(now.valueOf() - 6 * 60 * 60 * 1000); // Obtener la fecha en GMT-6
  return gmtMinus6Date.getDate();
}
const getActualMonth = () => {
  const now = new Date();
  const month = new Date(now.valueOf() - 6 * 60 * 60 * 1000); // Obtener la fecha en GMT-6
  return month.getMonth();
}

async function generateCalendar(date) {
  console.log(month);
  const table = document.getElementById("calendarDays");
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // Eliminar la tabla anterior
  table.innerHTML = "";

  const appointments = await getAppointmentsByDay(getToday());
  console.log(appointments)
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
        const day = daysInLastMonth - firstDayOfWeek + j + 1;
        // Celda vacía para los días del mes anterior
        cell.textContent = day;
        cell.classList.add("empty");
        cell.setAttribute("id", "bef_day_" + day);
        cell.setAttribute("onclick", "openDay(id)");
      } else if (dayOfMonth > daysInMonth) {
        const day = dayOfMonth - daysInMonth;
        // Celda vacía para los días del mes siguiente
        cell.textContent = day;
        cell.classList.add("empty");
        cell.setAttribute("id", "aft_day_" + day);
        cell.setAttribute("onclick", "openDay(id)");
        dayOfMonth++;
      } else {
        cell.setAttribute("id", "day_" + dayOfMonth);
        cell.setAttribute("onclick", "openDay(id)");
        const today = getTodayDateInGmtMinus6();
        if(month == getActualMonth()){
          if(today > dayOfMonth)
            cell.classList.add("empty");
          if(today == dayOfMonth)
            cell.classList.add("today");
          if(today < dayOfMonth)
            cell.classList.add("dayOfMonth");
          }
        else cell.classList.add("dayOfMonth");
        if(!isAvailable(appointments.days,(month+1), dayOfMonth))
          cell.classList.add("empty")
        // Celda con el número del día
        cell.textContent = dayOfMonth;
        dayOfMonth++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  console.log("terminando")
  document.getElementById("loadingHTML").style.display = "none";
  document.getElementById("calendarSection").classList.add("calendarSectionVisible");
}

window.generateNextMonthCalendar = () => {
  const date = new Date();
  month = month == 11 ? 0 : month + 1;
  date.setMonth(month);
  const nextMonth = date.toLocaleString("default", { month: "long" });
  document.getElementById("monthTitle").textContent = nextMonth;
  generateCalendar(date);
}

window.generateLastMonthCalendar = () => {
  const date = new Date();
  month = month == 0 ? 11 : month - 1;
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
