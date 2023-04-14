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

document.addEventListener('mousedown', (event) => {
    let pp = document.getElementById('profilePanel');
    if (!pp.contains(event.target) && pp.style.display == "flex") {
        // Se hizo clic fuera de miDiv
        pp.style.display = "none";
  }
});