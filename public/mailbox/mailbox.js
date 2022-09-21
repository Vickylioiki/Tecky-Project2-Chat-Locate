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

function getStatusHTMLMailBox(notificationItem) {
    let status = notificationItem.status
    if (status === 'pending') {

        //   <form class="accept-friend-form">
        //   <input type="text" hidden name="opponentUserId" value="${notificationItem.opponent_user_id}">
        //   <input type="text" hidden name="notificationId" value="${notificationItem.id}">
        //   <button type="submit" class="btn btn-light">Accept</button>
        // </form>
        return `
       <button type="button" class="btn btn-light status-mailbox" data-status='approved' data-notification-id=${notificationItem.id}>O</button>
       <button type="button" class="btn btn-light status-mailbox" data-status='rejected' data-notification-id=${notificationItem.id}>X</button>
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
async function getNotificationsMailbox() {

    let res = await fetch('/user/notifications')
    if (!res.ok) {
        return
    }
    let data = await res.json()
    let notificationItems = data.data

    let notificationUlElem = document.querySelector('#notification-list-parent')
    notificationUlElem.innerHTML = ''

    console.log('getNotificationsMailBox before for loop', notificationItems)
    for (let notificationItem of notificationItems) {
        // console.log(notificationItem.type )
        if (notificationItem.type == 'invitation') {
            notificationUlElem.innerHTML += /* HTML */`
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
                ${getStatusHTMLMailBox(notificationItem)}
                </div>
            </div>
            `
        } else if (notificationItem.type === 'message') {
            notificationUlElem.innerHTML += /* HTML */`
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
                        <form id="start-chat-form-${notificationItem.id}"  class="start-chat-form" form-id="${notificationItem.id}" style="padding-bottom: 7px;">
                        <div class="notification-list_feature-img" id="status-${notificationItem.id}">
                        ${displayStatus(notificationItem)}
                        </div>
                        </form >
                    </div >
                </div >
            `
        } else {
            // do nothing
        }

        // function displayStatus(notificationItem) {
        //     let enabled = notificationItem.enabled
        //     let text = enabled ? "<button> O </button>"
        //     : "<div>Read</div>"
        //     return text
        // }
        // function getStatusHTMLMailBox(notificationItem) {
        //     let enabled = notificationItem.enabled
        //     console.log("enabled: " + enabled)
        //     let text = !enabled ? "O" : "Read"
        //     console.log(text)

        //     return `
        //         <button type = "button" class="btn btn-light status" data - status='approved' data - notification - id=${notificationItem.id}> ${text}</button>`
        // }
    }

    /* message notification starts */
    const forms = document.querySelectorAll(".start-chat-form")
    forms.forEach(async (form, index) => {
        const formId = form.getAttribute("form-id")
        await updateRelation(formId)
    })

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
    /* message notifications ends */


    /* invitation notifications starts */
    console.log('before invitation notifications status button event listener')
    let statusBtns = document.querySelectorAll('button.status-mailbox');
    for (let statusBtn of statusBtns) {
        statusBtn.addEventListener('click', async (e) => {
            e.preventDefault()

            const notificationId = statusBtn.dataset.notificationId
            const status = statusBtn.dataset.status

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
                let resJson = await res.json()
                console.log('friend success: ', resJson)
                statusBtn.parentNode.parentNode.parentNode.innerHTML = /* HTML */`
                <div class="notification-list_content">
                    <div class="notification-list_img">
                    ${resJson.icon ? `<img class="notify-icon" src="${resJson.icon}">` : '    <img class="notify-icon" src="https://randomuser.me/api/portraits/men/84.jpg">'}
                    <div class="notification-list_detail">
                        <p><b>${resJson.friendName}</b> ${resJson.message}</p>
                        <p class="text-muted"><small>${resJson.created_at}</small></p>
                    </div>
                </div>
                <div class="notification-list_feature-img">
                ${getStatusHTMLMailBox(resJson)}
                </div>
                `
                // window.location.href = "/chatroom/chatroom.html"
            } else {
                let { message } = await res.json()
                alert(message)
            }
        })
    }
    /* invitation notifications ends */

    return true;
}

async function updateRelation(notificationId) {
    const startChatForm = document.querySelector(`#start-chat-form-${notificationId}`)
    startChatForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const form = e.target
        // const userId = form.userId.value
        // console.log(from)

        // console.log("userId: " + userId)
        const res = await fetch('/user/update-relation', {
            method: 'POST',
            body: JSON.stringify({
                status: 'pending',
                notificationId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            console.log('friend success: ', res.status)
            getNotificationsMailbox()
            // window.location.href = "/chatroom/chatroom.html"
        } else {
            let { message } = await res.json()
            alert(message)
        }
    })
}
console.log('getNotification after reject friend form event listener')

let mailBoxInitPromise = new Promise(function (resolve, reject) {
    resolve();
    reject();
})

mailBoxInitPromise
    .then(getNotificationsMailbox, null)
    // .then(addStartChatFormEvent, null)
    .catch((e) => console.log('initPromise catch error: ', e))



// function init() {
//     getNotificationsMailbox()
// }
// init()
