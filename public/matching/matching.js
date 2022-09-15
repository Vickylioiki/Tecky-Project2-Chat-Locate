async function init() {
    await getLocation();
    // initMap()
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
            longtitude: position.coords.longitude
        })
    })
}

// init();


// async function getReadyUsers() {
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
    console.log(owner)
    //NO USE//
    // const bounds = new google.maps.LatLngBounds();
    // const markersArray = [];

    // const map = new google.maps.Map(
    //     document.getElementById("map"),
    //     {
    //         center: { lat: 55.53, lng: 9.4 },
    //         zoom: 10,
    //     }
    // );

    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    console.log(readyUsers);

    // build request

    // const origin1 = { lat: 55.93, lng: -3.118 };
    // const origin2 = "Greenwich, England";
    // const destinationA = "Stockholm, Sweden";
    // const destinationB = { lat: 50.087, lng: 14.421 };
    // for (let i = 0; i < readyUsers.length; i++) {
    //     let originUser = readyUsers[i].location;
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
            // .then((response) => {
            //     console.log(`response${j}`, destinationUser)

            //     // const result = response.rows[0]
            //     console.log(response);
            // })
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
                userId: distances[0].userId
            })
        })
        const startData = await startChatRes.json()
        console.log(`startChatRes`, startData)
        
    // }
}
    // const request = {
    //     origins: [readyUsers[0].location],
    //     destinations: [readyUsers[1].location, readyUsers[2].location],
    //     travelMode: google.maps.TravelMode.WALKING,
    //     unitSystem: google.maps.UnitSystem.METRIC
    // };

    // put request on page
    // document.getElementById("request").innerText =
    //     JSON.stringify(request, null, 2);

    // get distance matrix response
    // service.getDistanceMatrix(request).then((response) => {
        // put response
        // document.getElementById("response").innerText =
        //     JSON.stringify(response, null, 2);

        // show on map
        // const originList = response.originAddresses;
        // const destinationList = response.destinationAddresses;
        // const userAdistance = ('sender:', response.originAddresses)




        // console.log(response)
 

        // deleteMarkers(markersArray);

        // const showGeocodedAddressOnMap = (asDestination) => {
        //     const handler = ({ results }) => {
        //         map.fitBounds(bounds.extend(results[0].geometry.location));
        //         markersArray.push(
        //             new google.maps.Marker({
        //                 map,
        //                 position: results[0].geometry.location,
        //                 label: asDestination ? "D" : "O",
        //             })
        //         );
        //     };

        //     return handler;
        // };

        // for (let i = 0; i < originList.length; i++) {
        //     const results = response.rows[i].elements;

        //     geocoder
        //         .geocode({ address: originList[i] })
        //         .then(showGeocodedAddressOnMap(false));

        //     for (let j = 0; j < results.length; j++) {
        //         geocoder
        //             .geocode({ address: destinationList[j] })
        //             .then(showGeocodedAddressOnMap(true));
        //     }
        // }


