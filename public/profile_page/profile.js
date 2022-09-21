


let friendsButton = document.querySelector(".friends-btn");
let fds_list_session = document.querySelector(".friends-list-session");
let editButton = document.querySelector(".edit-btn");
let bioRow = document.querySelectorAll(".bio-row .profile-session");
let uploadImage = document.querySelector(".upload-image");



async function getFriends() {
  let res = await fetch('/user/friends');
  let friends_list = await res.json();
  let friends_session = document.querySelector('.friends_list_inner');

  console.log(friends_list);
  friends_session.innerHTML = "";

  if (friends_list.length == 0) {
    friends_session.innerHTML += /*HTML*/`<article class="leaderboard__profile">
    
    <span class="leaderboard__name">No Friends Yet</span>
    <span class="leaderboard__value">
      <form id="start-chat-form">
        
      </form>
    </span>
  </article>`;


  }

  for (let friend of friends_list) {
    friends_session.innerHTML += /*HTML*/`<a href="http://localhost:8080/profile_page/profile.html?userId=${friend.id}"><article class="leaderboard__profile">
    <img src="${friend.icon}" alt="${friend.name}" userID="${friend.id}"
      class="leaderboard__picture">
    <span class="leaderboard__name">${friend.name}</span>
    <span class="leaderboard__value">
      <form id="start-chat-form">
        <button type="submit" class="btn btn-success">Chat</button>
      </form>
    </span>
  </article></a>`;
  }
  let friendList = document.querySelectorAll(".friends_list_inner .leaderboard__profile");

  console.log(friendList);

  for (let friend of friendList) {
    console.log("friend Clicked");
    friend.addEventListener("click", function (e) {
      friendID = friend.querySelector('.leaderboard__picture').getAttribute('userid');
      window.location.href = `/profile_page/profile.html?userId=${friendID}`;

    })
  }
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

  await getProfile();
  await addStartChatFormEvent()

}

async function getProfile() {
  let search = new URLSearchParams(window.location.search);
  let targetUserId = search.get('userId');
  let res = await fetch('/user/me');
  let data = await res.json();
  let dateOfBirth = new Date(data.date_of_birth);


  if (targetUserId) {
    console.log(targetUserId);
    res = await fetch(`/user/user-profile?userId=${targetUserId}`);
    data = await res.json();
    console.log(data);
    dateOfBirth = new Date(data.date_of_birth);
    document.querySelector(".edit-btn").remove();
    document.querySelector(".friends-btn").remove();
    document.querySelector(".btn-white.btn-animate").remove();
  }

  console.log(dateOfBirth.getMonth());


  let profileCard = document.querySelector(".bio-graph-info");
  document.querySelector(".icon_wrap img").setAttribute("src", data.icon);
  document.querySelector(".profile-card__img img").setAttribute("src", data.icon);
  document.querySelector(".profile-card__name").value = toProperCase(data.name.split(" ").join[" "]);
  document.querySelector("#header-occupation").innerHTML = toProperCase(data.occupation) + " ";
  document.querySelector('#company').innerHTML = data.company;
  document.querySelector('.profile-card__name').innerHTML = toProperCase(data.name);
  profileCard.querySelector("#name").value = toProperCase(data.name);
  profileCard.querySelector("#about-me").value = data.aboutme;
  profileCard.querySelector("#date-of-birth").value = [dateOfBirth.getFullYear(), dateOfBirth.getMonth() + 1, dateOfBirth.getDate()].join('-');
  profileCard.querySelector("#occupation").value = toProperCase(data.occupation);
  profileCard.querySelector("#hobby").value = toProperCase(data.hobby);
  profileCard.querySelector("#country").value = toProperCase(data.country);

  // console.log(profileCard);

  // if (res.ok) {
  //   document.querySelector('.profile .name').innerText = data.name
  // }
}

friendsButton.addEventListener("click", async function (event) {
  console.log('friendsButton clicked')

  await getFriends();

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



async function addStartChatFormEvent() {
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

let initProfilePromise = new Promise(function (resolve, reject) {
  resolve();
  reject();
})

initProfilePromise
  .then(getFriends, null)
  .then(async()=>{
    $(".profile .icon_wrap").click(function () {
      $(this).parent().toggleClass("active");
      $(".notifications").removeClass("active");
    });
  })
  .then(async()=>{
    $(".notifications .icon_wrap").click(function () {
      $(this).parent().toggleClass("active");
      $(".profile").removeClass("active");
    });
  })
  .then(async()=>{
    $(".show_all .link").click(function () {
      $(".notifications").removeClass("active");
      $(".popup").show();
    });
  })
  .then(async ()=>{ 
    $(".close, .shadow").click(function () {
      $(".popup").hide();
    });
  })
