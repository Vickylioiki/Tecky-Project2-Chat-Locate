async function initHeader() {
  let headerElm = document.querySelector('.header')


  if (headerElm) {
    headerElm.innerHTML = /* HTML*/`
    <div class="navbar">
      <div class="navbar_left">
        <div class="logo">
          <a href="http://localhost:8080/profile_page/profile.html">Chatlocal</a>
        </div>
      </div>

      <div class="navbar_right">
        <div class="notifications">
          <div class="icon_wrap"><i class="far fa-bell"></i></div>

          <div class="notification_dd">
            <ul class="notification_ul">

              <li class="baskin_robbins failed">
                <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">
                <div class="notify_data">
                  <div class="title">
                    David
                  </div>
                  <div class="sub_title">
                    How are you?
                  </div>
                </div>
                <div class="notify_status">
                  <p>12:00pm</p>
                </div>
                <button type="button" class="btn btn-light">X</button>
                <button type="button" class="btn btn-light">O</button>
              </li>
              <li class="mcd success">
                <img class="notify-icon" src="https://randomuser.me/api/portraits/women/47.jpg">

                <div class="notify_data">
                  <div class="title">
                    Wezi
                  </div>
                  <div class="sub_title">
                    Hey, I have a news for you
                  </div>
                </div>
                <div class="notify_status">
                  <p>15:00 pm</p>
                </div>
                <button type="button" class="btn btn-light">X</button>
                <button type="button" class="btn btn-light">O</button>
              </li>
              <li class="pizzahut failed">
                <img class="notify-icon" src="https://randomuser.me/api/portraits/women/8.jpg">

                <div class="notify_data">
                  <div class="title">
                    Kim
                  </div>
                  <div class="sub_title">
                    Hey man!
                  </div>
                </div>
                <div class="notify_status">
                  <p>16:00pm</p>
                </div>
                <button type="button" class="btn btn-light">X</button>
                <button type="button" class="btn btn-light">O</button>
              </li>
              <li class="kfc success">
                <img class="notify-icon" src="https://randomuser.me/api/portraits/men/35.jpg">
                <div class="notify_icon">
                </div>
                <div class="notify_data">
                  <div class="title">
                    Aleksandar
                  </div>
                  <div class="sub_title">
                    Do you want to see a movie?
                  </div>
                </div>
                <div class="notify_status">
                  <p>18:00pm</p>
                </div>
                <button type="button" class="btn btn-light">X</button>
                <button type="button" class="btn btn-light">O</button>
              </li>
              <li class="show_all">
                <p class="link">Show All Activities</p>
              </li>
            </ul>
          </div>

        </div>
        <div class="profile">
          <div class="icon_wrap">
            <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="profile_pic">
            <span class="name">John Alex</span>
            <i class="fas fa-chevron-down"></i>
          </div>

          <div class="profile_dd">
            <ul class="profile_ul">
              <li class="profile_li"><a class="profile" href="#"><span class="picon"><i class="fas fa-user-alt"></i>
                  </span>Profile</a>
              </li>
              <li><a class="logout" href="#"><span class="picon"><i class="fas fa-sign-out-alt"></i></span>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

export async function getFriends() {
  let res = await fetch('/user/friends');
  let friends_list = await res.json();
  let friends_session = document.querySelector('.friends_list_inner');

  console.log(friends_list);
  friends_session.innerHTML = "";

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

  getProfile();

}

export async function getProfile() {
  let search = new URLSearchParams(window.location.search);
  let targetUserId = search.get('userId');
  let res = await fetch('/user/me');
  let data = await res.json();
  let dateOfBirth = new Date(data.date_of_birth);


  if (targetUserId) {
    console.log(targetUserId);
    res = await fetch(`/user/user-profile/${targetUserId}`);
    data = await res.json();
    console.log(data);
    dateOfBirth = new Date(data.date_of_birth);
    document.querySelector(".edit-btn").remove();
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

  if (res.ok) {
    document.querySelector('.profile .name').innerText = data.name
  }
}


function toProperCase(str) {
  let formattedName = "";
  let name_To_Upper = true;
  for (let index in str) {
    if (name_To_Upper) {
      formattedName += str[index].toUpperCase();
      name_To_Upper = false;
    }
    else if (str[index] == " ") {
      formattedName += str[index].toLowerCase();
      name_To_Upper = true;
    }
    else {
      formattedName = formattedName + (str[index].toLowerCase());
    }
  }
  return formattedName
}



function getStatusHTML(notificationItem) {
  let status = notificationItem.status
  if (status === 'pending') {

    //   <form class="accept-friend-form">
    //   <input type="text" hidden name="opponentUserId" value="${notificationItem.opponent_user_id}">
    //   <input type="text" hidden name="notificationId" value="${notificationItem.id}">
    //   <button type="submit" class="btn btn-light">Accept</button>
    // </form>
    return /* HTML*/`
     <button type="button" class="btn btn-light status" data-status='approved' data-notification-id="${notificationItem.id}">O</button>
     <button type="button" class="btn btn-light status" data-status='rejected' data-notification-id="${notificationItem.id}">X</button>
    `
  }
  if (status === 'approved') {
    return /* HTML*/`
    <div>Approved</div>
    
    `
  }
  if (status === 'rejected') {
    return /* HTML*/`
   <div>Rejected</div>
    
    `
  }

}

async function getNotifications() {

  let res = await fetch('/user/notifications?limit=2')
  let data = await res.json()
  let notificationItems = data.data

  console.log('notificationItems: ', notificationItems)

  let notificationUlElem = document.querySelector('.notification_ul')
  notificationUlElem.innerHTML = ''

  console.log('getNotifications before for loop', notificationItems)
  for (let notificationItem of notificationItems) {
    notificationUlElem.innerHTML += `
      <li class="baskin_robbins failed" data-notification-id="${notificationItem.id}">

      ${notificationItem.icon ? `<img class="notify-icon" src="${notificationItem.icon}">` : '    <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">'}

      <div class="notify_data">
        <div class="title">
          ${notificationItem.name}
        </div>
        <div class="sub_title">
          Can I add you?
        </div>
      </div>
      <div class="notify_status">
        <p>${notificationItem.created_at.split('T')[0]}</p>
      </div>
      ${getStatusHTML(notificationItem)}
    </li>
      `;
  }


  console.log('get notification after for loop')

  notificationUlElem.innerHTML += `<li class="show_all">
  <a href="/mailbox/mailbox.html"><p class="link">Show All Activities</p></a>
  </li>`


  let statusBtns = document.querySelectorAll('button.status');
  for (let statusBtn of statusBtns) {
    statusBtn.addEventListener('click', async (e) => {
      e.preventDefault()

      const notificationId = statusBtn.dataset.notificationId
      const status = statusBtn.dataset.status
      console.log('clicking :', notificationId, status)

      const res = await fetch('/user/update-relation', {
        method: 'POST',
        body: JSON.stringify({
          status,
          notificationId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        console.log(status, ' friend success')
        getNotifications()
        // window.location.href = "/chatroom/chatroom.html"
      } else {
        let { message } = await res.json()
        alert(message)
      }
    })
  }
  console.log('getNotification after reject friend form event listener')
}

// async function logout() {
//   let response = await fetch('/user/logout');
//   console.log('header button triggered logout API call!', response)
// }

async function logout() {
  const logoutBtn = document.querySelector('.logout')
  console.log(logout)
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let res = await fetch('/user/logout')
    if (res.ok) {
      console.log('logout successful')
      window.location.href = "/login.html"
    } else {
      let { message } = await res.json()
      alert(message)
    }
  })

}



async function getNotifications() {

  //   let res = await fetch('/user/notifications?limit=2')
  //   let data = await res.json()
  //   let notificationItems = data.data

  //   console.log('notificationItems: ', notificationItems)

  //   let notificationUlElem = document.querySelector('.notification_ul')
  //   notificationUlElem.innerHTML = ''
  //   if (notificationItems) {
  //     console.log('getNotifications before for loop', notificationItems)
  //     for (let notificationItem of notificationItems) {
  //       notificationUlElem.innerHTML += `
  //       <li class="baskin_robbins failed" data-notification-id="${notificationItem.id}">

  console.log('getNotifications before for loop', notificationItems)
  for (let notificationItem of notificationItems) {
    notificationUlElem.innerHTML += /* HTML*/`
      <li class="baskin_robbins failed" data-notification-id="${notificationItem.id}">

      ${notificationItem.icon ? `<img class="notify-icon" src="${notificationItem.icon}">` : '    <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">'}

      <div class="notify_data">
        <div class="title">
          ${notificationItem.name}
        </div>
        <div class="sub_title">
          Can I add you?
        </div>
      </div>
      <div class="notify_status">
        <p>${notificationItem.created_at.split('T')[0]}</p>
      </div>
      ${getStatusHTML(notificationItem)}
    </li>
      `
  }

  //       <div class="notify_data">
  //         <div class="title">
  //           ${notificationItem.name}
  //         </div>
  //         <div class="sub_title">
  //           Can I add you?
  //         </div>
  //       </div>
  //       <div class="notify_status">
  //         <p>${notificationItem.created_at.split('T')[0]}</p>
  //       </div>
  //       ${getStatusHTML(notificationItem)}
  //     </li>
  //       `
  //     }
  //     console.log('get notification after for loop')

  notificationUlElem.innerHTML += /* HTML*/`<li class="show_all">
  <a href="/mailbox/mailbox.html"><p class="link">Show All Activities</p></a>
  </li>`

  //   // if (res.ok) {
  //   //   document.querySelector('.profile .name').innerText = data.name
  //   // }

  //   let statusBtns = document.querySelectorAll('button.status');
  //   for (let statusBtn of statusBtns) {
  //     statusBtn.addEventListener('click', async (e) => {
  //       e.preventDefault()

  const notificationId = statusBtn.dataset.notificationId
  const status = statusBtn.dataset.status
  console.log('clicking :', notificationId, status)

  //       const res = await fetch('/user/update-relation', {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           status,
  //           notificationId
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       if (res.ok) {
  //         console.log(status, ' friend success')
  //         getNotifications()
  //         // window.location.href = "/chatroom/chatroom.html"
  //       } else {
  //         let { message } = await res.json()
  //         alert(message)
  //       }
  //     })
  //   }
  //   console.log('getNotification after reject friend form event listener')
  // }


  // const notificationId = statusBtn.dataset.notificationId
  // const status = statusBtn.dataset.status
  // console.log('clicking :', notificationId, status)

  // function remove() {
  //   var elem = document.getElementById('remove');
  //   elem.parentNode.removeChild(elem);
  //   return false;
  // }
}

let initPromise = new Promise(function (resolve, reject) {
  resolve();
  reject();
})

initPromise
  .then(initHeader, null)
  .then(getFriends, null)
  .then(getProfile, null)
  .then(getNotifications, null)
  .then(logout)
