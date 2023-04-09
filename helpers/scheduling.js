const getAppointmentsByDay = async (day) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("access"));

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/citas/dias?fecha=${day}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message){
                if(result.message.includes("token has expired"))
                    if(verifySession())
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

    title.innerHTML = getDate((getMonth() + 1), idDay.substring(4))
    if (!day.classList.contains("empty")) {
        dayPanel.style.display = "block";
        generateHours();
    }

}
let appointments = [];
const selectHour = () => {

}
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
                <div id="${index}FH">

                </div>
                <div id="${index}SH">

                </div>
            </div>
        </div>
        `;
        hours.innerHTML += hour;
    }

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("access"));

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    appointments = await fetch("https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/citas/horas?fecha=2023-04-08", requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            console.error(error);
            verifySession();
        });

    appointments.hours.forEach((cita) => {
        const hora = parseInt(cita.hora.substring(0,cita.hora.indexOf(":")));
        const minuto = parseInt(cita.hora.substring(3,5));
        console.log(hora, minuto);
        //if cita duracion 30 entonces div fh coloreado
        if(cita.duracion >= 30)
            document.getElementById( (minuto == 30 ? hora+"SH" : hora+"FH")).classList.add("ocupada");
        if(cita.duracion >= 60)
            document.getElementById( (minuto == 30 ? (hora+1)+"FH" : hora+"SH") ).classList.add("ocupada");
        if(cita.duracion >= 90)
            document.getElementById( (minuto == 30 ? (hora+1)+"SH" : (hora+1)+"FH") ).classList.add("ocupada");
        if(cita.duracion == 120)
            document.getElementById( (minuto == 30 ? (hora+2)+"FH" : (hora+1)+"SH") ).classList.add("ocupada");
            
        //if cita duracion 60 entonces div fh y sh coloreado
        //if cita duracion 120 entonces div fh y sh, de dos, coloreado

    })
}