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
    await getRoomInfo();


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


async function getRoomInfo() {
    const res = await fetch('/chatroom/getRoomInfo');
    const roomInfo = await res.json();
    console.log(roomInfo)




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

