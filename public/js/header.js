
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

          <div class="notification_dd" style="display: none;">
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
            <i class="fas fa-sign-out-alt"></i>
          </div>
          
          <div class="profile_dd">
            <ul class="profile_ul">
              <li class="profile_li"><a class="profile" href="#"><span class="picon"><i class="fas fa-user-alt"></i>
                  </span>Profile</a>
              </li>
              <li><a class="logout" href="#"><span class="picon"></span>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
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

  let bellBtn = document.querySelector('.notifications .icon_wrap')
  bellBtn.addEventListener('click', () => {
    let notificationListElem = bellBtn.parentNode.querySelector('.notification_dd')
    notificationListElem.style.display = notificationListElem.style.display == 'none' ? 'block' : 'none'
  })
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
        await getNotifications();
        await getFriends();
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



// async function getNotifications() {

//   console.log('getNotifications before for loop', notificationItems)
//   for (let notificationItem of notificationItems) {
//     notificationUlElem.innerHTML += /* HTML*/`
//       <li class="baskin_robbins failed" data-notification-id="${notificationItem.id}">

//       ${notificationItem.icon ? `<img class="notify-icon" src="${notificationItem.icon}">` : '    <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">'}

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
//   }
//   console.log('get notification after for loop')

//   notificationUlElem.innerHTML += /* HTML*/`<li class="show_all">
//   <a href="/mailbox/mailbox.html"><p class="link">Show All Activities</p></a>
//   </li>`


//   const notificationId = statusBtn.dataset.notificationId
//   const status = statusBtn.dataset.status
//   console.log('clicking :', notificationId, status)
// }

async function updateHeader(){
  let res = await fetch(`/user/user-profile`);
  if(res.ok){
    let resJson = await res.json();
    console.log('updateHeader user response: ', resJson);
    document.querySelector('.profile .name').innerText = resJson.name
  }
}

let initPromise = new Promise(function (resolve, reject) {
  resolve();
  reject();
})

initPromise
  .then(initHeader, null)
  .then(async()=>{
    $(".profile .icon_wrap").click(function () {
      $(this).parent().toggleClass("active");
      $(".notifications").removeClass("active");
    });
  })
  .then(getNotifications, null)
  .then(updateHeader, null)
  .then(logout) 
