const verifySession = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const grantCode = urlParams.get('code');

    if (grantCode) {
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/auth?grant_code=${grantCode}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error)
                    return window.location.replace('https://shineagain.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=5g726fbmspvp9f3p6cc3s8q0qf&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2F');

                // Obtiene la URL actual
                let url = new URL(window.location.href);

                // Borra la cadena de consulta
                url.search = '';

                // Reemplaza la URL en la pestaña del navegador
                window.history.replaceState(null, '', url);

                localStorage.setItem("access", result.access_token);
                localStorage.setItem("refresh", result.refresh_token);
                localStorage.setItem("id", result.id_token);
                loadHome();
            })
            .catch(error => console.log('error', error));
    }
    refreshToken();
}

const refreshToken = async () => {
    console.log("refrescando...");
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/refresh?refreshToken=${refreshToken}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error) return false;
                console.log("actualizando access token")
                localStorage.setItem("access", result.access_token);
                return true;
            })
            .catch(error => console.log('error', error));
    } else toSignin();
}

const toSignin = () => {
    window.location.replace('https://shineagain.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=5g726fbmspvp9f3p6cc3s8q0qf&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+test%2Fread+test%2Fwrite&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2F');
}