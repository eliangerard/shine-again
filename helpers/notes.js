let notasJSON;
notasJSON = JSON.parse(localStorage.getItem('notas'));
if(!notasJSON){
    notasJSON = [];
}


const resize = () => {
    const textarea = document.getElementById("note");
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

const loadNotas = () => {
    const notas = document.getElementById("notas");
    notas.innerHTML = "";
    console.log(notasJSON);
    notasJSON.forEach((nota,i) => {
        let html = 
        `
        <article id="${"nota"+i}">
            <textarea id="${"txa"+i}">${nota.contenido}</textarea>
            <i>${nota.fecha}</i>
            <button id="${i}" onclick="deleteNote(id)">Borrar</button>
        </article>
        `;
        notas.innerHTML += html;
    })
}

const deleteNote = (id) => {
    notasJSON.splice(id, 1);
    localStorage.setItem('notas', JSON.stringify(notasJSON));
    loadNotas();
}

const guardarNota = () => {
    
    const textarea = document.getElementById("note");
    const fecha = document.getElementById("date");
    if(textarea.value.trim() == "")
        return;
    const nota = {
        "fecha" : fecha.innerHTML,
        "contenido" : textarea.value
    };

    notasJSON.unshift(nota);
    localStorage.setItem('notas', JSON.stringify(notasJSON));
    textarea.value = "";
    fecha.innerHTML = "fechanueva";
    loadNotas();
}