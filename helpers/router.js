const home = document.getElementById("btnHome");
const form = document.getElementById("btnForm");
const calendar = document.getElementById("btnCalendar");
const resources = document.getElementById("btnRes");
const call = document.getElementById("btnCall");

const app = document.getElementById("app");

let homeHTML, calendarHTML, callHTML, formHTML, resHTML;
let loaded = false;
const loadComponents = async () => {

    const homeHtmlUrl = new URL("../components/home.html", import.meta.url);
    const formHtmlUrl = new URL("../components/form.html", import.meta.url);
    const calendarHtmlUrl = new URL("../components/calendar.html", import.meta.url);
    const resHtmlUrl = new URL("../components/resources.html", import.meta.url);
    const callHtmlUrl = new URL("../components/call.html", import.meta.url);

    homeHTML = await fetch(homeHtmlUrl).then(response => response.text());
    formHTML = await fetch(formHtmlUrl).then(response => response.text());
    calendarHTML = await fetch(calendarHtmlUrl).then(response => response.text());
    resHTML = await fetch(resHtmlUrl).then(response => response.text());
    callHTML = await fetch(callHtmlUrl).then(response => response.text());
    
    loaded = true;
}
loadComponents();
window.router = async (page)=>{
    form.classList.remove("navActive");
    home.classList.remove("navActive");
    calendar.classList.remove("navActive");
    resources.classList.remove("navActive");
    call.classList.remove("navActive");
    if(!loaded)
        await loadComponents();
    if(page == 0){
        app.innerHTML = homeHTML;
        home.classList.add("navActive");
        loadNotas();  
    }
    if(page == 1) {
        app.innerHTML = formHTML;
        form.classList.add("navActive");
    }   
    if(page == 2){
        app.innerHTML = calendarHTML;
        calendar.classList.add("navActive");
    }
    if(page == 3){
        app.innerHTML = resHTML;
        resources.classList.add("navActive");
    }
    if(page == 4){
        app.innerHTML = callHTML;
        call.classList.add("navActive");
    }

}