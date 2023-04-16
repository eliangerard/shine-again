let month = new Date().getMonth();
window.getMonth = () => { return month };
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
  const fechaBuscada = `2023-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  const dia = json.find(dayJSON => dayJSON.fecha == fechaBuscada);
  console.log(fechaBuscada, dia);
  return dia ? dia.disponibles : true;
}

const getTodayDateInGmtMinus6 = () => {
  const now = new Date();
  return now.getDate();
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
        if (month == getActualMonth()) {
          if (today > dayOfMonth)
            cell.classList.add("empty");
          if (today == dayOfMonth)
            cell.classList.add("today");
          if (today < dayOfMonth)
            cell.classList.add("dayOfMonth");
        }
        else cell.classList.add("dayOfMonth");
        if (!isAvailable(appointments.days, (month + 1), dayOfMonth))
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
  getUserDates()
}

window.getUserDates = async () => {
  const todates = document.getElementById("todates");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+ localStorage.getItem("access"));

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  console.log(getCurrentDate(), sessionStorage.getItem("user"))
  const {result} = await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/citas/user?fecha=${getCurrentDate()}&user=${sessionStorage.getItem("user")}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
  console.log(result)
  if(result.length == 0)
    return todates.innerHTML = "<i>No hay citas agendadas</i>";
  todates.innerHTML = "";
  result.forEach(date => {
    todates.innerHTML += `
      <div class="cita">
        <div>
          <h4>${getFormattedDay(date.fecha_hora)}</h4>
          <i>${formatTimeRange(date.fecha_hora, date.fecha_hora_fin)}</i>
        </div>
        <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Cita+con+el+psicólogo+del+ITCH&dates=${date.fecha_hora.replaceAll("-","").replaceAll(":","").replace("Z","-0600")}/${date.fecha_hora_fin.replaceAll("-","").replaceAll(":","").replace("Z","-0600")}&location=Instituto+Tecnológico+de+Chihuahua,+Av.+Tecnologico+2909,+Tecnológico,+31200+Chihuahua,+Chih.,+México" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M28.802 58h14.396c-1.504 2.398-4.165 4-7.198 4S30.307 60.398 28.802 58zM56.66 42.89C56.9 43.25 59 46.56 59 52c0 1.1-.9 2-2 2H15c-1.1 0-2-.9-2-2 0-5.44 2.1-8.75 2.34-9.11.22-.33.48-.56.8-.7 3.07-1.32 4.76-5.32 5.18-12.23.03-.47.41-9.12 10.1-11.77C32.48 16.42 33.58 15 36 15s3.52 1.42 4.58 3.19c9.69 2.65 10.07 11.3 10.1 11.77.42 6.91 2.11 10.91 5.18 12.23C56.18 42.33 56.44 42.56 56.66 42.89zM57.85 30.739c-1.38 0-2.623-.959-2.929-2.362-1.088-4.997-4.215-9.37-8.364-11.699-1.444-.812-1.958-2.64-1.147-4.085.811-1.443 2.637-1.96 4.085-1.147 5.621 3.155 9.842 9.008 11.29 15.654.353 1.619-.674 3.218-2.293 3.57C58.276 30.717 58.062 30.739 57.85 30.739zM14.15 30.739c-.212 0-.426-.022-.642-.069-1.619-.353-2.646-1.951-2.293-3.57 1.448-6.646 5.669-12.499 11.29-15.654 1.445-.812 3.272-.297 4.085 1.147.811 1.445.297 3.273-1.147 4.085-4.149 2.329-7.276 6.702-8.364 11.699C16.773 29.78 15.53 30.739 14.15 30.739z"/></svg>
        </a>
      </div>
    `;
  })
}