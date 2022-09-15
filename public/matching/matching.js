<<<<<<< HEAD
const { response } = require("express");

function initMap() {
=======
async function init() {
    await main();
}


function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function main() {
    const position = await getPosition();  // wait for getPosition to complete
    const res = await fetch('/match/', {
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

init();


// async function getReadyUsers() {
//     const res = await fetch('/match');
//     const readyUsers = await res.json();
//     console.log(readyUsers);
// }


async function initMap() {
    const res = await fetch('/match');
    const readyUsers = await res.json();


    //NO USE//
>>>>>>> 0b35d334d793a7b2aaaac75b8414d727d72caf6d
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


    // build request
<<<<<<< HEAD
    const origin1 = "7-11";
    const origin2 = "東華醫院";
    const origin3 = "西港城"
    const destinationA = "中環街市";
    const destinationB = "西港城";
    const destinationC = "Tecky Sheung Wan"

    const request = {
        origins: [origin1,origin2,origin3],
        destinations: [destinationA, destinationB, destinationC],
=======

    // const origin1 = { lat: 55.93, lng: -3.118 };
    // const origin2 = "Greenwich, England";
    // const destinationA = "Stockholm, Sweden";
    // const destinationB = { lat: 50.087, lng: 14.421 };

    const request = {
        origins: [readyUsers[0].location],
        destinations: [readyUsers[1].location, readyUsers[2].location],
>>>>>>> 0b35d334d793a7b2aaaac75b8414d727d72caf6d
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
    };

    // put request on page
    // document.getElementById("request").innerText =
    //     JSON.stringify(request, null, 2);

    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
        // put response
        // document.getElementById("response").innerText =
        //     JSON.stringify(response, null, 2);

        // show on map
        // const originList = response.originAddresses;
        // const destinationList = response.destinationAddresses;
        const userAdistance = response.rows[0].elements[0].distance

        console.log(userAdistance)
        console.log(response.rows[0])


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
    });
}

<<<<<<< HEAD
function findDistance(readyUsers){
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    const locationObject = readyUsers.location;
    let locationArray=[];
    for(let location of locationObject){
        locationArray.push(location);
    }

    // // build request
    // const origin1 = { lat: 55.93, lng: -3.118 };
    // const origin2 = "Greenwich, England";
    // const destinationA = "Stockholm, Sweden";
    // const destinationB = { lat: 50.087, lng: 14.421 };

    const request = {
        origins: locationArray,//[origin1, origin2],
        destinations: locationArray,//[destinationA, destinationB],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
    };

    service.getDistanceMatrix(request).then((response) => {
        return response.rows;
})
}


function main(){
    const res = await fetch("/getReadyUsers")
    const readyUsers = await res.json();
    findDistance(readyUsers);
}

main();

// async function matchUsers(){
//     for(let user of readyUsers){



//     }
// }

// distance=findDistance(userA,userB);
=======
initMap();
>>>>>>> 0b35d334d793a7b2aaaac75b8414d727d72caf6d
