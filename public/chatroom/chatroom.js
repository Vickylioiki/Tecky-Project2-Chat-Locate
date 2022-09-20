

const messageArea = document.querySelector('.chat-container')
const textArea = document.querySelector('#textArea3')
// const emojiBtn = document.querySelector('.emoji');
const leaveBtn = document.querySelector('.leave');
const emojiBtn = document.querySelector('.emoji');
const picker = new EmojiButton();
const addFriendsButton = document.querySelector('.add-friends');
const content_submit = document.querySelector('#messageForm')
const chatContainer = document.querySelector('.chat-container');
const leavenBtn = document.querySelector('.leaven-btn');




let opponentUserInfo, myUserInfo


const socket = io.connect();
    socket.on('new-message', (conversation) => {
        updateSingleConversation(conversation,myUserInfo, opponentUserInfo )
        
    });
    socket.on('leave-room', () => {
        let ans = confirm('partner gone, i should leave')
        if (ans){
            document.querySelector('#messageForm').remove()
        }else{
            alert('gone, you cannot speak anymore')
            document.querySelector('#messageForm').remove()

        }
    });
    

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
    try{
    const res = await fetch('/chat/getchatroom');
    let result = await res.json();
    let conversations = result.conversations
    opponentUserInfo =  result.opponentUserInfo
    myUserInfo = result.myUserInfo
    // const profileData_age = age(profileData.dateofBirth)
    updateConversations(conversations, myUserInfo, opponentUserInfo)
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
                            <span class="date-of-birth">${opponentUserInfo.date_of_birth.split('T')[0]}&ensp;</span>
                            <label class="profile-title">Age: </label>
                            <span class="age">${2022 - (opponentUserInfo.date_of_birth.split('-')[0])}</span>
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
    $(".heart").on("click", function () {
        $(this).toggleClass("is-active");
    });
    }catch (err) {
        window.location.href = "/profile_page/profile.html"

    }   
}

const messageForm = document.querySelector("#messageForm")
console.log(messageForm)




$(function () {
    $(".heart").on("click", function () {
        $(this).toggleClass("is-active");
    });
});

function updateSingleConversation(conversation){
    let isWrittenByMe = conversation.from === myUserInfo.id

    let conversationHTML = ''
    if (isWrittenByMe) {

        conversationHTML =  /*HTML*/ `
        
                     <div class="d-flex flex-row justify-content-end">
                        <div>
                            <div class="message-container-self">
                                <p class="small p-2 me-3 mb-1">${conversation.content}
                                    ${conversation.image ? `<img src="/upload/${conversation.image}" alt="avatar" class="img-fluid">` :``}                     
                                 </p>
                                </div>
                            <p class="small me-3 mb-3 rounded-3 time-self">${conversation.createdAt}</p>
                        </div>
                        <img src="${myUserInfo.icon}" alt="avatar"
                            class="rounded-circle chat-icon">
                    </div>
        `

    } else {

        conversationHTML =  /*HTML*/ `
        
        <div class="d-flex flex-row justify-content-start">
        <img src="${opponentUserInfo.icon}" alt="avatar"
            class="rounded-circle chat-icon">
        <div>
            <div class="message-container-other">
                    <p class="small p-2 ms-3 mb-1">${conversation.content}
                
                    ${conversation.image ? `<img src="/upload/${conversation.image}" alt="avatar" class="img-fluid">` :``}                     
                
            </p>
            </div>

            <p class="small ms-3 mb-3 rounded-3 float-end time-other">${conversation.createdAt}</p>
        </div>
    </div>
`
    }
    messageArea.innerHTML += conversationHTML

}
function updateConversations(conversations, myUserInfo, opponentUserInfo) {
    console.log(conversations)
    messageArea.innerHTML = ''
    for (let conversation of conversations) {
        updateSingleConversation(conversation,myUserInfo, opponentUserInfo)
    }
}



content_submit.addEventListener('submit', async function submit (e) {
    e.preventDefault()

    const formElement = e.target;
    const content = formElement.content.value;
    const image = formElement.image.files[0];

    const formData = new FormData();

    formData.append('content', content)
    formData.append('image', image)

    console.log(content)

    const res = await fetch('/chat', {
        method: 'POST',
        body: formData
    })

    if (res.ok) {

        document.querySelector('#messageForm').reset();

        let conversation = await res.json()
        updateSingleConversation(conversation,myUserInfo, opponentUserInfo )
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } else {
        console.log(err)
    }

})





async function init() {
    await updateProfile();
    chatContainer.scrollTop = chatContainer.scrollHeight;

}

init();


function previewImages() {

    var preview = document.querySelector('#preview');
    
    if (this.files) {
      [].forEach.call(this.files, readAndPreview);
    }
  
    function readAndPreview(file) {
  
      // Make sure `file.name` matches our extensions criteria
      if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return alert(file.name + " is not an image");
      } // else...
      
      var reader = new FileReader();
      
      reader.addEventListener("load", function() {
        var image = new Image();
        image.height = 100;
        image.title  = file.name;
        image.src    = this.result;
        preview.appendChild(image);
      });
      
      reader.readAsDataURL(file);
      
    }
  
  }
  
  document.querySelector('#file-input').addEventListener("change", previewImages);

  const deleteBtn = document.querySelector('.cross')

  deleteBtn.addEventListener("click", function() {
    document.querySelector('#file-input').value = '';
    document.querySelectorAll('#preview img').remove();

  })


leaveBtn.addEventListener("click", async function() {
   let res = await fetch('/chat/leave',{
    method: 'delete',
});
if (res.ok){
    window.location.href = "/profile_page/profile.html"
}
 


})