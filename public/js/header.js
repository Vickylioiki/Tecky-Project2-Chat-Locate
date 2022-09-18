
function initHeader() {
  let headerElm = document.querySelector('.header')


  if (headerElm) {
    headerElm.innerHTML = /* HTML*/`
    <div class="navbar">
      <div class="navbar_left">
        <div class="logo">
          <a href="#">Chatlocal</a>
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
                <div class="btn">My Account</div>
              </li>
              <li><a class="address" href="#"><span class="picon"><i class="fas fa-map-marker"></i></span>Address</a>
              </li>
              <li><a class="settings" href="#"><span class="picon"><i class="fas fa-cog"></i></span>Settings</a></li>
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



async function getProfile() {

  let res = await fetch('/user/me')
  let data = await res.json()
  console.log(data)

  if (res.ok) {
    document.querySelector('.profile .name').innerText = data.name
  }

}

function getStatusHTML(notificationItem) {
  let status = notificationItem.status
  if (status === 'pending') {

    //   <form class="accept-friend-form">
    //   <input type="text" hidden name="opponentUserId" value="${notificationItem.opponent_user_id}">
    //   <input type="text" hidden name="notificationId" value="${notificationItem.id}">
    //   <button type="submit" class="btn btn-light">Accept</button>
    // </form>
    return `
     <button type="button" class="btn btn-light status" data-status='approved'>O</button>
     <button type="button" class="btn btn-light status" data-status='rejected'>X</button>
    `
  }
  if (status === 'approved') {
    return `
    <div>Approved</div>
    
    `
  }
  if (status === 'rejected') {
    return `
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

  //add event listeners to accept and reject buttons

  let acceptButtons = document.querySelectorAll("[data-status='approved']");
  let rejectButtons = document.querySelectorAll("[data-status='rejected']");
  //ACCEPTED and REJECTED
  for (let buttonIndex = 0; buttonIndex < acceptButtons.length; buttonIndex++) {
    acceptButtons[buttonIndex].addEventListener("click", async (event) => {
      event.preventDefault();
      let res_accept = await fetch('/acceptFriends', {
        method: "POST",
        body: JSON.stringify({
          to_user_id: "2",   //HARD CODING NEEDA EDIT BEFORE DEPLOYMENT
          status: "approved"
        })
      })

      rejectButtons[buttonIndex].addEventListener("click", async (event) => {
        eventNames.preventDefault();
        let res_reject = await fetch('/rejectFriends', {
          method: "POST",
          body: JSON.stringify({
            to_user_id: "2",   //HARD CODING NEEDA EDIT BEFORE DEPLOYMENT
            status: "rejected"
          })
        })
      })
    })

  }


  console.log('get notification after for loop')

  notificationUlElem.innerHTML += `<li class="show_all">
  <a href="/mailbox/mailbox.html"><p class="link">Show All Activities</p></a>
  </li>`

  // if (res.ok) {
  //   document.querySelector('.profile .name').innerText = data.name
  // }

  let statusBtns = document.querySelectorAll('button.status');
  for (let statusBtn of statusBtns) {
    statusBtn.addEventListener('click', async (e) => {
      e.preventDefault()

      const notificationId = statusBtn.closest('li').dataset.notificationId
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
      `
  }

  console.log('get notification after for loop')

  notificationUlElem.innerHTML += `<li class="show_all">
  <a href="/mailbox/mailbox.html"><p class="link">Show All Activities</p></a>
  </li>`

  // if (res.ok) {
  //   document.querySelector('.profile .name').innerText = data.name
  // }

  let statusBtns = document.querySelectorAll('button.status');
  for (let statusBtn of statusBtns) {
    statusBtn.addEventListener('click', async (e) => {
      e.preventDefault()

      const notificationId = statusBtn.closest('li').dataset.notificationId
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



// function remove() {
//   var elem = document.getElementById('remove');
//   elem.parentNode.removeChild(elem);
//   return false;
// }

function init() {
  initHeader()
  getProfile()
  getNotifications()

};
init()