async function init() {
    console.log(1.1);
    await getLocation();
    console.log(1.2);
    await initMap();
    console.log(1.3);
    await getNewUser()

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
}



// async function geteadyUsers() {
//     const res = await fetch('/match');
//     const readyUsers = await res.json();
//     console.log(readyUsers);
// }



async function initMap() {
    const geMeRes = await fetch('/match/geMe');
    const getMeData = await geMeRes.json();
    const userId = getMeData.userId

    const res = await fetch('/match');
    let readyUsers = await res.json();

    let owner = readyUsers.filter(readyUser => {
        return readyUser.userId == userId
    })[0]


    console.log('owner:', owner)

    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    console.log('readyUsers.length:', readyUsers.length)
    let distances = []
    for (let j = 0; j < readyUsers.length; j++) {
        if (readyUsers[j].userId == owner.userId) {
            continue;
        }
        console.log("j :" + j);
        let destinationUser = readyUsers[j].location;
        // console.log(`destinationUser${j}`, destinationUser)
        const request = {
            origins: [owner.location],
            destinations: [destinationUser],
            travelMode: google.maps.TravelMode.WALKING,

        }

        const response = await service.getDistanceMatrix(request)
        console.log(`response${j}`, response)
        distances.push({
            userId: readyUsers[j].userId,
            distance: response.rows[0].elements[0].distance.value


        })
    }

    distances = distances.sort((a, b) => {
        return a.distance - b.distance
    })

    console.log(`distances`, distances)
    const startChatRes = await fetch('/match/startChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentUserId: owner.userId,
            userId: distances[0].userId
        })
    })
    const startData = await startChatRes.json()
    console.log(`startChatRes`, startData)




}




async function getNewUser() {
    console.log(4);
    const checkRemainUsers = await fetch('/match');
    let readyUsers = await checkRemainUsers.json();
    console.log(`readyUsers2`, readyUsers)
}

console.log(1);
init();
console.log(2);
// getNewUser();
console.log(3);