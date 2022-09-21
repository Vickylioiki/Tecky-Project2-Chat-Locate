import { getProfile, getFriends } from '../js/header.js';


let friendsButton = document.querySelector(".friends-btn");
let fds_list_session = document.querySelector(".friends-list-session");
let editButton = document.querySelector(".edit-btn");
let bioRow = document.querySelectorAll(".bio-row .profile-session");
let uploadImage = document.querySelector(".upload-image");

uploadImage.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formElement = e.target;
  const content = formElement.content.value;
  const image = formElement.image.files[0];

  const formData = new FormData();

  formData.append('content', content)
  formData.append('image', image)

  console.log(content)

  const res = await fetch('/user/upload-image', {
    method: 'POST',
    body: formData
  })

  if (res.ok) {
    document.querySelector('.upload-image').reset();
  }

});


friendsButton.addEventListener("click", function (event) {
  console.log('friendsButton clicked')

  getFriends();

  console.log("Clicked friends")
  fds_list_session.querySelector('article.leaderboard').classList.toggle('display-none');
});


editButton.addEventListener("click", async function (event) {
  if (editButton.innerHTML == "Edit") {
    editButton.innerHTML = "Save Changes";
    for (let row of bioRow) {
      row.disabled = false;
    }

  } else { //Save Changes
    editButton.innerHTML = "Edit";
    for (let row of bioRow) {
      row.disabled = true;
    }

    let aboutMe = document.querySelector("#about-me").value;
    let myName = document.querySelector("#name").value;
    let dateOfBirth = document.querySelector("#date-of-birth").value;
    let occupation = document.querySelector("#occupation").value;
    let hobby = document.querySelector("#hobby").value;
    let country = document.querySelector("#country").value;


    let res = await fetch('/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: myName,
        aboutme: aboutMe,
        date_of_birth: dateOfBirth,
        occupation: occupation,
        hobby: hobby,
        country: country
      })
    })
    console.log("why")
    if (res.ok) {
      getProfile();
    }
  }
});


$(".profile .icon_wrap").click(function () {
  $(this).parent().toggleClass("active");
  $(".notifications").removeClass("active");
});

$(".notifications .icon_wrap").click(function () {
  $(this).parent().toggleClass("active");
  $(".profile").removeClass("active");
});

$(".show_all .link").click(function () {
  $(".notifications").removeClass("active");
  $(".popup").show();
});

$(".close, .shadow").click(function () {
  $(".popup").hide();
});


export async function addStartChatFormEvent() {
  const startChatForm = document.querySelector('#start-chat-form')

  startChatForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const form = e.target
    const userId = form.userId.value
    console.log("userId: " + userId)
    const res = await fetch('/user/start-chat', {
      method: 'POST',
      body: JSON.stringify({
        userId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      console.log('start chat')
      window.location.href = "/chatroom/chatroom.html"
    } else {
      let { message } = await res.json()
      alert(message)
    }
  })
}





// let startMatching = document.querySelector(""

  // let friendsButton = document.querySelector(".friends-btn");
  // let fds_list_session = document.querySelector(".friends-list-session");
  // let editButton = document.querySelector(".edit-btn");
  // let bioRow = document.querySelectorAll(".bio-row input");


  // window.onload(getProfile);


  // async function getProfile() {
  //   let res = await fetch('/user/me')
  //   let data = await res.json()
  //   dateOfBirth = new Date(data.dateofbirth);
  //   console.log("daya profile: " + dateOfBirth.getFullYear())

  //   let profileCard = document.querySelector(".bio-graph-info");

  //   document.querySelector(".profile-card__name").value = data.name;
  //   document.querySelector("#header-occupation").innerHTML = toProperCase(data.occupation) + " ";
  //   document.querySelector('#company').innerHTML = data.company;
  //   document.querySelector('.profile-card__name').innerHTML = toProperCase(data.name);
  //   profileCard.querySelector("#name").value = toProperCase(data.name);
  //   profileCard.querySelector("#about-me").value = data.aboutme;
  //   profileCard.querySelector("#date-of-birth").value = [dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()].join('-');
  //   profileCard.querySelector("#occupation").value = toProperCase(data.occupation);
  //   profileCard.querySelector("#hobby").value = toProperCase(data.hobby);
  //   profileCard.querySelector("#country").value = toProperCase(data.country);


  //   console.log(profileCard);

  //   if (res.ok) {
  //     document.querySelector('.profile .name').innerText = data.name
  //   }
  // }