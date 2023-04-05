window.verifySession = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const grantCode = urlParams.get('code');
    console.log(grantCode);
    if(grantCode){
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
        await fetch(`https://fz853w9zuj.execute-api.us-east-2.amazonaws.com/dev/auth?grant_code=${grantCode}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.error) return;
                console.log(result)
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
                console.log(result)
                if(result.error) return;
                console.log(result)
                localStorage.setItem("access", result.access_token);
            })
            .catch(error => console.log('error', error));
    } else {
        window.location.replace('https://shainagainu.auth.us-east-2.amazoncognito.com/login?client_id=3cb46014jts2bl56ss9k6nrs2m&response_type=code&scope=test%2Fread+test%2Fwrite&redirect_uri=http://localhost:5500/');
    }
}