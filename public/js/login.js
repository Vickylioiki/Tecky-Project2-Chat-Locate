

async function login() {
    const loginForm = document.querySelector('#login-form')
    console.log(loginForm)
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.username.value
        const password = form.password.value
        console.log("username: " + username + " password: " + password)
        const res = await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            console.log('Login successful')
            window.location.href = "./index.html"
        } else {
            let { message } = await res.json()
            alert(message)
        }
    })
}

login()

window.fbAsyncInit = function () {
    FB.init({
        appId: '{your-app-id}',
        cookie: true,
        xfbml: true,
        version: '{api-version}'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getStylesheet() {
    let currentTime = new Date().getHours();
    console.log(currentTime);
    let backgroundWrapperImage = document.querySelector(".background-wrapper img");
    if (document.body) {
        if (7 <= currentTime && currentTime < 20) {
            // document.body.style.backgroundImage = "url('asset/DomeAM.jpg')";
            backgroundWrapperImage.src = "./asset/DomeAM.jpg"
        }
        else {
            // document.body.style.backgroundImage = "url('asset/DomePM.jpg')";
            backgroundWrapperImage.src = "./asset/DomePM.jpg"
        }
    }
}

getStylesheet()