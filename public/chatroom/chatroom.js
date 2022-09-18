

const socket = io.connect();

// const emojiBtn = document.querySelector('.emoji');

const emojiBtn = document.querySelector('.emoji');
const picker = new EmojiButton();
const addFriendsButton = document.querySelector('.add-friends');


// io.on("connection"), socket =>{
//     socket.emit('chat-message','Hello World');

//     socket.on('goToChatPage', (data) => {
//         window.location = data;
//         //"./chatRoom.html?roomId=userA_userB" 
//     })
//     socket.on('getMessage', (data) => {

//     })
// }

async function init() {
    await updateProfile();


}


// const messageForm = document.querySelector("#messageForm")
// console.log(messageForm)

// messageForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const form = e.target
//     const input = form.textArea3.value
//     socket.emit("sendMessage", input)


// })
// Emoji selection  
window.addEventListener('DOMContentLoaded', () => {

    picker.on('emoji', emoji => {
        document.querySelector('#textArea3').value += emoji;
    });

    emojiBtn.addEventListener('click', () => {
        picker.togglePicker(emojiBtn);
    });

});

const currentTime = new Date().getHours();
console.log(currentTime)
if (document.body) {
    if (7 <= currentTime && currentTime < 16) {
        document.body.className = "day"
    } else {
        document.body.className = "night"
    }
}

$(function () {
    $(".heart").on("click", function () {
        $(this).toggleClass("is-active");
    });
});

if (addFriendsButton) {
    addFriendsButton.addEventListener("click", async (event) => {
        event.preventDefault();

        let res = await fetch('/addFriends', {
            method: "POST",
            body: JSON.stringify({
                opponent_user_id: "2",   //HARD CODING NEEDA EDIT BEFORE DEPLOYMENT
                message: "hello can i add you?",

            })
        })
    })
} else {
    console.log('cannot find addFriendsButton')
}




async function updateProfile() {
    const res = await fetch('/chat/getchatroom');
    const roomInfo = await res.json();
    const userAId = roomInfo.userA.id;
    const userA = roomInfo.userA;
    const userBId = roomInfo.userB.id;
    const userB = roomInfo.userB;
    const currentUser = roomInfo.currentUser;
    console.log('userA :', userAId, 'userB :', userBId, 'currentUser :', currentUser)


    const profileData = currentUser === userAId ? userB : userA;
    const profile = document.querySelector('.profile-info')
    profile.innerHTML = ' '
    profile.innerHTML += `
        <div class="placement">
                                <div class="heart add-friends-btn"></div>
                            </div>
                            <h2 class="profile-name">${profileData.name}</h2>
                            <div class="profile-occupation">${profileData.occupation}, ${profileData.country}</div>
                            <label class="profile-title">DOB: </label>
                            <span class="date-of-birth">1994-03-01&ensp;</span>
                            <label class="profile-title">Age: </label>
                            <span class="age">28<i class="bi bi-gender-male"></i></span>
                            <br>
                            <label class="profile-title">My Hobbies: </label>
                            <br>
                            <span class="hobbies">Cooking, Hiking,
                                Reading</span>
                            <br>
                            <label class="profile-title">About Me: </label>
                            <br>
                            <span class="about-me">
                                Bieber achieved commercial success with his teen pop-driven debut studio album,
                                My World
                                2.0 (2010), which debuted atop the US Billboard 200, making him the youngest
                                solo male
                                act to top the chart in 47 years. </span>
                            <div class="social-media">
                                <div class="social-icon-wrapper instagram">
                                    <i class="fa fa-instagram"></i>
                                </div>
                                <div class="social-icon-wrapper facebook">
                                    <i class=" fa fa-facebook-f"></i>
                                </div>
                                <div class="social-icon-wrapper twitter">
                                    <i class="fa fa-twitter"></i>
                                </div>
                            </div>
        
        
        
        
        
        `




}

init();




// socket.on("connection", function () {
//     socket.on("roomInfomation", ({ userIdA, userIdB, roomId }) => {
//         console.log({ roomId })
//     })
//     socket.on("getMessage", (data) => {

//         console.log({ messgae: data })

//     })
//     socket.emit("sendMessage", "sendMessage")
//     console.log('Connected to server');
// });

