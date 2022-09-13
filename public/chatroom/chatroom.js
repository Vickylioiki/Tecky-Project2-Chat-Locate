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
    } else if (16 <= currentTime && currentTime < 19) {
        document.body.className = "dusk"
    } else if (20 <= currentTime && currentTime < 23) {
        document.body.className = "night"
    } else {
        document.body.className = "midnight"
    }
}

window.scrollTo(0, document.querySelector(".chat-container").scrollHeight);