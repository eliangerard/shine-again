const home = document.getElementById("btnHome");
const form = document.getElementById("btnForm");
const calendar = document.getElementById("btnCalendar");
const resources = document.getElementById("btnRes");
const call = document.getElementById("btnCall");

const app = document.getElementById("app");

let homeHTML, calendarHTML, callHTML, formHTML, resHTML;
let loaded = false;
const loadComponents = async () => {
    homeHTML = await fetch("http://192.168.0.100:5500/components/home.html").then(response => response.text());
    formHTML = await fetch("http://192.168.0.100:5500/components/form.html").then(response => response.text());
    calendarHTML = await fetch("http://192.168.0.100:5500/components/calendar.html").then(response => response.text());
    resHTML = await fetch("http://192.168.0.100:5500/components/resources.html").then(response => response.text());
    callHTML = await fetch("http://192.168.0.100:5500/components/call.html").then(response => response.text());
    loaded = true;
}
loadComponents();
window.router = async (page)=>{
    if(!loaded)
        await loadComponents();
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