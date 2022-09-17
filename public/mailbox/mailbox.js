$(".profile .icon_wrap").click(function () {
    $(this).parent().toggleClass("active");
    $(".notifications").removeClass("active");
});

// $(".notifications .icon_wrap").click(function () {
//     $(this).parent().toggleClass("active");
//     $(".profile").removeClass("active");
// });

$(".show_all .link").click(function () {
    $(".notifications").removeClass("active");
    $(".popup").show();
});

$(".close, .shadow").click(function () {
    $(".popup").hide();
});

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

    let res = await fetch('/user/notifications')
    let data = await res.json()
    let notificationItems = data.data

    console.log('notificationItems: ', notificationItems)

    let notificationUlElem = document.querySelector('#notification-list-parent')
    notificationUlElem.innerHTML = ''

    console.log('getNotifications before for loop', notificationItems)
    for (let notificationItem of notificationItems) {
        if (notificationItem.type === 'invitation') {
            notificationUlElem.innerHTML += `
            <div class="notification-list notification-list--unread">
                <div class="notification-list_content">
                    <div class="notification-list_img">
                    ${notificationItem.icon ? `<img class="notify-icon" src="${notificationItem.icon}">` : '    <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">'}
                    <div class="notification-list_detail">
                        <p><b>${notificationItem.name}</b> ${notificationItem.message}</p>
                        <p class="text-muted"><small>${notificationItem.created_at}</small></p>
                    </div>
                </div>
                <div class="notification-list_feature-img">
                ${getStatusHTML(notificationItem)}
                </div>
            </div>
            `
        } else if (notificationItem.type === 'message') {
            notificationUlElem.innerHTML += `
        <div class="notification-list notification-list--unread">
            <div class="notification-list_content">
                <div class="notification-list_img">
                ${notificationItem.icon ? `<img class="notify-icon" src="${notificationItem.icon}">` : '    <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">'}
                <div class="notification-list_detail">
                    <div class="notification-message-list">
                        <p style="padding-right: 2px; font-weight: bold; width: 80px">${notificationItem.name}</p>
                        <p style="text-align: center;">${notificationItem.message}</p>
                    </div>
                    <p class="text-muted"><small>${notificationItem.created_at}</small></p>
                </div>
            </div>
            <div class="notification-list_feature-img">
                <form id="start-chat-form" style="padding-bottom: 7px;">
                  <input type="text" hidden value="${notificationItem.opponent_user_id}" name="userId">
                  <button type="submit" class="btn btn-success">Chat</button>
                </form>
                
                <button type="button" class="btn btn-light close-button" data-notification-id="${notificationItem.id}">X</button>
            </div>
        </div>
        `
        } else {
            // do nothing
        }


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

    let closeBtns = document.querySelectorAll('.notification-list .close-button');
    for (let closeBtn of closeBtns) {
        closeBtn.addEventListener('click', async (e) => {
            let notificationId = closeBtn.dataset.notificationId;
            console.log('onClick notificationId: ', notificationId)
            await fetch('/user/notifications', {
                method: 'PATCH',
                body: JSON.stringify({
                    notificationId,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            closeBtn.parentNode.parentNode.parentNode.remove();
        })
    }

    console.log('get notification after close button click event listener')

    return true;
}

async function addStartChatFormEvent() {
    const startChatForm = document.querySelector('#start-chat-form')
    console.log('startChatForm: ', startChatForm)

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

let initPromise = new Promise(function (resolve, reject) {
    resolve();
    reject();
})

initPromise
    .then(getNotifications, null)
    .then(addStartChatFormEvent, null)
    .catch((e) => console.log('initPromise catch error: ', e))
