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

const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const getFormattedDay = (startDate) => {
    const options = { day: 'numeric', month: 'long' };
    const date = new Date(startDate);
    return date.toLocaleDateString('es-ES', options);
};
const formatTimeRange = (startISO, endISO) => {
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    const startHours = startDate.getUTCHours().toString().padStart(2, '0');
    const startMinutes = startDate.getUTCMinutes().toString().padStart(2, '0');
    const endHours = endDate.getUTCHours().toString().padStart(2, '0');
    const endMinutes = endDate.getUTCMinutes().toString().padStart(2, '0');

    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
};

const getISODate = (time, date, timeZone) => {
    console.log(`${date}T${time}${timeZone}`);
    const dateTime = `${date}T${time}${timeZone}`;
    const isoDate = new Date(dateTime).toISOString();
    console.log(isoDate);
    return isoDate;
};