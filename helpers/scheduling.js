//Variables para agendar una cita
let hourToDate = "";
let dateToDate = "";
let duration = "";

const getAppointmentsByDay = async (day) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("access"));

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/citas/dias?fecha=${day}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message) {
                if (result.message.includes("token has expired"))
                    if (verifySession())
                        return location.reload();
            }
            return result;
        })
        .catch(error => {
            console.log('error gay', error);
        });
}

const closeDay = () => {
    const day = document.getElementById("day");
    day.style.display = "none";
}

const openDay = (idDay) => {
    const day = document.getElementById(idDay);
    const title = document.getElementById("selectedDate");
    const dayPanel = document.getElementById("day");
    const dia = parseInt(idDay.substring(4));
    dateToDate = `2023-${(getMonth() + 1)}-${dia < 10 ? "0" + dia : dia}`;
    title.innerHTML = getDateByMonth((getMonth() + 1), idDay.substring(4))
    if (!day.classList.contains("empty")) {
        dayPanel.style.display = "block";
        generateHours();
    }

}
let appointments = [];

const generateHours = async () => {
    const hours = document.getElementById("hours");
    hours.innerHTML = "";
    for (let index = 8; index < 20; index++) {
        let hour =
            `
        <div class="hourInfo">
            <div class="time">
                ${index < 12 ? index + ":00 am" : index > 12 ? (index - 12) + ":00 pm" : index + ":00 pm"}
            </div>
            <div id="hour${index}" class="hour">
                <div id="${index}FH" onclick="selectHour(id)">

                </div>
                <div id="${index}SH" onclick="selectHour(id)">

                </div>
            </div>
        </div>
        `;
        hours.innerHTML += hour;
    }

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("access"));

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    appointments = await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/citas/horas?fecha=${dateToDate}`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            console.error(error);
            verifySession();
        });

    appointments.hours.forEach((cita) => {
        const hora = parseInt(cita.hora.substring(0, cita.hora.indexOf(":")));
        const minuto = parseInt(cita.hora.substring(3, 5));
        console.log(hora, minuto);
        //if cita duracion 30 entonces div fh coloreado
        if (cita.duracion >= 30)
            document.getElementById((minuto == 30 ? hora + "SH" : hora + "FH")).classList.add("ocupada");
        if (cita.duracion >= 60)
            document.getElementById((minuto == 30 ? (hora + 1) + "FH" : hora + "SH")).classList.add("ocupada");
        if (cita.duracion >= 90)
            document.getElementById((minuto == 30 ? (hora + 1) + "SH" : (hora + 1) + "FH")).classList.add("ocupada");
        if (cita.duracion == 120)
            document.getElementById((minuto == 30 ? (hora + 2) + "FH" : (hora + 1) + "SH")).classList.add("ocupada");

        //if cita duracion 60 entonces div fh y sh coloreado
        //if cita duracion 120 entonces div fh y sh, de dos, coloreado

    })
}

let lastSelected;
const selectHour = (id) => {
    const selected = document.getElementById(id);
    if (selected.classList.contains("ocupada"))
        return;

    if (lastSelected)
        lastSelected.classList.remove("hSelected");

    selected.classList.add("hSelected");
    lastSelected = selected;
    if (id.includes("SH"))
        hourToDate = id.substring(0, id.indexOf("S")) + ":30";
    if (id.includes("FH"))
        hourToDate = id.substring(0, id.indexOf("F")) + ":00";

    console.log(dateToDate, hourToDate)
}

const selectDuration = (id) => {
    const sd1 = document.getElementById("sd1");
    const sd2 = document.getElementById("sd2");
    const sd3 = document.getElementById("sd3");
    if (id == "sd1") {
        sd1.classList.add("selected");
        sd2.classList.remove("selected");
        sd3.classList.remove("selected");
        duration = 30;
    }
    if (id == "sd2") {
        sd1.classList.remove("selected");
        sd2.classList.add("selected");
        sd3.classList.remove("selected");
        duration = 60;
    }
    if (id == "sd3") {
        sd1.classList.remove("selected");
        sd2.classList.remove("selected");
        sd3.classList.add("selected");
        duration = 120;
    }
}

const submitAppointment = async () => {
    if (hourToDate == "" || dateToDate == "" || duration == "")
        return;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("access"));

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/citas?paciente=Elian&fecha_hora=${dateToDate}T${hourToDate}:00.000Z&duracion=${duration}`, requestOptions)
        .then(response => response.json())
        .then(async result => {
            console.log(result)
            if(result.message)
                if(result.message.includes("token has expired"))
                    if(await verifySession())
                        return submitAppointment();
            if(result.message.includes("exitosamente"))
                generateHours();
        })
        .catch(error => console.log('error', error));
}