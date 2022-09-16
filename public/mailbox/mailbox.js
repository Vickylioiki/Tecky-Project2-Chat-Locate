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

function getStylesheet() {
    let currentTime = new Date().getHours();
    console.log(currentTime);
    let backgroundWrapperImage = document.querySelector(".background-wrapper img");
    if (document.body) {
        if (7 <= currentTime && currentTime < 20) {
            // document.body.style.backgroundImage = "url('asset/DomeAM.jpg')";
            backgroundWrapperImage.src = "./asset/akumanoko_AM.jpg"
        }
        else {
            // document.body.style.backgroundImage = "url('asset/DomePM.jpg')";
            backgroundWrapperImage.src = "./asset/akumanoko_PM.jpg"
        }
    }
}
