let friendsButton = document.querySelector(".friends-btn");
let fds_list_session = document.querySelector(".friends-list-session");
let editButton = document.querySelector(".edit-btn");
let bioRow = document.querySelectorAll(".bio-row .profile-session");
// let startMatching = document.querySelector(""

// let friendsButton = document.querySelector(".friends-btn");
// let fds_list_session = document.querySelector(".friends-list-session");
// let editButton = document.querySelector(".edit-btn");
// let bioRow = document.querySelectorAll(".bio-row input");

friendsButton.addEventListener("click", function (event) {
  console.log('friendsButton clicked')
  friend_board = `<div class="friends-list-session">
    <article class="leaderboard">
        <header>
      
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve" class="leaderboard__icon">
            <g>
              <g>
                <path d="M466.45,49.374c-7.065-8.308-17.368-13.071-28.267-13.071H402.41v-11.19C402.41,11.266,391.143,0,377.297,0H134.705
                  c-13.848,0-25.112,11.266-25.112,25.112v11.19H73.816c-10.899,0-21.203,4.764-28.267,13.071
                  c-6.992,8.221-10.014,19.019-8.289,29.624c9.4,57.8,45.775,108.863,97.4,136.872c4.717,11.341,10.059,22.083,16.008,32.091
                  c19.002,31.975,42.625,54.073,68.627,64.76c2.635,26.644-15.094,51.885-41.794,57.9c-0.057,0.013-0.097,0.033-0.153,0.046
                  c-5.211,1.245-9.09,5.921-9.09,11.513v54.363h-21.986c-19.602,0-35.549,15.947-35.549,35.549v28.058
                  c0,6.545,5.305,11.85,11.85,11.85H390.56c6.545,0,11.85-5.305,11.85-11.85v-28.058c0-19.602-15.947-35.549-35.549-35.549h-21.988
                  V382.18c0-5.603-3.893-10.286-9.118-11.52c-0.049-0.012-0.096-0.028-0.145-0.04c-26.902-6.055-44.664-31.55-41.752-58.394
                  c25.548-10.86,48.757-32.761,67.479-64.264c5.949-10.009,11.29-20.752,16.008-32.095c51.622-28.01,87.995-79.072,97.395-136.87
                  C476.465,68.392,473.443,57.595,466.45,49.374z M60.652,75.192c-0.616-3.787,0.431-7.504,2.949-10.466
                  c2.555-3.004,6.277-4.726,10.214-4.726h35.777v21.802c0,34.186,4.363,67.3,12.632,97.583
                  C89.728,153.706,67.354,116.403,60.652,75.192z M366.861,460.243c6.534,0,11.85,5.316,11.85,11.85v16.208H134.422v-16.208
                  c0-6.534,5.316-11.85,11.85-11.85H366.861z M321.173,394.03v42.513H191.96V394.03H321.173z M223.037,370.331
                  c2.929-3.224,5.607-6.719,8.002-10.46c7.897-12.339,12.042-26.357,12.228-40.674c4.209,0.573,8.457,0.88,12.741,0.88
                  c4.661,0,9.279-0.358,13.852-1.036c0.27,19.239,7.758,37.45,20.349,51.289H223.037z M378.709,81.803
                  c0,58.379-13.406,113.089-37.747,154.049c-23.192,39.03-53.364,60.525-84.956,60.525c-31.597,0-61.771-21.494-84.966-60.523
                  c-24.342-40.961-37.748-95.671-37.748-154.049V25.112c0-0.78,0.634-1.413,1.412-1.413h242.591c0.78,0,1.414,0.634,1.414,1.413
                  V81.803z M451.348,75.192c-6.702,41.208-29.074,78.51-61.569,104.191c8.268-30.283,12.631-63.395,12.631-97.58V60.001h35.773
                  c3.938,0,7.66,1.723,10.214,4.726C450.915,67.688,451.963,71.405,451.348,75.192z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M327.941,121.658c-1.395-4.288-5.103-7.414-9.566-8.064l-35.758-5.196l-15.991-32.402
                  c-1.997-4.044-6.116-6.605-10.626-6.605c-4.511,0-8.63,2.561-10.626,6.605l-15.991,32.402l-35.758,5.196
                  c-4.464,0.648-8.172,3.775-9.566,8.065c-1.393,4.291-0.231,8.999,2.999,12.148l25.875,25.221l-6.109,35.613
                  c-0.763,4.446,1.064,8.938,4.714,11.59c3.648,2.651,8.487,3,12.479,0.902L256,190.32l31.982,16.813
                  c1.734,0.911,3.627,1.36,5.512,1.36c2.456,0,4.902-0.763,6.966-2.263c3.65-2.652,5.477-7.144,4.714-11.59l-6.109-35.613
                  l25.875-25.221C328.172,130.658,329.334,125.949,327.941,121.658z M278.064,146.405c-2.793,2.722-4.068,6.644-3.408,10.489
                  l3.102,18.09l-16.245-8.541c-1.725-0.908-3.62-1.36-5.514-1.36c-1.894,0-3.788,0.454-5.514,1.36l-16.245,8.541l3.102-18.09
                  c0.66-3.844-0.615-7.766-3.408-10.489l-13.141-12.81l18.162-2.64c3.859-0.56,7.196-2.985,8.922-6.482l8.123-16.458l8.122,16.458
                  c1.727,3.497,5.062,5.921,8.922,6.482l18.162,2.64L278.064,146.405z" />
              </g>
            </g>
          </svg>
      
          <h1 class="leaderboard__title"><span class="leaderboard__title--top">ChatLocate</span><span class="leaderboard__title--bottom">MATCH LIST</span></h1>
        </header>
        <main class="leaderboard__profiles">
          <article class="leaderboard__profile">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mark Zuckerberg" class="leaderboard__picture">
            <span class="leaderboard__name">Mark Zuckerberg</span>
            <span class="leaderboard__value">35.7<span>B</span></span>
          </article>
          
          <article class="leaderboard__profile">
            <img src="https://randomuser.me/api/portraits/men/97.jpg" alt="Dustin Moskovitz" class="leaderboard__picture">
            <span class="leaderboard__name">Dustin Moskovitz</span>
            <span class="leaderboard__value">9.9<span>B</span></span>
          </article>
          
          <article class="leaderboard__profile">
            <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Elizabeth Holmes" class="leaderboard__picture">
            <span class="leaderboard__name">Elizabeth Holmes</span>
            <span class="leaderboard__value">4.5<span>B</span></span>
          </article>
          
          <article class="leaderboard__profile">
            <img src="https://randomuser.me/api/portraits/men/37.jpg" alt="Evan Spiegel" class="leaderboard__picture">
            <span class="leaderboard__name">Evan Spiegel</span>
            <span class="leaderboard__value">2.1<span>B</span></span>
          </article>
        </main>
      </div>
      </div>`

  console.log("Clicked friends")
  console.log(fds_list_session.contains(document.querySelector("article.leaderboard")));
  //console.log(fds_list_session.querySelector("article.leaderboard"));
  if (!fds_list_session.contains(document.querySelector("article.leaderboard"))) {
    fds_list_session.innerHTML = friend_board;

  } else {
    fds_list_session.querySelector("article.leaderboard").remove();
  }
});

editButton.addEventListener("click", async function (event) {
  if (editButton.innerHTML == "Edit") {
    editButton.innerHTML = "Save Changes";
    for (row of bioRow) {
      row.disabled = false;
    }

  } else { //Save Changes
    editButton.innerHTML = "Edit";
    for (row of bioRow) {
      row.disabled = true;
    }
    aboutMe = document.querySelector("#about-me").value;
    dateOfBirth = document.querySelector("#date-of-birth").value;
    occupation = document.querySelector("#occupation").value;
    hobby = document.querySelector("#hobby").value;
    country = document.querySelector("#country").value;

    let res = await fetch('/profile/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aboutMe: aboutMe,
        dateofBirth: dateofBirth,
        occupation: occupation,
        hobby: hobby,
        country: country
      })
    })


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

addStartChatFormEvent();