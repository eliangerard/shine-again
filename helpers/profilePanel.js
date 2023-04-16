const logout = () => {
    const token = localStorage.getItem("access"); // El token de acceso del usuario autenticado
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    sessionStorage.clear();
    window.location.replace('https://shineagain.auth.us-east-2.amazoncognito.com/logout?client_id=5g726fbmspvp9f3p6cc3s8q0qf&redirect_uri=http://localhost:5500/&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+test%2Fread+test%2Fwrite');
}

const openPanel = () => {
    const panel = document.getElementById("profilePanel");
    panel.style.display = "flex";
}
const closePanel = () => {
    const panel = document.getElementById("profilePanel");
    panel.style.display = "none";
}
const openSettings = () => {
    const panel = document.getElementById("profilePanel");
    const firstPanel = document.getElementById("firstPanel");
    const settingsPanel = document.getElementById("settingsPanel");
    firstPanel.style.display = "none";
    settingsPanel.style.display = "block";

    panel.classList.add("openedSettings");

}
const closeSettings = () => {
    const panel = document.getElementById("profilePanel");
    const firstPanel = document.getElementById("firstPanel");
    const settingsPanel = document.getElementById("settingsPanel");
    firstPanel.style.display = "block";
    settingsPanel.style.display = "none";

    panel.classList.remove("openedSettings");

}
const loadAvatar = ()=> {
    const avatarBtn = document.getElementById("avatarBtn");
    const avatarPanel = document.getElementById("avatarPanel");
    const avatarEdit = document.getElementById("editAvatar");

    avatarBtn.setAttribute("src", "./src/avatars/avatar"+localStorage.getItem("avatar") + ".png");
    avatarPanel.setAttribute("src", "./src/avatars/avatar"+localStorage.getItem("avatar") + ".png");
    avatarEdit.setAttribute("src", "./src/avatars/avatar"+localStorage.getItem("avatar") + ".png");
}
const updateProfilePic = (id) => {
    const avatar = id.substring(2);
    localStorage.setItem("avatar", avatar);
    loadAvatar();
}
document.addEventListener('mousedown', (event) => {
    let pp = document.getElementById('profilePanel');
    if (!pp.contains(event.target) && pp.style.display == "flex") {
        // Se hizo clic fuera de miDiv
        pp.style.display = "none";
  }
});