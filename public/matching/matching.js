const socket = io.connect();

async function init() {
    await getLocation();
    // await initMap();

}


function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function getLocation() {
    const position = await getPosition();  // wait for getPosition to complete
    const res = await fetch('/match', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude,
        })
    })
    if (res.status === 401) {
        window.location.href = '../login.html'
    }
}



init();


socket.on("to-chatroom", () => {
    window.location = '/chatroom/chatroom.html';
})

