const socket = io.connect();

const emojiBtn = document.querySelector('.emoji');

const picker = new EmojiButton();

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

