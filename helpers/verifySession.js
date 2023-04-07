window.verifySession = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const grantCode = urlParams.get('code');
    
    if(grantCode){
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
        await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/auth?grant_code=${grantCode}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.error) return;
                localStorage.setItem("access", result.access_token);
                localStorage.setItem("refresh", result.refresh_token);
            })
            .catch(error => console.log('error', error));
    }
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
        await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/refresh?token=${refreshToken}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.error) return;
                localStorage.setItem("access", result.access_token);
            })
            .catch(error => console.log('error', error));
    } else {
        window.location.replace('https://shineagain.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=5g726fbmspvp9f3p6cc3s8q0qf&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2F');
    }
}