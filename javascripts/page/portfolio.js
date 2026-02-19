let last_index = 0;
let theTimer;
let running = false;

function showNextImage() {
    var img_index = last_index;

    // show images in sequential order
    img_index++;

    if (img_index >= images.length) {
        img_index = 0;
    }

    var img_name = images[img_index];
    show(img_name);
    last_index = img_index;
}


function showPreviousImage() {
    var img_index = last_index;
    --img_index;
    if (img_index < 0) {
        img_index = images.length - 1;
    }
    var img_name = images[img_index];
    show(img_name);
    last_index = img_index;
}

function show(img_name) {
    var bigImage = $("img[name='big']");
    if (!bigImage.ImageAnimating()) {
        showImage(img_name);
    }
}

function showImage(img_name) {
    var bigImage = $("img[name='big']");
    bigImage.fadeOut(1500, function () {
        bigImage.attr('src', portfolioRoot + "/" + img_name);
        bigImage.attr("alt", img_name);
        bigImage.fadeIn(1500);
    });
}


function start() {
    showNextImage();

    if (theTimer == null) {
        theTimer = $.timer(7000, function (timer) {
            showNextImage();
        });
    } else {
        theTimer.reset(5000);
    }

    $("#button_pause_start").attr("src", appRoot + "images/button_pause.png");
    running = true;
}

function pause() {
    theTimer.stop();
    $("#button_pause_start").attr("src", appRoot + "images/button_play.png");
    running = false;
}

function toggleSlideShow() {

    if (running) {
        pause();
    } else {
        start();
    }

}

function prev() {
    if (running) {
        pause();
    }
    showPreviousImage();
}

function next() {
    if (running) {
        pause();
    }
    showNextImage();
}

function enableButtonHandlers() {
    $("#button_prev").click(prev);
    $("#button_pause_start").click(toggleSlideShow);
    $("#button_next").click(next);
}


jQuery(function () {
    start();
    enableButtonHandlers();
});