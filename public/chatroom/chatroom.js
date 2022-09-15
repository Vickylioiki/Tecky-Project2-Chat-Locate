const io =require('socket.io')
const emojiBtn = document.querySelector('.emoji');

const picker = new EmojiButton();


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