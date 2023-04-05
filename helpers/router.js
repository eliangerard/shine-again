const home = document.getElementById("btnHome");
const form = document.getElementById("btnForm");
const calendar = document.getElementById("btnCalendar");
const resources = document.getElementById("btnRes");
const call = document.getElementById("btnCall");

const app = document.getElementById("app");
let homeHTML = `

`;
let formHTML = fs.readFile("../components/form.html");
let calendarHTML = `
<div id="calendarS" onload="generar()">
    <h3 id="monthTitle">Abril</h3>
    <button id="nextMonthBtn" onclick="generateNextMonthCalendar()">Siguiente mes</button>
    <a href="tel:+1234567890">Llamar al número</a>
    <table id="calendar">

    </table>
</div>
`;
let resHTML = `

`;
let callHTML = `

`;

window.router = (page)=>{
    if(page == 0)
        app.innerHTML = homeHTML;
    if(page == 1)
        app.innerHTML = formHTML;
    if(page == 2)
        app.innerHTML = calendarHTML;
    if(page == 3)
        app.innerHTML = resHTML;
    if(page == 4)
        app.innerHTML = callHTML;

}

home.addEventListener("click", router(0));
form.addEventListener("click", router(1));
calendar.addEventListener("click", router(2));
resources.addEventListener("click", router(3));
call.addEventListener("click", router(4));