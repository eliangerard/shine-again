const resize = () => {
    const textarea = document.getElementById("note");
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}