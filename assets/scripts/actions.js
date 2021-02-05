$(document).ready(function () {
    $(".description-show-button").click(function () {
        toggleDescriptionContent(false);
    });
    $(".description-close-button").click(function() {
        toggleDescriptionContent(true);
    });
});

//After loading, this method changes visibility. 
//Time out to create a soft transition.    
function getCanvas() {
    $("#loading-spinner").fadeOut(1000);
    setTimeout(function () { $("#canvas").fadeIn(1000); }, 1000);
}

//The following method for showing modal on the screen. 
//Mouse location for dynamic modal position. 
function getModal(selectedPart, mouseX, mouseY) {
    $(".ui-dialog-title").html(selectedPart);
    $("#dialog .dialog-description").html("Lorem Ipsum");

    $("#dialog").dialog({
        modal: true,
        show: 'fade',
        open: function () {
            $(".ui-dialog").css("top", mouseY);
            $(".ui-dialog").css("left", mouseX);
            $(".ui-dialog-content").css("min-height", "auto");
        }
    });
}

//This function for show / hide description content. Function decides to act according to status.
function toggleDescriptionContent(isActive) {
    if (isActive) {
        $(".description-show-button").addClass("load");
        $(".description-show-button").removeClass("unload");
        $(".content-description-area").addClass("unload");
        $(".content-description-area").removeClass("load");
    } else {
        $(".description-show-button").removeClass("load");
        $(".description-show-button").addClass("unload");
        $(".content-description-area").removeClass("unload");
        $(".content-description-area").addClass("load");
    }
}