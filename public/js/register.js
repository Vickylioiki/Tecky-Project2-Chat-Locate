let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let usernameHtmlElement = id("username"),
    nameHtmlElement = id("name"),
    passwordHtmlElement = id("password"),
    form = id("form"),
    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");



form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let usernameHasError = engine(usernameHtmlElement, 0, "Username cannot be blank");
    let nameHasError = engine(nameHtmlElement, 1, "Name cannot be blank");
    let passwordHasError = engine(passwordHtmlElement, 2, "Password cannot be blank");

    if (!usernameHasError && !nameHasError && !passwordHasError) {

        const form = e.target
        const username = form.username.value
        const password = form.password.value
        const name = form.name.value

        console.log(JSON.stringify({ username: username, name: name, password: password }))
        let res = await fetch('/user/register', {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let resJson = await res.json()

        if (!res.ok) {
            return
        }
        // if response has no error, redirect user back to index page
        window.location.href = "./login.html"
    }



});

// form field checking function
let engine = (id, serial, message) => {
    let hasError = false;

    if (id.value.trim() === "") {
        errorMsg[serial].innerHTML = message;
        id.style.border = "2px solid red";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";

        hasError = true;
    } else {
        errorMsg[serial].innerHTML = "";
        id.style.border = "2px solid green";

        // icons
        failureIcon[serial].style.opacity = "0";
        successIcon[serial].style.opacity = "1";
    }

    return hasError;
};

function getStylesheet() {
    let currentTime = new Date().getHours();
    console.log(currentTime);
    if (document.body) {
        if (7 <= currentTime && currentTime < 20) {
            document.body.style.backgroundImage = "url('asset/DomeAM.jpg')";
        }
        else {
            document.body.style.backgroundImage = "url('asset/DomePM.jpg')";
        }
    }
}

getStylesheet()