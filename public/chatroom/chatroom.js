

const socket = io.connect();
const messageArea = document.querySelector('.chat-container')
const textArea = document.querySelector('#textArea3')
// const emojiBtn = document.querySelector('.emoji');

const emojiBtn = document.querySelector('.emoji');
const picker = new EmojiButton();
const addFriendsButton = document.querySelector('.add-friends');


async function init() {
    await updateProfile();


}



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
    const { opponentUserInfo, conversations, myUserInfo } = await res.json();
    // const profileData_age = age(profileData.dateofBirth)
    updateConversation(conversations, myUserInfo, opponentUserInfo)
    const profile = document.querySelector('.profile-container')
    console.table(conversations)
    profile.innerHTML = ' '
    profile.innerHTML += `
    <div class="icon-circle">
                            <img src="${opponentUserInfo.icon}" alt="avatar"
                                class="profile-icon">
                        </div>
                        <!-- profile content -->
                        <div class="card-body profile-info">
        <div class="placement">
                                <div class="heart add-friends-btn"></div>
                            </div>
                            <h2 class="profile-name">${opponentUserInfo.name}</h2>
                            <div class="profile-occupation">${opponentUserInfo.occupation}, ${opponentUserInfo.country}</div>
                            <label class="profile-title">DOB: </label>
                            <span class="date-of-birth">${opponentUserInfo.dateofbirth}&ensp;</span>
                            <label class="profile-title">Age: </label>
                            <span class="age">28<i class="bi bi-gender-${opponentUserInfo.gender}"></i></span>
                            <br>
                            <label class="profile-title">My Hobbies: </label>
                            <br>
                            <span class="hobbies">${opponentUserInfo.hobby}</span>
                            <br>
                            <label class="profile-title">About Me: </label>
                            <br>
                            <span class="about-me">${opponentUserInfo.aboutme}</span>
                            <div class="social-media">
                                <div class="social-icon-wrapper instagram">
                                    <i class="fa fa-instagram"></i>
                                </div>
                                <div class="social-icon-wrapper facebook">
                                    <i class=" fa fa-facebook-f"></i>
                                </div>

                            </div>
        </div>


        `

}

const messageForm = document.querySelector("#messageForm")
console.log(messageForm)




init();


$(function () {
    $(".heart").on("click", function () {
        $(this).toggleClass("is-active");
    });
});


function updateConversation(conversations, myUserInfo, opponentUserInfo) {

    let conversationHTML = '';
    messageArea.innerHTML = ''
    for (let conversation of conversations) {
        let isWrittenByMe = conversation.from === myUserInfo.id

        if (isWrittenByMe) {

            conversationHTML +=  /*HTML*/ `
            
                         <div class="d-flex flex-row justify-content-end">
                            <div>
                                <div class="message-container-self">
                                    <p class="small p-2 me-3 mb-1">${conversation.content}</p>
                                </div>
                                <p class="small me-3 mb-3 rounded-3 time-self">${conversation.createdAt}</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp" alt="avatar"
                                class="rounded-circle chat-icon">
                        </div>
            `

        } else {

            conversationHTML +=  /*HTML*/ `
            
            <div class="d-flex flex-row justify-content-start">
            <img src="https://m.media-amazon.com/images/I/61BxjnyB7cL._AC_.jpg" alt="avatar"
                class="rounded-circle chat-icon">
            <div>
                <div class="message-container-other">
                    <p class="small p-2 ms-3 mb-1">${conversation.content}
                </p>
                </div>

                <p class="small ms-3 mb-3 rounded-3 float-end time-other">${conversation.createdAt}</p>
            </div>
        </div>
`
        }

    }
    messageArea.innerHTML = conversationHTML


}